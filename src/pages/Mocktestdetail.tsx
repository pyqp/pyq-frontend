import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  Clock, FileText, BarChart2, Lock, Zap, ChevronRight,
  CheckCircle, AlertCircle, Users, Star, Loader2, ArrowLeft,
  BookOpen, Target, Shield
} from 'lucide-react';
import { mockTestApi } from '../api/Mocktest.api';
import type { MockTestDetail as MockTestDetailType } from '../api/Mocktest.api';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const DIFF_STYLE: Record<string, string> = {
  easy:   'bg-green-400 border-green-500',
  medium: 'bg-yellow-400 border-yellow-500',
  hard:   'bg-red-400 border-red-500',
};

export default function MockTestDetail() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const [test, setTest]       = useState<MockTestDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [starting, setStarting] = useState(false);
  const [attempts, setAttempts] = useState<any[]>([]);

  useEffect(() => {
    if (!id) return;
    mockTestApi.getById(id)
      .then(({ data }) => setTest(data.data))
      .catch(() => { toast.error('Test not found'); navigate('/mock-tests'); })
      .finally(() => setLoading(false));

    // Fetch past attempts if logged in
    if (isAuthenticated) {
      mockTestApi.getMyAttempts(id)
        .then(({ data }) => setAttempts(data.data))
        .catch(() => {});
    }
  }, [id, isAuthenticated]);

  const handleStart = async () => {
    if (!test) return;
    if (!isAuthenticated) {
      toast('Login to start the test', { icon: '🔒' });
      navigate('/login', { state: { from: `/mock-tests/${id}` } });
      return;
    }
    if (test.isPaid && (user?.credits?.total ?? 0) < test.creditsRequired) {
      toast.error(`You need ${test.creditsRequired} credit(s). Buy more to continue.`);
      navigate('/pricing');
      return;
    }
    setStarting(true);
    try {
      const { data } = await mockTestApi.startTest(test._id);
      toast.success('Test started! Good luck 🎯');
      navigate(`/mock-tests/${test._id}/attempt`, { state: { attempt: data.data } });
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Failed to start test');
    } finally {
      setStarting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-12 h-12 animate-spin text-black" />
      </div>
    );
  }
  if (!test) return null;

  const hasAttempted = attempts.length > 0;
  const bestAttempt  = hasAttempted
    ? attempts.reduce((best: any, a: any) => (a.totalScore > (best?.totalScore ?? -Infinity) ? a : best), null)
    : null;
  const canStart = !test.isPaid || (user?.credits?.total ?? 0) >= test.creditsRequired;

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Back breadcrumb ────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 pt-6">
        <Link to="/mock-tests" className="inline-flex items-center gap-1.5 text-gray-500 font-bold text-sm hover:text-black transition-colors">
          <ArrowLeft className="w-4 h-4" />Back to Mock Tests
        </Link>
      </div>

      {/* ── Hero card ─────────────────────────────────────────────────────── */}
      <div className="max-w-4xl mx-auto px-4 py-5">
        <div className="bg-black text-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,0.15)] p-8">
          {/* Badges row */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`px-3 py-1 border-2 border-black font-black text-xs uppercase ${DIFF_STYLE[test.difficulty] ?? 'bg-gray-300'}`}>
              {test.difficulty}
            </span>
            {test.exam && (
              <span className="px-3 py-1 bg-white/10 border border-white/20 font-bold text-xs uppercase text-white">
                {(test.exam as any).shortName ?? (test.exam as any).name}
              </span>
            )}
            {test.isPaid ? (
              <span className="flex items-center gap-1 px-3 py-1 bg-amber-400 text-black border-2 border-amber-500 font-black text-xs">
                <Lock className="w-3 h-3" />{test.creditsRequired} Credit{test.creditsRequired > 1 ? 's' : ''}
              </span>
            ) : (
              <span className="px-3 py-1 bg-green-400 border-2 border-green-500 text-black font-black text-xs uppercase">FREE</span>
            )}
            {hasAttempted && (
              <span className="flex items-center gap-1 px-3 py-1 bg-blue-400 border-2 border-blue-500 text-black font-black text-xs">
                <CheckCircle className="w-3 h-3" />Attempted
              </span>
            )}
          </div>

          <h1 className="font-black text-2xl md:text-4xl mb-3 leading-tight"
            style={{ fontFamily: "'Archivo Black',sans-serif" }}>
            {test.name}
          </h1>
          {test.description && (
            <p className="text-gray-300 font-medium text-base mb-6 max-w-2xl">{test.description}</p>
          )}

          {/* Stats row */}
          <div className="flex flex-wrap gap-6 mb-8">
            {[
              { icon: Clock,    label: `${test.duration} min`,         tip: 'Duration' },
              { icon: FileText, label: `${test.totalQuestions} Qs`,    tip: 'Questions' },
              { icon: Star,     label: `${test.totalMarks} marks`,     tip: 'Total Marks' },
              { icon: Users,    label: `${test.attemptCount ?? 0}`,    tip: 'Attempts' },
            ].map(({ icon: Icon, label, tip }) => (
              <div key={tip} className="flex items-center gap-2">
                <Icon className="w-4 h-4 text-gray-400" />
                <span className="font-black text-white">{label}</span>
                <span className="text-gray-500 text-xs font-medium">{tip}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="flex flex-wrap gap-3 items-center">
            <button
              onClick={handleStart}
              disabled={starting}
              className={`flex items-center gap-2 px-8 py-4 font-black text-lg uppercase border-4 transition-all
                shadow-[6px_6px_0px_0px_rgba(255,255,255,0.2)] hover:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.2)]
                hover:translate-x-0.5 hover:translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed
                disabled:hover:translate-x-0 disabled:hover:translate-y-0
                ${canStart ? 'bg-yellow-400 text-black border-yellow-500' : 'bg-gray-600 text-gray-300 border-gray-700'}`}
            >
              {starting
                ? <Loader2 className="w-5 h-5 animate-spin" />
                : hasAttempted
                  ? <><Zap className="w-5 h-5" />Retake Test</>
                  : <><Zap className="w-5 h-5" />Start Test</>
              }
            </button>

            {!canStart && !starting && (
              <Link to="/pricing"
                className="flex items-center gap-2 px-6 py-4 bg-transparent text-yellow-400 border-4 border-yellow-400 font-black text-sm uppercase
                  hover:bg-yellow-400 hover:text-black transition-colors">
                Buy Credits <ChevronRight className="w-4 h-4" />
              </Link>
            )}

            {!isAuthenticated && (
              <p className="text-gray-400 text-sm font-medium">
                <Link to="/login" className="text-yellow-400 hover:underline">Login</Link> required to start
              </p>
            )}

            <Link to={`/mock-tests/${id}/leaderboard`}
              className="flex items-center gap-2 px-5 py-3 bg-transparent text-gray-400 border-2 border-gray-600 font-bold text-sm uppercase
                hover:border-yellow-400 hover:text-yellow-400 transition-colors">
              🏆 View Leaderboard
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pb-12 grid md:grid-cols-3 gap-6">

        {/* ── Left: details ───────────────────────────────────────────────── */}
        <div className="md:col-span-2 space-y-6">

          {/* Sections / subjects */}
          {test.sections && test.sections.length > 0 && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="px-6 py-4 border-b-4 border-black">
                <h2 className="font-black text-xl flex items-center gap-2"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  <BookOpen className="w-5 h-5" />Test Structure
                </h2>
              </div>
              <div className="divide-y-2 divide-black">
                {test.sections.map((sec, i) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-black text-base">{sec.name}</p>
                      {sec.subjects && sec.subjects.length > 0 && (
                        <p className="text-gray-500 text-sm font-medium">{sec.subjects.join(' · ')}</p>
                      )}
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <p className="font-black text-black">{sec.questionsCount} Qs</p>
                      <p className="text-gray-400 text-xs font-bold">{sec.marks} marks · {sec.duration} min</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <div className="px-6 py-4 border-b-4 border-black">
              <h2 className="font-black text-xl flex items-center gap-2"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <AlertCircle className="w-5 h-5" />Instructions
              </h2>
            </div>
            <ul className="px-6 py-5 space-y-3">
              {[
                `Total time: ${test.duration} minutes. Timer starts when you click Start Test.`,
                `${test.totalQuestions} questions for ${test.totalMarks} marks.`,
                'Each correct answer earns full marks. Wrong answers may have negative marking.',
                'You can mark questions for review and revisit them before submitting.',
                'Do not close the browser tab during the test — your progress autosaves.',
                'Submit before time runs out. Test auto-submits when the timer hits zero.',
                ...(test.isPaid
                  ? [`${test.creditsRequired} credit(s) will be deducted when you start. You can retake without additional cost.`]
                  : ['This test is free — no credits required.']),
              ].map((line, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700 font-medium text-sm">
                  <span className="w-5 h-5 bg-black text-white font-black text-xs flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          {/* Past attempts */}
          {hasAttempted && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <div className="px-6 py-4 border-b-4 border-black">
                <h2 className="font-black text-xl flex items-center gap-2"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  <BarChart2 className="w-5 h-5" />Your Attempts
                </h2>
              </div>
              <div className="divide-y-2 divide-gray-100">
                {attempts.slice(0, 5).map((a: any, i: number) => (
                  <div key={i} className="px-6 py-4 flex items-center justify-between">
                    <div>
                      <p className="font-bold text-sm text-gray-500">
                        Attempt #{a.attemptNumber} · {new Date(a.createdAt ?? a.endTime).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                      <p className="font-black text-black">
                        {a.totalScore ?? 0} / {test.totalMarks}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="px-2 py-1 bg-gray-100 font-bold text-xs">
                        {a.accuracy ?? 0}% acc
                      </span>
                      {a.resultId && (
                        <Link to={`/results/${a.resultId}`}
                          className="flex items-center gap-1 text-blue-600 font-bold text-xs hover:underline">
                          View <ChevronRight className="w-3 h-3" />
                        </Link>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* ── Right: sidebar cards ─────────────────────────────────────────── */}
        <div className="space-y-5">

          {/* Your best score */}
          {bestAttempt && (
            <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
              <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Your Best Score</p>
              <div className="text-4xl font-black text-black mb-1"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                {Math.round(((bestAttempt.totalScore ?? 0) / test.totalMarks) * 100)}%
              </div>
              <p className="text-gray-500 font-bold text-sm">
                {bestAttempt.totalScore} / {test.totalMarks} marks
              </p>
              <p className="text-gray-400 text-xs mt-1">in {attempts.length} attempt{attempts.length > 1 ? 's' : ''}</p>
            </div>
          )}

          {/* Quick stats */}
          <div className="bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5">
            <p className="text-xs font-black uppercase tracking-widest text-gray-400 mb-3">Test Info</p>
            <div className="space-y-3">
              {[
                { icon: Clock,    label: 'Duration',   value: `${test.duration} min` },
                { icon: FileText, label: 'Questions',  value: test.totalQuestions },
                { icon: Target,   label: 'Total Marks',value: test.totalMarks },
                { icon: BarChart2,label: 'Difficulty', value: test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1) },
                { icon: Users,    label: 'Attempts',   value: (test.attemptCount ?? 0).toLocaleString() },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 text-gray-500 font-medium">
                    <Icon className="w-4 h-4" />{label}
                  </span>
                  <span className="font-black text-black">{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Credit info */}
          <div className={`border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-5 ${test.isPaid ? 'bg-amber-50' : 'bg-green-50'}`}>
            <div className="flex items-center gap-2 mb-2">
              {test.isPaid
                ? <Lock className="w-4 h-4 text-amber-600" />
                : <Shield className="w-4 h-4 text-green-600" />}
              <p className="font-black text-sm uppercase tracking-widest">
                {test.isPaid ? 'Paid Test' : 'Free Test'}
              </p>
            </div>
            {test.isPaid ? (
              <>
                <p className="text-gray-600 text-sm font-medium mb-3">
                  Costs <span className="font-black text-black">{test.creditsRequired} credit{test.creditsRequired > 1 ? 's' : ''}</span> to unlock. Retake unlimited times.
                </p>
                {isAuthenticated && (
                  <p className="text-xs font-bold text-gray-500">
                    Your balance: <span className={`font-black ${canStart ? 'text-green-600' : 'text-red-500'}`}>
                      {user?.credits?.total ?? 0} credits
                    </span>
                  </p>
                )}
              </>
            ) : (
              <p className="text-gray-600 text-sm font-medium">No credits needed. Free for everyone.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}