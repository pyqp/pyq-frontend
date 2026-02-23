import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  User, Mail, Phone, Camera, Save, Loader2,
  CreditCard, Calendar, Package, CheckCircle,
  Bell, Globe, BookOpen, Shield, Trash2,
  ChevronRight, LogOut, Flame
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/User.api';
import type { UpdateProfilePayload, UpdatePreferencesPayload } from '../api/User.api';
import toast from 'react-hot-toast';

// ── Tabs ──────────────────────────────────────────────────────────────────────
type Tab = 'profile' | 'credits' | 'preferences';

const TABS: { id: Tab; label: string; icon: any }[] = [
  { id: 'profile',     label: 'Profile',     icon: User      },
  { id: 'credits',     label: 'Credits',     icon: CreditCard },
  { id: 'preferences', label: 'Preferences', icon: Bell      },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
const LEVEL_COLORS: Record<string, string> = {
  bronze:   '#CD7F32',
  silver:   '#A8A9AD',
  gold:     '#FFD700',
  platinum: '#E5E4E2',
};

const InputField = ({
  label, value, onChange, type = 'text', placeholder, disabled = false,
}: {
  label: string; value: string; onChange: (v: string) => void;
  type?: string; placeholder?: string; disabled?: boolean;
}) => (
  <div>
    <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">
      {label}
    </label>
    <input
      type={type}
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="w-full px-4 py-3 bg-[#1e293b] border-2 border-[#334155] text-white font-medium
                 focus:outline-none focus:border-amber-400 disabled:opacity-50 disabled:cursor-not-allowed
                 placeholder-gray-600 transition-colors"
    />
  </div>
);

const Toggle = ({
  label, description, checked, onChange,
}: {
  label: string; description?: string; checked: boolean; onChange: (v: boolean) => void;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[#1e293b] last:border-0">
    <div>
      <p className="text-white font-bold text-sm">{label}</p>
      {description && <p className="text-gray-500 text-xs mt-0.5">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-colors border-2 border-black ${checked ? 'bg-amber-400' : 'bg-[#334155]'}`}
    >
      <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-6' : 'translate-x-0.5'}`} />
    </button>
  </div>
);

// ── Main ──────────────────────────────────────────────────────────────────────
export default function Profile() {
  const navigate          = useNavigate();
  const { user, updateUser, logout, refreshUser } = useAuth();

  const [activeTab, setActiveTab] = useState<Tab>('profile');
  const [saving, setSaving]       = useState(false);
  const [deleting, setDeleting]   = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');

  // ── Profile form ──────────────────────────────────────────────────────────
  const [name,  setName]  = useState(user?.name  ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const avatarRef = useRef<HTMLInputElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile]       = useState<File | null>(null);

  // ── Preferences form ──────────────────────────────────────────────────────
  const [emailNotif, setEmailNotif] = useState(user?.preferences?.emailNotifications ?? true);
  const [smsNotif,   setSmsNotif]   = useState(user?.preferences?.smsNotifications   ?? false);
  const [language,   setLanguage]   = useState(user?.preferences?.language ?? 'en');

  // ── Credit batches ────────────────────────────────────────────────────────
  const [batches, setBatches] = useState<any[]>(user?.credits?.batches ?? []);

  useEffect(() => {
    // Refresh to get latest batches
    refreshUser().then(() => {
      setBatches(user?.credits?.batches ?? []);
    });
  }, []);

  // Sync form if user changes
  useEffect(() => {
    if (!user) return;
    setName(user.name);
    setPhone(user.phone ?? '');
    setEmailNotif(user.preferences?.emailNotifications ?? true);
    setSmsNotif(user.preferences?.smsNotifications ?? false);
    setLanguage(user.preferences?.language ?? 'en');
    setBatches(user.credits?.batches ?? []);
  }, [user]);

  // ── Handlers ──────────────────────────────────────────────────────────────
  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { toast.error('Image must be under 2MB'); return; }
    setAvatarFile(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const saveProfile = async () => {
    if (!name.trim()) { toast.error('Name cannot be empty'); return; }
    setSaving(true);
    try {
      // Upload avatar first if changed
      let avatarUrl = user?.avatar;
      if (avatarFile) {
        const { data } = await userApi.uploadAvatar(avatarFile);
        avatarUrl = data.data.avatarUrl;
        setAvatarFile(null);
      }

      const payload: UpdateProfilePayload = { name: name.trim() };
      if (phone.trim()) payload.phone = phone.trim();
      if (avatarUrl)    payload.avatar = avatarUrl;

      const { data } = await userApi.updateProfile(payload);
      updateUser(data.data);
      toast.success('Profile updated!');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  const savePreferences = async () => {
    setSaving(true);
    try {
      const payload: UpdatePreferencesPayload = {
        emailNotifications: emailNotif,
        smsNotifications:   smsNotif,
        language,
      };
      await userApi.updatePreferences(payload);
      updateUser({ preferences: { ...user!.preferences, ...payload } });
      toast.success('Preferences saved!');
    } catch (err: any) {
      toast.error(err.response?.data?.message ?? 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword.trim()) { toast.error('Enter your password'); return; }
    setDeleting(true);
    try {
      // Backend: DELETE /api/v1/users/account  { password }
      await fetch('/api/v1/users/account', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('accessToken')}` },
        body: JSON.stringify({ password: deletePassword }),
      });
      await logout();
      toast.success('Account deleted');
      navigate('/');
    } catch {
      toast.error('Could not delete account');
    } finally {
      setDeleting(false);
    }
  };

  if (!user) return null;

  const levelColor = LEVEL_COLORS[(user.loyaltyPoints?.level ?? 'bronze').toLowerCase()] ?? '#CD7F32';
  const initials   = user.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  const avatar     = avatarPreview ?? user.avatar;

  return (
    <div className="min-h-screen bg-[#0f172a]" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Space+Grotesk:wght@400;500;600;700&display=swap');`}</style>

      {/* ── Top bar (matches Dashboard) ─────────────────────────────────────── */}
      <header className="h-[65px] bg-[#0f172a] border-b border-[#1e293b] flex items-center justify-between px-6 sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-amber-400 rounded-lg flex items-center justify-center">
            <Flame className="w-4 h-4 text-[#0f172a]" />
          </div>
          <span className="font-black text-white text-lg" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
            PYQPB
          </span>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-4 py-2 text-gray-400 hover:text-white border border-[#334155] hover:border-white transition-colors text-sm font-bold"
        >
          <LogOut className="w-4 h-4" />Logout
        </button>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* ── Avatar + name card ────────────────────────────────────────────── */}
        <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 mb-6 flex items-center gap-5">
          <div className="relative flex-shrink-0">
            {avatar ? (
              <img src={avatar} alt={user.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-amber-400" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-amber-400 border-4 border-amber-500 flex items-center justify-center">
                <span className="font-black text-2xl text-[#0f172a]" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  {initials}
                </span>
              </div>
            )}
            <button
              onClick={() => avatarRef.current?.click()}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-amber-400 rounded-full border-2 border-[#0f172a] flex items-center justify-center hover:bg-amber-300 transition-colors"
            >
              <Camera className="w-4 h-4 text-[#0f172a]" />
            </button>
            <input ref={avatarRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
          </div>

          <div className="flex-1 min-w-0">
            <h1 className="font-black text-white text-xl truncate" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
              {user.name}
            </h1>
            <p className="text-gray-400 text-sm">{user.email}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="px-3 py-1 text-xs font-black uppercase rounded-full border"
                style={{ color: levelColor, borderColor: levelColor, backgroundColor: levelColor + '20' }}>
                {user.loyaltyPoints?.levelName ?? 'Bronze'} · {user.loyaltyPoints?.total ?? 0} pts
              </span>
              <span className="flex items-center gap-1 text-amber-400 font-black text-sm">
                <CreditCard className="w-3.5 h-3.5" />{user.credits?.total ?? 0} credits
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="hidden sm:flex gap-4 text-center flex-shrink-0">
            {[
              { label: 'Tests',   value: user.stats?.totalTestsTaken ?? 0 },
              { label: 'Avg',     value: `${user.stats?.averageScore ?? 0}%` },
              { label: 'Best',    value: `${user.stats?.bestScore ?? 0}%` },
            ].map(({ label, value }) => (
              <div key={label}>
                <div className="font-black text-white text-xl" style={{ fontFamily: "'Archivo Black',sans-serif" }}>{value}</div>
                <div className="text-gray-500 text-xs font-bold uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tabs ──────────────────────────────────────────────────────────── */}
        <div className="flex border-b border-[#1e293b] mb-6">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-5 py-3 font-bold text-sm border-b-2 transition-colors ${
                activeTab === id
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-500 hover:text-gray-300'
              }`}
            >
              <Icon className="w-4 h-4" />{label}
            </button>
          ))}
        </div>

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* TAB: Profile ───────────────────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'profile' && (
          <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6 space-y-5">
            <h2 className="font-black text-white text-lg" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
              Personal Information
            </h2>

            <InputField label="Full Name" value={name} onChange={setName} placeholder="Your name" />
            <InputField label="Email" value={user.email} onChange={() => {}} disabled
              placeholder="Email cannot be changed" />
            <InputField label="Phone" value={phone} onChange={setPhone} type="tel"
              placeholder="+91 XXXXX XXXXX" />

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">
                Member Since
              </label>
              <p className="text-gray-300 font-medium">
                {new Date(user.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>

            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-gray-400 mb-1.5">
                Referral Code
              </label>
              <div className="flex items-center gap-3">
                <code className="px-4 py-2 bg-[#0f172a] border border-[#334155] text-amber-400 font-black tracking-widest text-sm">
                  {user.referralCode}
                </code>
                <button
                  onClick={() => { navigator.clipboard.writeText(user.referralCode); toast.success('Copied!'); }}
                  className="text-xs font-bold text-gray-400 hover:text-white transition-colors"
                >
                  Copy
                </button>
              </div>
            </div>

            {avatarFile && (
              <p className="text-amber-400 text-xs font-bold">
                ✓ New photo selected — will be uploaded on save
              </p>
            )}

            <button
              onClick={saveProfile}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0f172a] font-black uppercase border-2 border-amber-500
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]
                         hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Changes
            </button>

            {/* Danger zone */}
            <div className="border-t border-[#334155] pt-5 mt-2">
              <h3 className="font-black text-red-400 text-sm uppercase tracking-widest mb-3">Danger Zone</h3>
              <button
                onClick={() => setShowDelete(true)}
                className="flex items-center gap-2 px-5 py-2.5 border-2 border-red-500 text-red-400 font-black text-sm uppercase
                           hover:bg-red-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />Delete Account
              </button>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* TAB: Credits ───────────────────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'credits' && (
          <div className="space-y-5">

            {/* Balance card */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-black text-white text-lg" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  Credit Balance
                </h2>
                <button
                  onClick={() => window.location.href = '/pricing'}
                  className="flex items-center gap-1.5 px-4 py-2 bg-amber-400 text-[#0f172a] font-black text-xs uppercase
                             border-2 border-amber-500 shadow-[3px_3px_0px_0px_rgba(0,0,0,0.4)]
                             hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,0.4)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all"
                >
                  <Package className="w-3.5 h-3.5" />Buy Credits
                </button>
              </div>

              <div className="flex items-end gap-2 mb-1">
                <span className="font-black text-5xl text-amber-400" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                  {user.credits?.total ?? 0}
                </span>
                <span className="text-gray-400 font-bold mb-2">credits remaining</span>
              </div>
              {(user.credits?.batches?.find((b: any) => {
                const exp = new Date(b.expiryDate);
                const diffDays = (exp.getTime() - Date.now()) / 86400000;
                return diffDays <= 30 && diffDays > 0 && b.creditsRemaining > 0;
              })) && (
                <p className="text-amber-400 text-sm font-bold flex items-center gap-1">
                  ⚠ Some credits expiring soon
                </p>
              )}
            </div>

            {/* Credit batches */}
            {batches.length > 0 && (
              <div className="bg-[#1e293b] border border-[#334155] rounded-2xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#334155]">
                  <h3 className="font-black text-white" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                    Credit Batches
                  </h3>
                </div>
                <div className="divide-y divide-[#334155]">
                  {batches.map((b: any, i: number) => {
                    const exp     = new Date(b.expiryDate ?? b.purchaseDate);
                    const expired = exp < new Date();
                    const daysLeft = Math.ceil((exp.getTime() - Date.now()) / 86400000);
                    return (
                      <div key={i} className="px-6 py-4 flex items-center gap-4">
                        <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${expired ? 'bg-red-500' : b.creditsRemaining > 0 ? 'bg-green-400' : 'bg-gray-600'}`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-bold text-sm truncate">{b.packageName}</p>
                          <p className="text-gray-500 text-xs">
                            Purchased {new Date(b.purchaseDate).toLocaleDateString('en-IN', { day:'numeric', month:'short', year:'numeric' })}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <p className="font-black text-white">
                            {b.creditsRemaining}<span className="text-gray-500 font-bold text-sm">/{b.creditsReceived}</span>
                          </p>
                          <p className={`text-xs font-bold ${expired ? 'text-red-400' : daysLeft <= 14 ? 'text-amber-400' : 'text-gray-500'}`}>
                            {expired ? 'Expired' : `${daysLeft}d left`}
                          </p>
                        </div>
                        {!expired && b.creditsRemaining > 0 && (
                          <CheckCircle className="w-4 h-4 text-green-400 flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {batches.length === 0 && (
              <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-8 text-center">
                <CreditCard className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                <p className="text-gray-400 font-bold">No credit history yet</p>
                <p className="text-gray-600 text-sm mt-1">Purchase a package to start practising</p>
              </div>
            )}

            {/* Loyalty points */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <h3 className="font-black text-white mb-4" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                Loyalty Points
              </h3>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full border-4 flex items-center justify-center font-black text-xl"
                  style={{ borderColor: levelColor, color: levelColor }}>
                  {(user.loyaltyPoints?.total ?? 0)}
                </div>
                <div>
                  <p className="font-black text-white">{user.loyaltyPoints?.levelName ?? 'Bronze'}</p>
                  <p className="text-gray-500 text-sm">{user.loyaltyPoints?.pointsToNextLevel ?? 0} pts to next level</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════════════════════════════════ */}
        {/* TAB: Preferences ───────────────────────────────────────────────── */}
        {/* ════════════════════════════════════════════════════════════════════ */}
        {activeTab === 'preferences' && (
          <div className="space-y-5">

            {/* Notifications */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <h2 className="font-black text-white text-lg mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <Bell className="w-5 h-5 text-amber-400" />Notifications
              </h2>
              <Toggle label="Email Notifications"
                description="Result summaries, credit expiry alerts, exam updates"
                checked={emailNotif} onChange={setEmailNotif} />
              <Toggle label="SMS Notifications"
                description="OTPs, payment confirmations, urgent alerts"
                checked={smsNotif} onChange={setSmsNotif} />
            </div>

            {/* Language */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <h2 className="font-black text-white text-lg mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <Globe className="w-5 h-5 text-amber-400" />Language
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {[{ value: 'en', label: 'English' }, { value: 'hi', label: 'हिंदी' }].map(opt => (
                  <button key={opt.value} onClick={() => setLanguage(opt.value)}
                    className={`py-3 font-bold border-2 transition-colors ${
                      language === opt.value
                        ? 'bg-amber-400 text-[#0f172a] border-amber-500'
                        : 'bg-[#0f172a] text-gray-300 border-[#334155] hover:border-amber-400'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Target exams (display only — edit via exam list page) */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <h2 className="font-black text-white text-lg mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <BookOpen className="w-5 h-5 text-amber-400" />Target Exams
              </h2>
              {(user.preferences?.targetExams ?? []).length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {user.preferences.targetExams.map((exam: string) => (
                    <span key={exam}
                      className="px-3 py-1.5 bg-[#0f172a] border border-[#334155] text-gray-300 font-bold text-sm rounded-full">
                      {exam}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No target exams set</p>
              )}
              <button onClick={() => window.location.href = '/all-exams'}
                className="mt-4 flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors">
                Browse exams <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Security */}
            <div className="bg-[#1e293b] border border-[#334155] rounded-2xl p-6">
              <h2 className="font-black text-white text-lg mb-4 flex items-center gap-2"
                style={{ fontFamily: "'Archivo Black',sans-serif" }}>
                <Shield className="w-5 h-5 text-amber-400" />Security
              </h2>
              <div className="flex items-center gap-3 py-2">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                <div>
                  <p className="text-white font-bold text-sm">Email verified</p>
                  <p className="text-gray-500 text-xs">{user.email}</p>
                </div>
              </div>
              <button onClick={() => window.location.href = '/forgot-password'}
                className="mt-3 flex items-center gap-1.5 text-amber-400 font-bold text-sm hover:text-amber-300 transition-colors">
                Change password <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={savePreferences}
              disabled={saving}
              className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-[#0f172a] font-black uppercase border-2 border-amber-500
                         shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)]
                         hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Save Preferences
            </button>
          </div>
        )}
      </div>

      {/* ── Delete account modal ───────────────────────────────────────────── */}
      {showDelete && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-[#1e293b] border-2 border-red-500 rounded-2xl p-8 max-w-md w-full shadow-[8px_8px_0px_0px_rgba(239,68,68,0.3)]">
            <Trash2 className="w-10 h-10 text-red-400 mb-4" />
            <h2 className="font-black text-white text-xl mb-2" style={{ fontFamily: "'Archivo Black',sans-serif" }}>
              Delete Account?
            </h2>
            <p className="text-gray-400 text-sm mb-6">
              This is permanent. All credits, results, and data will be lost.
            </p>
            <InputField label="Confirm with your password" value={deletePassword}
              onChange={setDeletePassword} type="password" placeholder="Your password" />
            <div className="flex gap-3 mt-5">
              <button onClick={() => { setShowDelete(false); setDeletePassword(''); }}
                className="flex-1 py-3 bg-transparent border-2 border-[#334155] text-gray-400 font-black uppercase hover:border-white hover:text-white transition-colors">
                Cancel
              </button>
              <button onClick={handleDeleteAccount} disabled={deleting}
                className="flex-1 py-3 bg-red-500 text-white border-2 border-red-600 font-black uppercase
                           shadow-[4px_4px_0px_0px_rgba(0,0,0,0.4)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.4)]
                           hover:translate-x-0.5 hover:translate-y-0.5 transition-all disabled:opacity-60">
                {deleting ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Delete Forever'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}