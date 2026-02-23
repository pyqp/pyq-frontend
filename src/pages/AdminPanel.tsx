import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart2,
  Search,
  RefreshCw,
  Ban,
  CheckCircle,
  CreditCard,
  Upload,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  Loader2,
  AlertCircle,
  LogOut,
  Flame,
  X,
  Plus,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import apiClient from "../api/Client";
import toast from "react-hot-toast";

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = "dashboard" | "users" | "questions" | "analytics";

interface DashStats {
  totalUsers: number;
  newUsersToday: number;
  newUsersThisMonth: number;
  totalTests: number;
  totalQuestions: number;
  totalExams: number;
  revenueThisMonth: number;
  revenueLastMonth: number;
  totalPayments: number;
  activeAttempts: number;
  totalResults: number;
  userGrowth: number;
  revenueGrowth: number;
}

interface AdminUser {
  _id: string;
  name: string;
  email: string;
  role: string;
  isActive: boolean;
  isEmailVerified: boolean;
  credits: { total: number };
  stats: { totalTestsTaken: number };
  createdAt: string;
}

interface QStat {
  examId: string;
  examName: string;
  examShortName: string;
  total: number;
  pyq: number;
  mock: number;
  practice: number;
  easy: number;
  medium: number;
  hard: number;
}

interface Exam {
  _id: string;
  name: string;
  shortName: string;
}

// ─── Stat card ────────────────────────────────────────────────────────────────
const Stat = ({
  label,
  value,
  sub,
  accent = false,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  sub?: string;
  accent?: boolean;
  icon: any;
}) => (
  <div
    className={`border-4 border-black p-5 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] ${accent ? "bg-amber-400" : "bg-white"}`}
  >
    <div className="flex items-start justify-between mb-3">
      <Icon className="w-5 h-5" />
      {sub && (
        <span
          className={`flex items-center gap-1 text-xs font-black ${sub.startsWith("+") ? "text-green-600" : "text-red-500"}`}
        >
          {sub.startsWith("+") ? (
            <TrendingUp className="w-3 h-3" />
          ) : (
            <TrendingDown className="w-3 h-3" />
          )}
          {sub}
        </span>
      )}
    </div>
    <div
      className="font-black text-3xl"
      style={{ fontFamily: "'Archivo Black',sans-serif" }}
    >
      {value}
    </div>
    <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">
      {label}
    </div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [tab, setTab] = useState<Tab>("dashboard");

  // Dashboard
  const [stats, setStats] = useState<DashStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  // Users
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [userTotal, setUserTotal] = useState(0);
  const [userPage, setUserPage] = useState(1);
  const [userSearch, setUserSearch] = useState("");
  const [userLoading, setUserLoading] = useState(false);
  const [grantTarget, setGrantTarget] = useState<AdminUser | null>(null);
  const [grantAmount, setGrantAmount] = useState("");

  // Questions
  const [qStats, setQStats] = useState<QStat[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [uploadExam, setUploadExam] = useState("");
  const [uploadJson, setUploadJson] = useState("");
  const [uploading, setUploading] = useState(false);
  const [qLoading, setQLoading] = useState(false);

  // Analytics
  const [revenue, setRevenue] = useState<any[]>([]);
  const [userGrowth, setUserGrowth] = useState<any[]>([]);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // ── Fetch helpers ──────────────────────────────────────────────────────────
  const fetchDashboard = useCallback(async () => {
    setStatsLoading(true);
    try {
      const { data } = await apiClient.get("/admin/dashboard");
      console.log("Admin dashboard data:", data);

      const backendData = data.data;
      const mappedStats: DashStats = {
        totalUsers: backendData.users?.total ?? 0,
        newUsersToday: backendData.users?.today ?? 0,
        newUsersThisMonth: backendData.users?.thisMonth ?? 0,
        totalTests: backendData.content?.mockTests ?? 0,
        totalQuestions: backendData.content?.questions ?? 0,
        totalExams: backendData.content?.exams ?? 0,
        revenueThisMonth: backendData.revenue?.thisMonth ?? 0,
        revenueLastMonth: backendData.revenue?.lastMonth ?? 0,
        totalPayments: backendData.revenue?.totalPayments ?? 0,
        activeAttempts: backendData.activity?.activeUsers ?? 0,
        totalResults: backendData.activity?.totalResults ?? 0,
        userGrowth: backendData.users?.growth ?? 0,
        revenueGrowth: backendData.revenue?.growth ?? 0,
      };

      setStats(mappedStats);
    } catch (err) {
      console.error("Dashboard fetch error:", err);
      toast.error("Failed to load dashboard");
    } finally {
      setStatsLoading(false);
    }
  }, []);

  const fetchUsers = useCallback(async (page = 1, search = "") => {
    setUserLoading(true);
    try {
      const { data } = await apiClient.get("/admin/users", {
        params: { page, limit: 15, search: search || undefined },
      });
      console.log("Admin users data:", data);

      const usersData = data.data?.users ?? data.data ?? [];
      const pagination = data.data?.pagination ?? data.pagination ?? {};

      setUsers(Array.isArray(usersData) ? usersData : []);
      setUserTotal(pagination.total ?? 0);
    } catch (err) {
      console.error("Users fetch error:", err);
      toast.error("Failed to load users");
      setUsers([]);
      setUserTotal(0);
    } finally {
      setUserLoading(false);
    }
  }, []);

  const fetchQStats = useCallback(async () => {
    setQLoading(true);
    try {
      const [qs, ex] = await Promise.all([
        apiClient.get("/admin/questions/stats"),
        apiClient.get("/exams?limit=100"),
      ]);
      console.log("Question stats:", qs.data);
      console.log("Exams data:", ex.data);

      const questionStats = qs.data?.data ?? [];
      const examsData = ex.data?.data ?? [];

      setQStats(Array.isArray(questionStats) ? questionStats : []);
      setExams(Array.isArray(examsData) ? examsData : []);

      if (Array.isArray(examsData) && examsData.length > 0) {
        setUploadExam(examsData[0]._id);
      }
    } catch (err) {
      console.error("Question stats fetch error:", err);
      toast.error("Failed to load question stats");
      setQStats([]);
      setExams([]);
    } finally {
      setQLoading(false);
    }
  }, []);

  const fetchAnalytics = useCallback(async () => {
    setAnalyticsLoading(true);
    try {
      const [rev, ug] = await Promise.all([
        apiClient.get("/admin/analytics/revenue?period=monthly&months=6"),
        apiClient.get("/admin/analytics/users?months=6"),
      ]);
      console.log("Revenue analytics:", rev.data);
      console.log("User growth analytics:", ug.data);

      const revenueData = rev.data?.data ?? [];
      const userGrowthData = ug.data?.data ?? [];

      setRevenue(Array.isArray(revenueData) ? revenueData : []);
      setUserGrowth(Array.isArray(userGrowthData) ? userGrowthData : []);
    } catch (err) {
      console.error("Analytics fetch error:", err);
      toast.error("Failed to load analytics");
      setRevenue([]);
      setUserGrowth([]);
    } finally {
      setAnalyticsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    if (tab === "users") fetchUsers(userPage, userSearch);
    if (tab === "questions") fetchQStats();
    if (tab === "analytics") fetchAnalytics();
  }, [tab, userPage, userSearch, fetchUsers, fetchQStats, fetchAnalytics]);

  // ── User actions ───────────────────────────────────────────────────────────
  const toggleStatus = async (u: AdminUser) => {
    console.log("CLICKED! User:", u);
    alert("CLICKED!");
    try {
      await apiClient.patch(`/admin/users/${u._id}/toggle-status`);
      toast.success(`User ${u.isActive ? "banned" : "unbanned"}`);
      fetchUsers(userPage, userSearch);
    } catch (e: any) {
      console.error("Toggle status error:", e);
      toast.error(e.response?.data?.message ?? "Failed");
    }
  };

  const grantCredits = async () => {
    if (!grantTarget || !grantAmount) return;
    const n = parseInt(grantAmount, 10);
    if (isNaN(n) || n < 1) {
      toast.error("Enter a valid amount");
      return;
    }
    try {
      await apiClient.post(`/admin/users/${grantTarget._id}/grant-credits`, {
        credits: n,
        reason: "Admin grant",
      });
      toast.success(`Granted ${n} credits to ${grantTarget.name}`);
      setGrantTarget(null);
      setGrantAmount("");
      fetchUsers(userPage, userSearch);
    } catch (e: any) {
      console.error("Grant credits error:", e);
      toast.error(e.response?.data?.message ?? "Failed");
    }
  };

  // ── Question bulk upload ───────────────────────────────────────────────────
  const handleBulkUpload = async () => {
    if (!uploadExam) {
      toast.error("Select an exam");
      return;
    }
    if (!uploadJson.trim()) {
      toast.error("Paste JSON first");
      return;
    }
    let parsed: any[];
    try {
      parsed = JSON.parse(uploadJson);
    } catch {
      toast.error("Invalid JSON — fix formatting and try again");
      return;
    }
    if (!Array.isArray(parsed)) {
      toast.error("JSON must be an array of questions");
      return;
    }
    setUploading(true);
    try {
      const { data } = await apiClient.post("/admin/questions/bulk", {
        examId: uploadExam,
        questions: parsed,
      });
      toast.success(
        `Uploaded ${data.data?.inserted ?? parsed.length} questions`,
      );
      setUploadJson("");
      fetchQStats();
    } catch (e: any) {
      toast.error(e.response?.data?.message ?? "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  if (user?.role !== "admin") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#0f172a]">
        <div className="text-center text-white">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p
            className="font-black text-2xl mb-4"
            style={{ fontFamily: "'Archivo Black',sans-serif" }}
          >
            ACCESS DENIED
          </p>
          <p className="text-gray-400 mb-6">Admin access required</p>
          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-white text-black font-black border-2 border-white"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const safeStats: DashStats = {
    totalUsers: stats?.totalUsers ?? 0,
    newUsersToday: stats?.newUsersToday ?? 0,
    newUsersThisMonth: stats?.newUsersThisMonth ?? 0,
    totalTests: stats?.totalTests ?? 0,
    totalQuestions: stats?.totalQuestions ?? 0,
    totalExams: stats?.totalExams ?? 0,
    revenueThisMonth: stats?.revenueThisMonth ?? 0,
    revenueLastMonth: stats?.revenueLastMonth ?? 0,
    totalPayments: stats?.totalPayments ?? 0,
    activeAttempts: stats?.activeAttempts ?? 0,
    totalResults: stats?.totalResults ?? 0,
    userGrowth: stats?.userGrowth ?? 0,
    revenueGrowth: stats?.revenueGrowth ?? 0,
  };

  return (
    <div
      className="min-h-screen bg-[#0f172a]"
      style={{ fontFamily: "'Space Grotesk', sans-serif" }}
    >
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* Header */}
      <header className="h-[65px] bg-[#0f172a] border-b border-[#1e293b] flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-white" />
          </div>
          <span
            className="font-black text-white text-lg"
            style={{ fontFamily: "'Archivo Black',sans-serif" }}
          >
            ADMIN PANEL
          </span>
          <span className="px-2 py-0.5 bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black rounded">
            {user?.name ?? "Admin"}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-[#334155] hover:border-white transition-colors text-sm font-bold"
          >
            Dashboard
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-red-400 border border-[#334155] text-sm font-bold transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex border-b border-[#1e293b] px-6">
        {(
          [
            { id: "dashboard", label: "Overview", icon: LayoutDashboard },
            { id: "users", label: "Users", icon: Users },
            { id: "questions", label: "Questions", icon: BookOpen },
            { id: "analytics", label: "Analytics", icon: BarChart2 },
          ] as { id: Tab; label: string; icon: any }[]
        ).map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={`flex items-center gap-2 px-5 py-4 font-bold text-sm border-b-2 transition-colors ${
              tab === id
                ? "border-red-500 text-red-400"
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <Icon className="w-4 h-4" />
            {label}
          </button>
        ))}
      </div>

      <div className="p-6 max-w-7xl mx-auto">
        {/* ══ DASHBOARD ══════════════════════════════════════════════════════ */}
        {tab === "dashboard" && (
          <>
            {statsLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2
                    className="font-black text-white text-2xl"
                    style={{ fontFamily: "'Archivo Black',sans-serif" }}
                  >
                    OVERVIEW
                  </h2>
                  <button
                    onClick={fetchDashboard}
                    className="flex items-center gap-2 px-4 py-2 border border-[#334155] text-gray-400 hover:text-white text-sm font-bold transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    Refresh
                  </button>
                </div>

                {/* KPI grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stat
                    icon={Users}
                    label="Total Users"
                    value={safeStats.totalUsers.toLocaleString()}
                    sub={`+${safeStats.newUsersToday} today`}
                    accent
                  />
                  <Stat
                    icon={TrendingUp}
                    label="This Month Revenue"
                    value={`₹${(safeStats.revenueThisMonth / 100).toLocaleString("en-IN")}`}
                    sub={
                      safeStats.revenueGrowth >= 0
                        ? `+${safeStats.revenueGrowth}%`
                        : `${safeStats.revenueGrowth}%`
                    }
                  />
                  <Stat
                    icon={BookOpen}
                    label="Active Tests"
                    value={safeStats.totalTests}
                  />
                  <Stat
                    icon={BarChart2}
                    label="Total Results"
                    value={safeStats.totalResults.toLocaleString()}
                  />
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Stat
                    icon={Users}
                    label="New This Month"
                    value={safeStats.newUsersThisMonth}
                  />
                  <Stat
                    icon={CreditCard}
                    label="Total Payments"
                    value={safeStats.totalPayments.toLocaleString()}
                  />
                  <Stat
                    icon={BookOpen}
                    label="Questions"
                    value={safeStats.totalQuestions.toLocaleString()}
                  />
                  <Stat
                    icon={LayoutDashboard}
                    label="Active Attempts"
                    value={safeStats.activeAttempts}
                  />
                </div>

                {/* Revenue vs last month */}
                <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
                  <h3
                    className="font-black text-white mb-4"
                    style={{ fontFamily: "'Archivo Black',sans-serif" }}
                  >
                    REVENUE COMPARISON
                  </h3>
                  <div className="flex items-end gap-6">
                    {[
                      {
                        label: "Last Month",
                        val: safeStats.revenueLastMonth,
                        color: "bg-gray-600",
                      },
                      {
                        label: "This Month",
                        val: safeStats.revenueThisMonth,
                        color: "bg-amber-400",
                      },
                    ].map(({ label, val, color }) => {
                      const max = Math.max(
                        safeStats.revenueLastMonth,
                        safeStats.revenueThisMonth,
                        1,
                      );
                      const pct = Math.round((val / max) * 100);
                      return (
                        <div key={label} className="flex-1">
                          <div className="text-gray-400 text-xs font-bold uppercase mb-2">
                            {label}
                          </div>
                          <div
                            className={`${color} w-full`}
                            style={{ height: `${Math.max(pct * 1.2, 8)}px` }}
                          />
                          <div className="text-white font-black mt-2">
                            ₹{(val / 100).toLocaleString("en-IN")}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ══ USERS ══════════════════════════════════════════════════════════ */}
        {tab === "users" && (
          <div className="space-y-5">
            <div className="flex items-center justify-between">
              <h2
                className="font-black text-white text-2xl"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}
              >
                USERS{" "}
                <span className="text-gray-500 text-lg">
                  ({userTotal.toLocaleString()})
                </span>
              </h2>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <input
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        setUserPage(1);
                        fetchUsers(1, userSearch);
                      }
                    }}
                    placeholder="Search name or email…"
                    className="pl-9 pr-4 py-2 bg-[#1e293b] border border-[#334155] text-white text-sm font-medium focus:outline-none focus:border-amber-400 w-64"
                  />
                </div>
                <button
                  onClick={() => {
                    setUserPage(1);
                    fetchUsers(1, userSearch);
                  }}
                  className="px-4 py-2 bg-amber-400 text-black font-black text-sm border-2 border-amber-500"
                >
                  Search
                </button>
              </div>
            </div>

            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden">
              {userLoading ? (
                <div className="flex items-center justify-center py-16">
                  <Loader2 className="w-8 h-8 text-white animate-spin" />
                </div>
              ) : (
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#334155]">
                      {[
                        "User",
                        "Role",
                        "Credits",
                        "Tests",
                        "Joined",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#334155]">
                    {users.map((u) => {
                      console.log("User object:", u);
                      console.log("User ID:", u._id);
                      return (
                        <tr
                          key={u._id}
                          className="hover:bg-[#0f172a]/40 transition-colors"
                        >
                          <td className="px-4 py-3">
                            <div className="font-bold text-white text-sm truncate max-w-[140px]">
                              {u.name}
                            </div>
                            <div className="text-gray-500 text-xs truncate max-w-[140px]">
                              {u.email}
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`px-2 py-1 text-xs font-black uppercase ${
                                u.role === "admin"
                                  ? "bg-red-500/20 text-red-400"
                                  : "bg-blue-500/20 text-blue-400"
                              }`}
                            >
                              {u.role}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-black text-amber-400">
                            {u.credits?.total ?? 0}
                          </td>
                          <td className="px-4 py-3 text-gray-300 font-bold">
                            {u.stats?.totalTestsTaken ?? 0}
                          </td>
                          <td className="px-4 py-3 text-gray-400 text-xs">
                            {new Date(u.createdAt).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "2-digit",
                            })}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={`flex items-center gap-1 text-xs font-black ${u.isActive ? "text-green-400" : "text-red-400"}`}
                            >
                              {u.isActive ? (
                                <CheckCircle className="w-3 h-3" />
                              ) : (
                                <Ban className="w-3 h-3" />
                              )}
                              {u.isActive ? "Active" : "Banned"}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => toggleStatus(u)}
                                className={`px-2 py-1 text-xs font-black border transition-colors ${
                                  u.isActive
                                    ? "border-red-500/50 text-red-400 hover:bg-red-500/10"
                                    : "border-green-500/50 text-green-400 hover:bg-green-500/10"
                                }`}
                              >
                                {u.isActive ? "Ban" : "Unban"}
                              </button>
                              <button
                                onClick={() => setGrantTarget(u)}
                                className="px-2 py-1 text-xs font-black border border-amber-500/50 text-amber-400 hover:bg-amber-500/10 transition-colors"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
            </div>

            {userTotal > 15 && (
              <div className="flex items-center justify-between text-sm text-gray-400">
                <span>
                  Showing {(userPage - 1) * 15 + 1}–
                  {Math.min(userPage * 15, userTotal)} of {userTotal}
                </span>
                <div className="flex gap-2">
                  <button
                    disabled={userPage <= 1}
                    onClick={() => {
                      const p = userPage - 1;
                      setUserPage(p);
                      fetchUsers(p, userSearch);
                    }}
                    className="px-3 py-1.5 border border-[#334155] text-gray-400 disabled:opacity-40 hover:border-white hover:text-white transition-colors font-bold"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    disabled={userPage * 15 >= userTotal}
                    onClick={() => {
                      const p = userPage + 1;
                      setUserPage(p);
                      fetchUsers(p, userSearch);
                    }}
                    className="px-3 py-1.5 border border-[#334155] text-gray-400 disabled:opacity-40 hover:border-white hover:text-white transition-colors font-bold"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ══ QUESTIONS ══════════════════════════════════════════════════════ */}
        {tab === "questions" && (
          <div className="space-y-6">
            <h2
              className="font-black text-white text-2xl"
              style={{ fontFamily: "'Archivo Black',sans-serif" }}
            >
              QUESTION BANK
            </h2>

            {qLoading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
            ) : (
              <div className="bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#334155]">
                  <h3 className="font-black text-white">By Exam</h3>
                </div>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#334155]">
                      {[
                        "Exam",
                        "Total",
                        "PYQ",
                        "Mock",
                        "Practice",
                        "Easy",
                        "Medium",
                        "Hard",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-4 py-3 text-left text-xs font-black uppercase tracking-widest text-gray-400"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#334155]">
                    {qStats.length === 0 && (
                      <tr>
                        <td
                          colSpan={8}
                          className="px-4 py-8 text-center text-gray-500 font-bold"
                        >
                          No questions yet — use bulk upload below
                        </td>
                      </tr>
                    )}
                    {qStats.map((qs: any) => (
                      <tr key={qs.examId} className="hover:bg-[#0f172a]/40">
                        <td className="px-4 py-3">
                          <div className="font-bold text-white">
                            {qs.examShortName}
                          </div>
                          <div className="text-gray-500 text-xs truncate max-w-[160px]">
                            {qs.examName}
                          </div>
                        </td>
                        <td className="px-4 py-3 font-black text-amber-400">
                          {qs.total}
                        </td>
                        <td className="px-4 py-3 text-gray-300">{qs.pyq}</td>
                        <td className="px-4 py-3 text-gray-300">{qs.mock}</td>
                        <td className="px-4 py-3 text-gray-300">
                          {qs.practice}
                        </td>
                        <td className="px-4 py-3 text-green-400 font-bold">
                          {qs.easy}
                        </td>
                        <td className="px-4 py-3 text-yellow-400 font-bold">
                          {qs.medium}
                        </td>
                        <td className="px-4 py-3 text-red-400 font-bold">
                          {qs.hard}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Bulk upload */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-amber-400" />
                <h3 className="font-black text-white">Bulk Upload Questions</h3>
              </div>
              <p className="text-gray-400 text-sm">
                Paste a JSON array. Each object needs:{" "}
                <code className="text-amber-400">
                  questionText, options (array of strings), correctOption
                  (0-indexed), subject, topic, difficulty, marks, negativeMarks
                </code>
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                    Exam
                  </label>
                  <select
                    value={uploadExam}
                    onChange={(e) => setUploadExam(e.target.value)}
                    className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] text-white font-medium focus:outline-none focus:border-amber-400"
                  >
                    <option value="">Select exam…</option>
                    {exams.map((e) => (
                      <option key={e._id} value={e._id}>
                        {e.shortName} — {e.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-end">
                  <button
                    onClick={handleBulkUpload}
                    disabled={uploading || !uploadExam || !uploadJson.trim()}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-black font-black uppercase border-2 border-amber-500
                               shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]
                               hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
                  >
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    Upload
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                  JSON Array
                </label>
                <textarea
                  value={uploadJson}
                  onChange={(e) => setUploadJson(e.target.value)}
                  placeholder={`[\n  {\n    "questionText": "What is 2+2?",\n    "options": ["3","4","5","6"],\n    "correctOption": 1,\n    "subject": "Mathematics",\n    "topic": "Arithmetic",\n    "difficulty": "easy",\n    "marks": 2,\n    "negativeMarks": 0.5\n  }\n]`}
                  rows={10}
                  className="w-full px-4 py-3 bg-[#0f172a] border border-[#334155] text-white text-sm font-mono focus:outline-none focus:border-amber-400 resize-y"
                />
              </div>
            </div>
          </div>
        )}

        {/* ══ ANALYTICS ══════════════════════════════════════════════════════ */}
        {tab === "analytics" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2
                className="font-black text-white text-2xl"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}
              >
                ANALYTICS
              </h2>
              <button
                onClick={fetchAnalytics}
                className="flex items-center gap-2 px-4 py-2 border border-[#334155] text-gray-400 hover:text-white text-sm font-bold transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>

            {analyticsLoading ? (
              <div className="flex justify-center py-20">
                <Loader2 className="w-10 h-10 text-white animate-spin" />
              </div>
            ) : (
              <>
                <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
                  <h3
                    className="font-black text-white mb-6"
                    style={{ fontFamily: "'Archivo Black',sans-serif" }}
                  >
                    MONTHLY REVENUE (₹)
                  </h3>
                  {!Array.isArray(revenue) || revenue.length === 0 ? (
                    <p className="text-gray-500 font-bold text-sm">
                      No revenue data yet
                    </p>
                  ) : (
                    <div className="flex items-end gap-3 h-40">
                      {revenue.map((r: any) => {
                        const max = Math.max(
                          ...revenue.map((x: any) => x.revenue ?? x.total ?? 0),
                          1,
                        );
                        const val = r.revenue ?? r.total ?? 0;
                        const pct = Math.max((val / max) * 100, 2);
                        return (
                          <div
                            key={r.month ?? r.period}
                            className="flex-1 flex flex-col items-center gap-1"
                          >
                            <span className="text-amber-400 text-xs font-black">
                              ₹{Math.round(val / 100).toLocaleString()}
                            </span>
                            <div
                              className="w-full bg-amber-400 border-t-2 border-amber-500 transition-all"
                              style={{ height: `${pct * 1.3}px` }}
                            />
                            <span className="text-gray-500 text-xs font-bold">
                              {r.month ?? r.period}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>

                <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
                  <h3
                    className="font-black text-white mb-6"
                    style={{ fontFamily: "'Archivo Black',sans-serif" }}
                  >
                    USER GROWTH
                  </h3>
                  {!Array.isArray(userGrowth) || userGrowth.length === 0 ? (
                    <p className="text-gray-500 font-bold text-sm">
                      No user growth data yet
                    </p>
                  ) : (
                    <div className="flex items-end gap-3 h-40">
                      {userGrowth.map((r: any) => {
                        const max = Math.max(
                          ...userGrowth.map(
                            (x: any) => x.newUsers ?? x.count ?? 0,
                          ),
                          1,
                        );
                        const val = r.newUsers ?? r.count ?? 0;
                        const pct = Math.max((val / max) * 100, 2);
                        return (
                          <div
                            key={r.month ?? r.period}
                            className="flex-1 flex flex-col items-center gap-1"
                          >
                            <span className="text-blue-400 text-xs font-black">
                              {val}
                            </span>
                            <div
                              className="w-full bg-blue-500 border-t-2 border-blue-400 transition-all"
                              style={{ height: `${pct * 1.3}px` }}
                            />
                            <span className="text-gray-500 text-xs font-bold">
                              {r.month ?? r.period}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* Grant credits modal */}
      {grantTarget && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border-2 border-amber-400 rounded-2xl p-8 max-w-sm w-full shadow-[8px_8px_0px_0px_rgba(251,191,36,0.3)]">
            <div className="flex items-center justify-between mb-6">
              <h3
                className="font-black text-white text-lg"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}
              >
                GRANT CREDITS
              </h3>
              <button
                onClick={() => {
                  setGrantTarget(null);
                  setGrantAmount("");
                }}
                className="text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Granting credits to{" "}
              <span className="text-white font-black">{grantTarget.name}</span>
              <br />
              <span className="text-gray-500">{grantTarget.email}</span>
            </p>
            <div className="mb-6">
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">
                Amount
              </label>
              <input
                type="number"
                min="1"
                max="100"
                value={grantAmount}
                onChange={(e) => setGrantAmount(e.target.value)}
                placeholder="e.g. 5"
                autoFocus
                className="w-full px-4 py-3 bg-[#0f172a] border-2 border-[#334155] text-white font-bold text-xl focus:outline-none focus:border-amber-400"
              />
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setGrantTarget(null);
                  setGrantAmount("");
                }}
                className="flex-1 py-3 border-2 border-[#334155] text-gray-400 font-black uppercase hover:border-white transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={grantCredits}
                className="flex-1 py-3 bg-amber-400 text-black font-black uppercase border-2 border-amber-500
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]
                           hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
              >
                Grant
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
