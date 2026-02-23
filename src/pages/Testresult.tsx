import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Trophy, Target, Clock, TrendingUp, CheckCircle, XCircle,
  Minus, ChevronDown, ChevronUp, RotateCcw, List, Loader2,
  Award, BarChart2, BookOpen, Eye
} from 'lucide-react';
import { resultApi } from '../api/Result.api';
import toast from 'react-hot-toast';

// ── Helpers ───────────────────────────────────────────────────────────────────
const pct = (n: number, total: number) =>
  total > 0 ? Math.round((n / total) * 100) : 0;

const ScoreBadge = ({ pct }: { pct: number }) => {
  const bg = pct >= 80 ? 'bg-green-500' : pct >= 60 ? 'bg-yellow-400' : pct >= 40 ? 'bg-orange-400' : 'bg-red-500';
  const text = pct >= 80 ? 'text-white' : pct >= 60 ? 'text-black' : 'text-white';
  return (
    <span className={`px-3 py-1 ${bg} ${text} border-2 border-black font-black text-sm`}>
      {pct}%
    </span>
  );
};

const Bar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="h-3 bg-gray-100 border-2 border-black w-full">
    <div className={`h-full ${color} transition-all duration-700`} style={{ width: `${max > 0 ? (value / max) * 100 : 0}%` }} />
  </div>
);

export default function TestResult() {
  const { id }   = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [data, setData]         = useState<any | null>(null);
  const [loading, setLoading]   = useState(true);
  const [openSub, setOpenSub]   = useState<number | null>(0); // first subject open
  const [activeTab, setActiveTab] = useState<'analytics' | 'review'>('analytics');
  const [openQ, setOpenQ]       = useState<number | null>(null);

  useEffect(() => {
    if (!id) return;
    resultApi.getAnalytics(id)
      .then(({ data: res }) => setData(res.data))
      .catch(() => {
        // Fallback: try getById for basic result
        resultApi.getById(id)
          .then(({ data: res }) => setData({ result: res.data }))
          .catch(() => { toast.error('Could not load result'); navigate('/results'); });
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-yellow-400" />
          <p className="font-black text-xl" style={{ fontFamily: "'Archivo Black',sans-serif" }}>Loading results...</p>
        </div>
      </div>
    );
  }
  if (!data) return null;

  // Backend analytics shape: { overview, comparison, subjectPerformance, ... }
  // Fallback basic shape from getById: flat result object
  const ov  = data.overview ?? data.result ?? data;
  const sp  = data.subjectPerformance ?? [];
  const cmp = data.comparison ?? ov.comparison ?? {};

  const percentage    = ov.percentage   ?? pct(ov.score ?? ov.finalScore ?? 0, ov.totalMarks ?? 1);
  const correct       = ov.correct      ?? 0;
  const wrong         = ov.incorrect    ?? 0;
  const unattempted   = ov.unattempted  ?? 0;
  const totalQ        = correct + wrong + unattempted;
  const score         = ov.score        ?? ov.finalScore ?? 0;
  const totalMarks    = ov.totalMarks   ?? data.mockTest?.totalMarks ?? 0;
  const timeTaken     = ov.timeTaken    ?? 0;
  const rank          = ov.rank;
  const percentile    = ov.percentile;
  const participants  = ov.totalParticipants ?? 0;
  const testName      = data.mockTest?.name  ?? ov.mockTest?.name ?? 'Mock Test';
  const qa: any[]     = data.questionAnalysis ?? [];

  const TABS = [
    { id: 'analytics', label: 'Analytics',     icon: BarChart2 },
    { id: 'review',    label: `Review (${qa.length})`, icon: BookOpen },
  ] as const;

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="bg-black text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 text-8xl font-black" style={{ fontFamily: "'Archivo Black',sans-serif" }}>RESULT</div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <div className={`inline-flex items-center gap-2 px-5 py-2 border-4 border-black font-black text-sm uppercase mb-4 ${percentage >= 60 ? 'bg-yellow-400 text-black' : 'bg-red-500 text-white'}`}>
            <Trophy className="w-4 h-4" />
            {percentage >= 80 ? 'Excellent!' : percentage >= 60 ? 'Good job!' : percentage >= 40 ? 'Keep practising' : 'Need more practice'}
          </div>
          <h1 className="font-black text-3xl md:text-5xl mb-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>{testName}</h1>
          <p className="text-gray-400 font-medium">Test completed</p>
        </div>
      </div>

      {/* ── Tab bar ────────────────────────────────────────────────────────── */}
      <div className="border-b-4 border-black bg-white sticky top-0 z-20">
        <div className="max-w-4xl mx-auto flex">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-6 py-4 font-black text-sm uppercase border-b-4 transition-colors ${
                activeTab === id
                  ? 'border-black text-black bg-yellow-400'
                  : 'border-transparent text-gray-500 hover:text-black'
              }`}>
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Score card always visible */}
        <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {/* Score */}
            <div className="col-span-2 md:col-span-1">
              <div className="text-6xl font-black text-black mb-1" style={{ fontFamily: "'Archivo Black',sans-serif" }}>{score}</div>
              <div className="text-gray-500 font-bold text-sm uppercase">/ {totalMarks} marks</div>
              <ScoreBadge pct={percentage} />
            </div>
            {/* Rank */}
            {rank && (
              <div>
                <div className="flex items-center justify-center gap-1 text-4xl font-black" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  <Award className="w-7 h-7 text-yellow-500" />#{rank}
                </div>
                <div className="text-gray-500 font-bold text-sm uppercase">Rank</div>
                {participants > 0 && <div className="text-gray-400 text-xs mt-1">of {participants.toLocaleString()}</div>}
              </div>
            )}
            {/* Percentile */}
            {percentile != null && (
              <div>
                <div className="text-4xl font-black" style={{ fontFamily: "'Archivo Black',sans-serif" }}>{percentile}%</div>
                <div className="text-gray-500 font-bold text-sm uppercase">Percentile</div>
              </div>
            )}
            {/* Time */}
            <div>
              <div className="flex items-center justify-center gap-1 text-4xl font-black" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <Clock className="w-6 h-6 text-blue-500" />{timeTaken}
              </div>
              <div className="text-gray-500 font-bold text-sm uppercase">Minutes</div>
            </div>
          </div>
        </div>

        {/* ── Analytics tab content ─────────────────────────────────────────── */}
        {activeTab === 'analytics' && <>

        {/* ── Q breakdown ───────────────────────────────────────────────────── */}
        <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <h2 className="font-black text-xl mb-5 flex items-center gap-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
            <Target className="w-5 h-5" />Question Breakdown
          </h2>
          <div className="grid grid-cols-3 gap-4 mb-5">
            <div className="text-center p-4 bg-green-50 border-2 border-green-500">
              <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-1" />
              <div className="font-black text-2xl text-green-700">{correct}</div>
              <div className="text-xs font-bold uppercase text-gray-500">Correct</div>
            </div>
            <div className="text-center p-4 bg-red-50 border-2 border-red-500">
              <XCircle className="w-6 h-6 text-red-600 mx-auto mb-1" />
              <div className="font-black text-2xl text-red-700">{wrong}</div>
              <div className="text-xs font-bold uppercase text-gray-500">Wrong</div>
            </div>
            <div className="text-center p-4 bg-gray-50 border-2 border-gray-300">
              <Minus className="w-6 h-6 text-gray-400 mx-auto mb-1" />
              <div className="font-black text-2xl text-gray-600">{unattempted}</div>
              <div className="text-xs font-bold uppercase text-gray-500">Skipped</div>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-5 bg-gray-100 border-2 border-black flex overflow-hidden">
            <div className="bg-green-500 transition-all duration-700" style={{ width: `${pct(correct, totalQ)}%` }} />
            <div className="bg-red-500 transition-all duration-700"   style={{ width: `${pct(wrong, totalQ)}%` }} />
            <div className="bg-gray-300 flex-1" />
          </div>
          <div className="flex gap-4 mt-2 text-xs font-bold">
            <span className="text-green-600">{pct(correct, totalQ)}% correct</span>
            <span className="text-red-600">{pct(wrong, totalQ)}% wrong</span>
            <span className="text-gray-400">{pct(unattempted, totalQ)}% skipped</span>
          </div>
        </div>

        {/* ── Comparison ────────────────────────────────────────────────────── */}
        {cmp.averageScore != null && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
            <h2 className="font-black text-xl mb-5 flex items-center gap-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
              <TrendingUp className="w-5 h-5" />How You Compare
            </h2>
            <div className="space-y-4">
              {[
                { label: 'Your Score',    value: score,              max: totalMarks, color: 'bg-blue-500' },
                { label: 'Average Score', value: cmp.averageScore,   max: totalMarks, color: 'bg-gray-400' },
                { label: 'Top Score',     value: cmp.topScore ?? 0,  max: totalMarks, color: 'bg-yellow-400' },
              ].map(row => (
                <div key={row.label}>
                  <div className="flex justify-between text-sm font-bold mb-1">
                    <span>{row.label}</span>
                    <span>{row.value} / {totalMarks}</span>
                  </div>
                  <Bar value={row.value} max={totalMarks} color={row.color} />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Subject performance ───────────────────────────────────────────── */}
        {sp.length > 0 && (
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="p-6 border-b-4 border-black">
              <h2 className="font-black text-xl flex items-center gap-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <BarChart2 className="w-5 h-5" />Subject-wise Analysis
              </h2>
            </div>
            {sp.map((sub: any, idx: number) => {
              const acc = sub.accuracy ?? pct(sub.correct, sub.totalQuestions);
              return (
                <div key={idx} className="border-b-2 border-gray-200 last:border-0">
                  <button
                    onClick={() => setOpenSub(openSub === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <ScoreBadge pct={acc} />
                      <span className="font-black text-base">{sub.subject}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm font-bold text-gray-500">
                      <span className="text-green-600">{sub.correct}✓</span>
                      <span className="text-red-500">{sub.incorrect ?? sub.wrong ?? 0}✗</span>
                      <span className="text-gray-400">{sub.unattempted ?? 0}-</span>
                      {openSub === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>
                  {openSub === idx && (
                    <div className="px-4 pb-4">
                      <Bar value={sub.correct} max={sub.totalQuestions} color="bg-green-500" />
                      {sub.topics && sub.topics.length > 0 && (
                        <div className="mt-3 space-y-1">
                          {sub.topics.map((t: any, ti: number) => (
                            <div key={ti} className="flex justify-between text-sm">
                              <span className="text-gray-600 font-medium">{t.topic}</span>
                              <span className="font-bold">{t.correct}/{t.total}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        </> /* end analytics tab */}

        {/* ── Review tab ────────────────────────────────────────────────────── */}
        {activeTab === 'review' && (
          qa.length === 0 ? (
            <div className="bg-white border-4 border-black p-12 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="font-black text-xl text-gray-500">Question review not available for this result.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {qa.map((q: any, idx: number) => {
                const isOpen     = openQ === idx;
                const answered   = q.userAnswer !== undefined && q.userAnswer !== null;
                const isCorrect  = q.isCorrect ?? false;
                const status     = !answered ? 'skipped' : isCorrect ? 'correct' : 'wrong';
                const statusStyles = {
                  correct: { bar: 'bg-green-500', badge: 'bg-green-100 text-green-800 border-green-400', icon: <CheckCircle className="w-4 h-4 text-green-600" /> },
                  wrong:   { bar: 'bg-red-500',   badge: 'bg-red-100 text-red-800 border-red-400',       icon: <XCircle className="w-4 h-4 text-red-600" /> },
                  skipped: { bar: 'bg-gray-300',  badge: 'bg-gray-100 text-gray-600 border-gray-300',    icon: <Minus className="w-4 h-4 text-gray-400" /> },
                }[status];
                const opts: any[] = Array.isArray(q.options) ? q.options : [];

                return (
                  <div key={idx} className={`bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}>
                    {/* Status strip */}
                    <div className={`h-1.5 ${statusStyles.bar}`} />
                    {/* Header row */}
                    <button
                      onClick={() => setOpenQ(isOpen ? null : idx)}
                      className="w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors"
                    >
                      <span className="flex-shrink-0 w-8 h-8 bg-black text-white font-black text-sm flex items-center justify-center">
                        {(q.questionNumber ?? idx + 1)}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-sm text-gray-800 line-clamp-2">
                          {q.questionText ?? `Question ${idx + 1}`}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`flex items-center gap-1 px-2 py-0.5 border-2 text-xs font-black ${statusStyles.badge}`}>
                            {statusStyles.icon}
                            {status === 'correct' ? 'Correct' : status === 'wrong' ? 'Wrong' : 'Skipped'}
                          </span>
                          {q.subject && <span className="text-xs text-gray-400 font-medium">{q.subject}</span>}
                          {q.difficulty && (
                            <span className={`text-xs font-black px-1.5 py-0.5 ${
                              q.difficulty === 'easy' ? 'text-green-700' :
                              q.difficulty === 'medium' ? 'text-yellow-700' : 'text-red-700'
                            }`}>{q.difficulty}</span>
                          )}
                        </div>
                      </div>
                      <span className="flex-shrink-0 text-gray-400 mt-1">
                        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </span>
                    </button>

                    {/* Expanded: options + solution */}
                    {isOpen && (
                      <div className="px-4 pb-5 pt-1 space-y-3 border-t-2 border-gray-100">
                        {/* Full question text if it was truncated */}
                        {q.questionText && (
                          <p className="font-medium text-gray-800 text-sm leading-relaxed">{q.questionText}</p>
                        )}

                        {/* Options */}
                        {opts.length > 0 && (
                          <div className="space-y-2">
                            {opts.map((opt: any, oi: number) => {
                              const optText    = typeof opt === 'string' ? opt : opt?.text ?? opt;
                              const isUserAns  = answered && q.userAnswer === oi;
                              const isCorrectA = q.correctAnswer === oi;
                              let bg = 'bg-white border-gray-200';
                              if (isCorrectA) bg = 'bg-green-50 border-green-500';
                              else if (isUserAns && !isCorrectA) bg = 'bg-red-50 border-red-400';

                              return (
                                <div key={oi} className={`flex items-start gap-3 p-3 border-2 ${bg} rounded-sm`}>
                                  <span className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-black ${
                                    isCorrectA ? 'bg-green-500 border-green-500 text-white' :
                                    isUserAns  ? 'bg-red-500 border-red-500 text-white' :
                                    'border-gray-300 text-gray-500'
                                  }`}>
                                    {String.fromCharCode(65 + oi)}
                                  </span>
                                  <span className="text-sm font-medium text-gray-800 flex-1">{optText}</span>
                                  {isCorrectA && <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />}
                                  {isUserAns && !isCorrectA && <XCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />}
                                </div>
                              );
                            })}
                          </div>
                        )}

                        {/* No options stored */}
                        {opts.length === 0 && (
                          <div className="flex gap-3 text-sm">
                            <span className="text-gray-500 font-medium">Your answer:</span>
                            <span className={`font-black ${answered ? (isCorrect ? 'text-green-600' : 'text-red-600') : 'text-gray-400'}`}>
                              {answered ? `Option ${(q.userAnswer ?? 0) + 1} (${String.fromCharCode(65 + (q.userAnswer ?? 0))})` : 'Not attempted'}
                            </span>
                            <span className="text-gray-500 font-medium ml-4">Correct:</span>
                            <span className="font-black text-green-600">
                              Option {(q.correctAnswer ?? 0) + 1} ({String.fromCharCode(65 + (q.correctAnswer ?? 0))})
                            </span>
                          </div>
                        )}

                        {/* Solution / Explanation */}
                        {(q.solution || q.explanation) && (
                          <div className="mt-2 p-3 bg-blue-50 border-2 border-blue-200">
                            <p className="text-xs font-black uppercase text-blue-600 mb-1">
                              {q.solution ? 'Solution' : 'Explanation'}
                            </p>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              {q.solution ?? q.explanation}
                            </p>
                          </div>
                        )}

                        {/* Time spent */}
                        {q.timeSpent > 0 && (
                          <p className="text-xs text-gray-400 font-medium">
                            Time spent: {q.timeSpent}s
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )
        )}

        {/* ── CTA buttons ───────────────────────────────────────────────────── */}
        <div className="flex flex-wrap gap-4 pb-8">
          <Link
            to="/mock-tests"
            className="flex items-center gap-2 px-6 py-4 bg-black text-white font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <RotateCcw className="w-4 h-4" />Practice More
          </Link>
          <Link
            to="/results"
            className="flex items-center gap-2 px-6 py-4 bg-white text-black font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            <List className="w-4 h-4" />All Results
          </Link>
          {data.mockTest?._id && (
            <Link
              to={`/mock-tests/${data.mockTest._id}/leaderboard`}
              className="flex items-center gap-2 px-6 py-4 bg-yellow-400 text-black font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
            >
              <Trophy className="w-4 h-4" />Leaderboard
            </Link>
          )}
          <Link
            to="/dashboard"
            className="flex items-center gap-2 px-6 py-4 bg-white text-black font-black uppercase border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}