import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Flag,
  Clock,
  Send,
  BookmarkCheck,
  AlertTriangle,
  CheckCircle,
  Circle,
  Loader2,
} from "lucide-react";
import { mockTestApi } from "../api/Mocktest.api";
import type { Question, StartTestResponse } from "../api/Mocktest.api";
import toast from "react-hot-toast";

// ── Types ─────────────────────────────────────────────────────────────────────
type Status = "unattempted" | "answered" | "marked" | "answered-marked";

interface QuestionState {
  answer: number | null;
  marked: boolean;
  timeSpent: number;
}

// ── Timer ─────────────────────────────────────────────────────────────────────
const pad = (n: number) => String(n).padStart(2, "0");

const Timer = ({ seconds, warn }: { seconds: number; warn: boolean }) => (
  <div
    className={`flex items-center gap-2 px-4 py-2 border-4 border-black font-black text-2xl tabular-nums ${warn ? "bg-red-500 text-white animate-pulse" : "bg-white text-black"}`}
  >
    <Clock className="w-5 h-5" />
    {pad(Math.floor(seconds / 3600))}:{pad(Math.floor((seconds % 3600) / 60))}:
    {pad(seconds % 60)}
  </div>
);

// ── Status colour ─────────────────────────────────────────────────────────────
const statusClass: Record<Status, string> = {
  unattempted: "bg-white border-gray-300 text-gray-500",
  answered: "bg-green-500 border-green-600 text-white",
  marked: "bg-yellow-400 border-yellow-500 text-black",
  "answered-marked": "bg-purple-500 border-purple-600 text-white",
};

const getStatus = (s: QuestionState): Status => {
  if (s.answer !== null && s.marked) return "answered-marked";
  if (s.answer !== null) return "answered";
  if (s.marked) return "marked";
  return "unattempted";
};

export default function TestPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();

  // ── Attempt data: either passed via navigate state or fetched fresh ────────
  const [attempt, setAttempt] = useState<StartTestResponse | null>(
    (location.state as any)?.attempt ?? null,
  );
  const [loading, setLoading] = useState(!attempt);
  const [submitting, setSubmitting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ── Question state ─────────────────────────────────────────────────────────
  const [current, setCurrent] = useState(0);
  const [states, setStates] = useState<QuestionState[]>([]);

  // ── Timer ─────────────────────────────────────────────────────────────────
  const [timeLeft, setTimeLeft] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const startRef = useRef<number>(Date.now());
  const qStartRef = useRef<number>(Date.now()); // when this question was opened

  // ── Start test if no attempt passed ───────────────────────────────────────
  useEffect(() => {
    if (attempt) return;
    if (!id) return;
    mockTestApi
      .startTest(id)
      .then(({ data }) => {
        setAttempt(data.data);
        setLoading(false);
      })
      .catch((err) => {
        toast.error(err.response?.data?.message || "Failed to start test");
        navigate("/mock-tests");
      });
  }, [id]);

  // ── Initialise states when attempt arrives ─────────────────────────────────
  useEffect(() => {
    if (!attempt) return;
    setStates(
      attempt.questions.map(() => ({
        answer: null,
        marked: false,
        timeSpent: 0,
      })),
    );
    setTimeLeft(attempt.duration * 60);
    startRef.current = Date.now();
    qStartRef.current = Date.now();
  }, [attempt]);

  // ── Countdown ─────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!states.length) return;
    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current);
          handleSubmit(true); // auto-submit
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [states.length]);

  // ── Track time per question ────────────────────────────────────────────────
  const recordTime = useCallback((idx: number) => {
    const elapsed = Math.round((Date.now() - qStartRef.current) / 1000);
    setStates((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], timeSpent: next[idx].timeSpent + elapsed };
      return next;
    });
    qStartRef.current = Date.now();
  }, []);

  const goTo = useCallback(
    (idx: number) => {
      recordTime(current);
      setCurrent(idx);
    },
    [current, recordTime],
  );

  // ── Save answer to backend (fire-and-forget) ──────────────────────────────
  const saveToBackend = useCallback(
    (qIdx: number, answer: number | null, marked: boolean) => {
      if (!attempt || !id) return;
      mockTestApi
        .saveAnswer(id, {
          attemptId: attempt.attemptId,
          questionNumber: qIdx + 1, // ← FIXED!
          userAnswer: answer ?? undefined,
          timeSpent: states[qIdx]?.timeSpent ?? 0,
          markedForReview: marked,
        })
        .catch(() => {}); // silent — don't block UI
    },
    [attempt, id, states],
  );

  const handleAnswer = (optionIdx: number) => {
    setStates((prev) => {
      const next = [...prev];
      const old = next[current];
      const same = old.answer === optionIdx;
      next[current] = { ...old, answer: same ? null : optionIdx };
      saveToBackend(current, same ? null : optionIdx, old.marked);
      return next;
    });
  };

  const handleMark = () => {
    setStates((prev) => {
      const next = [...prev];
      const old = next[current];
      next[current] = { ...old, marked: !old.marked };
      saveToBackend(current, old.answer, !old.marked);
      return next;
    });
  };

  const handleClear = () => {
    setStates((prev) => {
      const next = [...prev];
      next[current] = { ...next[current], answer: null };
      saveToBackend(current, null, next[current].marked);
      return next;
    });
  };

  // ── Submit ─────────────────────────────────────────────────────────────────
  const handleSubmit = useCallback(
    async (auto = false) => {
      if (!attempt || !id) return;
      recordTime(current);
      clearInterval(timerRef.current);
      setSubmitting(true);
      setShowConfirm(false);

      const timeTaken = Math.ceil((Date.now() - startRef.current) / 60000);

      try {
        const { data } = await mockTestApi.submitTest(id, {
          attemptId: attempt.attemptId,
          timeTaken,
        });
        if (auto) toast("Time up! Submitting...", { icon: "⏰" });
        else toast.success("Test submitted!");
        navigate(`/results/${data.data.resultId}`, { replace: true });
      } catch (err: any) {
        toast.error(err.response?.data?.message || "Submission failed");
        setSubmitting(false);
      }
    },
    [attempt, id, current, recordTime, navigate],
  );

  // ── Loading / Error ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4" />
          <p
            className="font-black text-xl"
            style={{ fontFamily: "'Archivo Black',sans-serif" }}
          >
            Loading test...
          </p>
        </div>
      </div>
    );
  }
  if (!attempt) return null;

  const questions: Question[] = attempt.questions;
  const q = questions[current];
  const s = states[current] ?? { answer: null, marked: false, timeSpent: 0 };

  const answered = states.filter((x) => x.answer !== null).length;
  const markedCount = states.filter((x) => x.marked).length;
  const notVisited = states.filter(
    (x, i) => x.answer === null && !x.marked && i !== current,
  ).length;

  console.log("===== TEST PAGE DEBUG =====");
  console.log("questions:", questions);
  console.log("current question:", questions?.[current]);
  console.log("==========================");

  return (
    <div
      className="min-h-screen bg-[#FAFAFA] flex flex-col"
      style={{ fontFamily: "'Space Grotesk',sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Top bar ─────────────────────────────────────────────────────────── */}
      <header className="bg-black text-white px-4 py-3 flex items-center justify-between border-b-4 border-black sticky top-0 z-40">
        <div>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest">
            Mock Test
          </p>
          <p
            className="font-black text-lg leading-tight"
            style={{ fontFamily: "'Archivo Black',sans-serif" }}
          >
            Q {current + 1} / {questions.length}
          </p>
        </div>
        <Timer seconds={timeLeft} warn={timeLeft < 300} />
        <button
          onClick={() => setShowConfirm(true)}
          disabled={submitting}
          className="flex items-center gap-2 px-5 py-3 bg-red-500 text-white font-black uppercase border-4 border-red-600 shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
        >
          {submitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          Submit
        </button>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* ── Question panel ──────────────────────────────────────────────── */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Subject / Topic chips */}
          <div className="flex items-center gap-3 mb-6">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 border-2 border-blue-300 font-bold text-xs uppercase">
              {q?.subject || "Unknown"}
            </span>
            {q?.topic && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border-2 border-gray-300 font-bold text-xs uppercase">
                {q.topic}
              </span>
            )}
            {q.topic && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 border-2 border-gray-300 font-bold text-xs uppercase">
                {q.topic}
              </span>
            )}
            <span
              className={`px-3 py-1 border-2 border-black font-bold text-xs uppercase ${q.difficulty === "easy" ? "bg-green-300" : q.difficulty === "hard" ? "bg-red-300" : "bg-yellow-300"}`}
            >
              {q.difficulty}
            </span>
            <span className="ml-auto text-sm font-bold text-gray-500">
              +{q.marks} / -{q.negativeMarks ?? 0}
            </span>
          </div>

          {/* Question text */}
          <div className="bg-white border-4 border-black p-6 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            {q.imageUrl && (
              <img
                src={q.imageUrl}
                alt="question"
                className="max-w-full mb-4 border-2 border-gray-200"
              />
            )}
            <p className="text-lg font-bold leading-relaxed text-black">
              {q.questionText}
            </p>
          </div>

          {/* Options */}
          <div className="space-y-3 mb-8">
            {q.options.map((opt, idx) => {
              const selected = s.answer === idx;
              return (
                <button
                  key={idx}
                  onClick={() => handleAnswer(idx)}
                  className={`w-full flex items-start gap-4 p-4 border-4 text-left transition-all font-medium ${
                    selected
                      ? "bg-black text-white border-black shadow-none translate-x-0.5 translate-y-0.5"
                      : "bg-white text-black border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5"
                  }`}
                >
                  <span
                    className={`w-8 h-8 flex-shrink-0 flex items-center justify-center border-2 font-black text-sm ${selected ? "border-white bg-white text-black" : "border-black"}`}
                  >
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="pt-0.5">{opt.text}</span>
                  {opt.image && (
                    <img
                      src={opt.image}
                      alt={`option ${idx}`}
                      className="max-h-16 ml-auto"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleClear}
              className="px-5 py-3 bg-white border-4 border-black font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              Clear Response
            </button>
            <button
              onClick={handleMark}
              className={`flex items-center gap-2 px-5 py-3 border-4 border-black font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all ${s.marked ? "bg-yellow-400 text-black" : "bg-white text-black"}`}
            >
              <Flag className="w-4 h-4" />
              {s.marked ? "Unmark" : "Mark for Review"}
            </button>
            <div className="flex-1" />
            <button
              onClick={() => goTo(Math.max(0, current - 1))}
              disabled={current === 0}
              className="flex items-center gap-1 px-5 py-3 bg-white border-4 border-black font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-40"
            >
              <ChevronLeft className="w-4 h-4" />
              Prev
            </button>
            <button
              onClick={() => goTo(Math.min(questions.length - 1, current + 1))}
              disabled={current === questions.length - 1}
              className="flex items-center gap-1 px-5 py-3 bg-black text-white border-4 border-black font-black text-sm uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-40"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </main>

        {/* ── Right: Question palette ─────────────────────────────────────── */}
        <aside className="w-72 border-l-4 border-black bg-white overflow-y-auto flex-shrink-0 hidden md:flex flex-col">
          {/* Legend */}
          <div className="p-4 border-b-4 border-black">
            <p className="font-black text-xs uppercase tracking-widest mb-3">
              Question Status
            </p>
            <div className="grid grid-cols-2 gap-2 text-xs font-bold">
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 bg-green-500 border-2 border-green-600 inline-block" />
                <span>{answered} Answered</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 bg-yellow-400 border-2 border-yellow-500 inline-block" />
                <span>{markedCount} Marked</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 bg-white border-2 border-gray-300 inline-block" />
                <span>{notVisited} Not visited</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-5 h-5 bg-purple-500 border-2 border-purple-600 inline-block" />
                <span>Ans+Mark</span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="p-4 grid grid-cols-5 gap-2">
            {questions.map((_, idx) => {
              const st = states[idx] ?? {
                answer: null,
                marked: false,
                timeSpent: 0,
              };
              const sc = statusClass[getStatus(st)];
              const isCurrent = idx === current;
              return (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  className={`w-10 h-10 border-2 font-black text-sm transition-all ${sc} ${isCurrent ? "ring-4 ring-black ring-offset-1 scale-110" : "hover:scale-105"}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Submit button */}
          <div className="mt-auto p-4 border-t-4 border-black">
            <button
              onClick={() => setShowConfirm(true)}
              disabled={submitting}
              className="w-full py-4 bg-black text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
            >
              {submitting ? "Submitting..." : "Submit Test"}
            </button>
          </div>
        </aside>
      </div>

      {/* ── Submit confirmation modal ────────────────────────────────────────── */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] p-8 max-w-md w-full">
            <AlertTriangle className="w-12 h-12 text-yellow-500 mb-4" />
            <h2
              className="font-black text-2xl mb-2"
              style={{ fontFamily: "'Archivo Black',sans-serif" }}
            >
              Submit Test?
            </h2>
            <p className="text-gray-600 font-medium mb-6">
              This cannot be undone.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-6 text-center">
              <div className="p-3 bg-green-50 border-2 border-green-400">
                <div className="flex items-center justify-center gap-1 text-green-700 font-black text-2xl">
                  <CheckCircle className="w-5 h-5" />
                  {answered}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase">
                  Answered
                </p>
              </div>
              <div className="p-3 bg-gray-50 border-2 border-gray-300">
                <div className="flex items-center justify-center gap-1 text-gray-600 font-black text-2xl">
                  <Circle className="w-5 h-5" />
                  {questions.length - answered}
                </div>
                <p className="text-xs font-bold text-gray-500 uppercase">
                  Unanswered
                </p>
              </div>
              {markedCount > 0 && (
                <div className="col-span-2 p-3 bg-yellow-50 border-2 border-yellow-400">
                  <div className="flex items-center justify-center gap-1 text-yellow-700 font-black text-lg">
                    <BookmarkCheck className="w-4 h-4" />
                    {markedCount} marked for review
                  </div>
                </div>
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 py-3 bg-white border-4 border-black font-black uppercase hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(false)}
                disabled={submitting}
                className="flex-1 py-3 bg-black text-white border-4 border-black font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin mx-auto" />
                ) : (
                  "Confirm Submit"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
