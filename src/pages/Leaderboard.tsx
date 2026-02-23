import { useEffect, useState, useCallback } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Trophy, Clock, TrendingUp, ArrowLeft, Loader2,
  ChevronLeft, ChevronRight, Medal, Users
} from 'lucide-react';
import apiClient from '../api/Client';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface RankEntry {
  rank:       number;
  score:      number;
  percentage: number;
  percentile: number;
  timeTaken:  number;
  user:       { _id: string; name: string; avatar?: string };
  lockedAt:   string;
}

interface Stats {
  totalParticipants: number;
  averageScore:      number;
  topScore:          number;
  lowestScore:       number;
  top10Cutoff:       number;
  top25Cutoff:       number;
  medianScore:       number;
}

interface Top3Entry extends RankEntry {}

const Avatar = ({ name, url, size = 'md' }: { name: string; url?: string; size?: 'sm' | 'md' | 'lg' }) => {
  const sz = size === 'lg' ? 'w-14 h-14 text-lg' : size === 'sm' ? 'w-8 h-8 text-xs' : 'w-10 h-10 text-sm';
  const initials = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return url ? (
    <img src={url} alt={name} className={`${sz} rounded-full object-cover border-2 border-black flex-shrink-0`} />
  ) : (
    <div className={`${sz} rounded-full bg-amber-400 border-2 border-black flex items-center justify-center font-black text-black flex-shrink-0`}>
      {initials}
    </div>
  );
};

const MedalIcon = ({ rank }: { rank: number }) => {
  if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
  if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
  if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
  return <span className="font-black text-gray-500 text-sm w-5 text-center">#{rank}</span>;
};

export default function Leaderboard() {
  const { id }     = useParams<{ id: string }>();
  const navigate   = useNavigate();
  const { user }   = useAuth();

  const [testName, setTestName]   = useState('');
  const [rankings, setRankings]   = useState<RankEntry[]>([]);
  const [top3, setTop3]           = useState<Top3Entry[]>([]);
  const [stats, setStats]         = useState<Stats | null>(null);
  const [myRank, setMyRank]       = useState<any | null>(null);
  const [loading, setLoading]     = useState(true);
  const [page, setPage]           = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal]         = useState(0);

  const fetchAll = useCallback(async (p = 1) => {
    if (!id) return;
    setLoading(true);
    try {
      const [testRes, lbRes, statsRes, top3Res] = await Promise.all([
        apiClient.get(`/mock-tests/${id}`),
        apiClient.get(`/rankings/${id}/leaderboard?page=${p}&limit=20`),
        apiClient.get(`/rankings/${id}/stats`),
        apiClient.get(`/rankings/${id}/top3`),
      ]);

      setTestName(testRes.data.data?.name ?? 'Mock Test');
      setRankings(lbRes.data.data ?? []);
      setTotalPages(lbRes.data.pagination?.totalPages ?? 1);
      setTotal(lbRes.data.pagination?.totalItems ?? 0);
      setStats(statsRes.data.data ?? null);
      setTop3(top3Res.data.data ?? []);

      // Try to get my rank (authenticated only)
      if (user) {
        try {
          const myRes = await apiClient.get(`/rankings/${id}/my-rank`);
          setMyRank(myRes.data.data);
        } catch { /* not attempted */ }
      }
    } catch {
      toast.error('Failed to load leaderboard');
      navigate(-1);
    } finally {
      setLoading(false);
    }
  }, [id, user]);

  useEffect(() => { fetchAll(page); }, [page]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center text-white">
          <Loader2 className="w-16 h-16 animate-spin mx-auto mb-4 text-yellow-400" />
          <p className="font-black text-xl" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
            Loading leaderboard...
          </p>
        </div>
      </div>
    );
  }

  const podiumOrder = [top3[1], top3[0], top3[2]].filter(Boolean); // 2nd, 1st, 3rd

  return (
    <div className="min-h-screen bg-[#0f172a]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* Header */}
      <div className="bg-black border-b-4 border-yellow-400 px-4 py-6">
        <div className="max-w-4xl mx-auto">
          <Link to={`/mock-tests/${id}`}
            className="inline-flex items-center gap-2 text-yellow-400 font-bold text-sm hover:text-white transition-colors mb-4">
            <ArrowLeft className="w-4 h-4" />Back to Test
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="font-black text-3xl md:text-4xl text-white mb-1"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                LEADERBOARD
              </h1>
              <p className="text-yellow-400 font-bold">{testName}</p>
            </div>
            <div className="flex items-center gap-2 text-gray-400 font-bold text-sm">
              <Users className="w-4 h-4" />
              {total.toLocaleString()} participants
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Stats bar */}
        {stats && stats.totalParticipants > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Avg Score',   value: stats.averageScore,  icon: TrendingUp },
              { label: 'Top Score',   value: stats.topScore,      icon: Trophy },
              { label: 'Top 10 Cut',  value: stats.top10Cutoff,   icon: Medal },
              { label: 'Median',      value: stats.medianScore,   icon: Clock },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-[#1e293b] border-2 border-[#334155] p-4 text-center">
                <Icon className="w-4 h-4 text-yellow-400 mx-auto mb-2" />
                <div className="font-black text-2xl text-white"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>{value}</div>
                <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{label}</div>
              </div>
            ))}
          </div>
        )}

        {/* My rank banner */}
        {myRank && (
          <div className="bg-yellow-400 border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between">
            <div>
              <p className="font-black text-xs uppercase tracking-widest text-black/60 mb-1">Your Rank</p>
              <div className="flex items-center gap-3">
                <span className="font-black text-4xl text-black"
                  style={{ fontFamily: "'Archivo Black',sans-serif" }}>#{myRank.myRank}</span>
                <div>
                  <p className="font-bold text-black">{myRank.myScore} marks · {myRank.percentage}%</p>
                  <p className="text-sm font-medium text-black/70">{myRank.percentile}th percentile</p>
                </div>
              </div>
            </div>
            {myRank.isLocked && (
              <span className="px-3 py-1 bg-black text-yellow-400 font-black text-xs uppercase border-2 border-black">
                Locked
              </span>
            )}
          </div>
        )}

        {/* Podium (top 3) */}
        {top3.length >= 3 && (
          <div className="bg-[#1e293b] border-2 border-[#334155] rounded-2xl p-6">
            <h2 className="font-black text-white text-lg mb-6 text-center"
              style={{ fontFamily: "'Archivo Black',sans-serif" }}>TOP PERFORMERS</h2>
            <div className="flex items-end justify-center gap-4">
              {podiumOrder.map((entry, pi) => {
                if (!entry) return null;
                const heights  = ['h-24', 'h-36', 'h-20'];     // 2nd, 1st, 3rd
                const bgColors = ['bg-gray-500', 'bg-yellow-400', 'bg-amber-600'];
                const rankIdx  = [1, 0, 2][pi];  // which top3 position
                return (
                  <div key={entry.user._id} className="flex flex-col items-center gap-2 flex-1">
                    <Avatar name={entry.user.name} url={entry.user.avatar} size="lg" />
                    <p className="font-black text-white text-sm text-center truncate w-full text-center">
                      {entry.user.name.split(' ')[0]}
                    </p>
                    <p className="font-bold text-gray-400 text-xs">{entry.score} pts</p>
                    <div className={`w-full ${heights[pi]} ${bgColors[pi]} border-t-4 border-black flex items-center justify-center`}>
                      <span className="font-black text-black text-xl"
                        style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                        {rankIdx === 0 ? '🥇' : rankIdx === 1 ? '🥈' : '🥉'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Full leaderboard table */}
        <div className="bg-[#1e293b] border-2 border-[#334155] rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-[#334155] flex items-center justify-between">
            <h2 className="font-black text-white"
              style={{ fontFamily: "'Archivo Black',sans-serif" }}>ALL RANKINGS</h2>
            <span className="text-gray-400 text-sm font-bold">
              {total > 0 ? `${(page - 1) * 20 + 1}–${Math.min(page * 20, total)} of ${total}` : 'No entries'}
            </span>
          </div>

          {rankings.length === 0 ? (
            <div className="py-16 text-center">
              <Trophy className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400 font-bold">No participants yet. Be the first!</p>
            </div>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[#334155]">
                  {['Rank', 'Student', 'Score', '%ile', 'Time', 'Date'].map(h => (
                    <th key={h} className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#334155]">
                {rankings.map(entry => {
                  const isMe = user && entry.user._id === user._id;
                  return (
                    <tr key={`${entry.user._id}-${entry.rank}`}
                      className={`transition-colors ${isMe ? 'bg-yellow-400/10 border-l-4 border-yellow-400' : 'hover:bg-[#0f172a]/40'}`}>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-center w-8">
                          <MedalIcon rank={entry.rank} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Avatar name={entry.user.name} url={entry.user.avatar} size="sm" />
                          <span className={`font-bold text-sm ${isMe ? 'text-yellow-400' : 'text-white'}`}>
                            {entry.user.name}{isMe && ' (You)'}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-black text-amber-400">{entry.score}</td>
                      <td className="px-4 py-3 text-gray-300 font-bold">{entry.percentile}%</td>
                      <td className="px-4 py-3 text-gray-400 font-medium">
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />{entry.timeTaken}m
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">
                        {new Date(entry.lockedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between text-sm text-gray-400">
            <span>Page {page} of {totalPages}</span>
            <div className="flex gap-2">
              <button disabled={page <= 1}
                onClick={() => setPage(p => p - 1)}
                className="px-3 py-2 border border-[#334155] text-gray-400 disabled:opacity-40 hover:border-yellow-400 hover:text-yellow-400 transition-colors font-bold">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button disabled={page >= totalPages}
                onClick={() => setPage(p => p + 1)}
                className="px-3 py-2 border border-[#334155] text-gray-400 disabled:opacity-40 hover:border-yellow-400 hover:text-yellow-400 transition-colors font-bold">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}