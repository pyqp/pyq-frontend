import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Trophy, Clock, ChevronRight, Loader2,
  Target, TrendingUp, FileText
} from 'lucide-react';
import { resultApi } from '../api/Result.api';
import type { ResultSummary } from '../api/Result.api';
import toast from 'react-hot-toast';

const pct = (n: number, t: number) => (t > 0 ? Math.round((n / t) * 100) : 0);

const RingBadge = ({ value }: { value: number }) => {
  const color = value >= 80 ? '#22c55e' : value >= 60 ? '#f59e0b' : value >= 40 ? '#f97316' : '#ef4444';
  const r = 18, circ = 2 * Math.PI * r;
  const dash = (value / 100) * circ;
  return (
    <svg width="48" height="48" className="flex-shrink-0">
      <circle cx="24" cy="24" r={r} fill="none" stroke="#e5e7eb" strokeWidth="4" />
      <circle cx="24" cy="24" r={r} fill="none" stroke={color} strokeWidth="4"
        strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
        transform="rotate(-90 24 24)" style={{ transition: 'stroke-dasharray .6s ease' }} />
      <text x="24" y="28" textAnchor="middle" fontSize="11" fontWeight="900" fill={color}>{value}%</text>
    </svg>
  );
};

export default function Results() {
  const [results, setResults]     = useState<ResultSummary[]>([]);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    setLoading(true);
    resultApi.getAll({ page, limit: 10 })
      .then(({ data }) => {
        setResults(data.data);
        setTotalPages(data.pagination?.totalPages ?? 1);
      })
      .catch(() => toast.error('Could not load results'))
      .finally(() => setLoading(false));
  }, [page]);

  // ── Stats from loaded results ─────────────────────────────────────────────
  const avgScore  = results.length
    ? Math.round(results.reduce((s, r) => s + (r.percentage ?? pct(r.finalScore ?? 0, r.totalMarks)), 0) / results.length)
    : 0;
  const bestScore = results.length
    ? Math.max(...results.map(r => r.percentage ?? pct(r.finalScore ?? 0, r.totalMarks)))
    : 0;

  return (
    <div className="min-h-screen bg-[#FAFAFA]" style={{ fontFamily: "'Space Grotesk',sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* Hero */}
      <div className="bg-black text-white py-14 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 right-4 text-8xl font-black" style={{ fontFamily: "'Archivo Black',sans-serif" }}>RESULTS</div>
        </div>
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-black font-black text-xs uppercase tracking-widest border-4 border-yellow-300 mb-4">
            <Trophy className="w-4 h-4" />My Results
          </div>
          <h1 className="text-5xl font-black mb-1" style={{ fontFamily: "'Archivo Black',sans-serif" }}>TEST HISTORY</h1>
          <p className="text-gray-400 font-medium">Track your progress over time</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">

        {/* Summary cards */}
        {results.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            {[
              { label:'Tests Taken', value: results.length, icon: FileText, color:'bg-blue-400'  },
              { label:'Avg Score',   value: `${avgScore}%`,  icon: Target,   color:'bg-amber-400' },
              { label:'Best Score',  value: `${bestScore}%`, icon: TrendingUp,color:'bg-green-400'},
            ].map(({ label, value, icon: Icon, color }) => (
              <div key={label} className="bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3">
                <div className={`${color} border-2 border-black p-2`}><Icon className="w-5 h-5 text-black" /></div>
                <div>
                  <div className="font-black text-xl" style={{ fontFamily: "'Archivo Black',sans-serif" }}>{value}</div>
                  <div className="text-xs font-bold uppercase text-gray-500">{label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results list */}
        {loading ? (
          <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin" /></div>
        ) : results.length === 0 ? (
          <div className="text-center py-20 bg-white border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <Trophy className="w-16 h-16 text-gray-200 mx-auto mb-4" />
            <p className="font-black text-3xl text-gray-300 mb-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>NO RESULTS YET</p>
            <p className="text-gray-500 font-medium mb-6">Take your first mock test to see results here</p>
            <Link to="/mock-tests"
              className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-black uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all">
              Browse Mock Tests
            </Link>
          </div>
        ) : (
          <div className="space-y-3 mb-8">
            {results.map((r) => {
              const score = r.percentage ?? pct(r.finalScore ?? 0, r.totalMarks);
              const date  = new Date(r.createdAt).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' });
              return (
                <Link key={r._id} to={`/results/${r._id}`}
                  className="flex items-center gap-4 bg-white border-4 border-black p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all group"
                >
                  <RingBadge value={score} />

                  <div className="flex-1 min-w-0">
                    <p className="font-black text-base truncate" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                      {r.mockTest?.name ?? 'Mock Test'}
                    </p>
                    <div className="flex items-center flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1 font-bold"><Clock className="w-3 h-3" />{r.timeTaken} min</span>
                      {r.rank && <span className="flex items-center gap-1 font-bold"><Trophy className="w-3 h-3 text-yellow-500" />Rank #{r.rank}</span>}
                      <span className="font-medium">{date}</span>
                    </div>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <div className="font-black text-xl" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                      {r.finalScore}<span className="text-gray-400 font-bold text-sm">/{r.totalMarks}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-gray-400">
                      <span className="text-green-600">{r.correct ?? '?'}✓</span>
                      <span className="text-red-500">{r.incorrect ?? '?'}✗</span>
                    </div>
                  </div>

                  <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-black transition-colors flex-shrink-0" />
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button key={p} onClick={() => setPage(p)}
                className={`w-12 h-12 border-4 border-black font-black text-sm transition-all ${page === p ? 'bg-black text-white shadow-none' : 'bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]'}`}>
                {p}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}