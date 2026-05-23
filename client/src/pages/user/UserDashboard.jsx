import { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { LayoutDashboard, CalendarCheck, CreditCard, User as UserIcon, LogOut, Leaf, Menu, Download } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const navItems = [
  { to: '/user/overview', icon: LayoutDashboard, label: 'My Classes' },
  { to: '/user/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/user/payments', icon: CreditCard, label: 'Payments' },
  { to: '/user/profile', icon: UserIcon, label: 'Profile' },
];

// ── My Classes ─────────────────────────────────────────────────
function MyClasses() {
  const [data, setData] = useState(null);
  useEffect(() => { axios.get(`${API}/user/dashboard`).then((r) => setData(r.data)).catch(() => {}); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Classes</h2>
      {data?.user?.batch ? (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6">
            <h3 className="text-[#FF6B35] font-semibold mb-4 text-sm uppercase tracking-wider">Current Program</h3>
            <h2 className="text-white font-bold text-2xl mb-1">{data.user.batch.name}</h2>
            <p className="text-white/60 text-sm mb-4">by {data.user.batch.instructor}</p>
            <div className="space-y-3">
              <div className="flex justify-between text-sm"><span className="text-white/50">Timing</span><span className="text-white">{data.user.batch.timing}</span></div>
              <div className="flex justify-between text-sm"><span className="text-white/50">Category</span><span className="text-white capitalize">{data.user.batch.category}</span></div>
              {data.user.batch.daysOfWeek?.length > 0 && (
                <div className="flex justify-between text-sm"><span className="text-white/50">Days</span><span className="text-white text-right">{data.user.batch.daysOfWeek.join(', ')}</span></div>
              )}
              <div className="flex justify-between text-sm"><span className="text-white/50">Monthly fee</span><span className="text-[#FF6B35] font-bold">₹{data.user.batch.fees?.toLocaleString()}</span></div>
            </div>
          </div>

          <div className="glass p-6">
            <h3 className="text-[#FF6B35] font-semibold mb-4 text-sm uppercase tracking-wider">Branch</h3>
            {data.user.branch ? (
              <div className="space-y-3">
                <h2 className="text-white font-bold text-xl">Bilva {data.user.branch.name}</h2>
                <p className="text-white/60 text-sm">{data.user.branch.address}</p>
                <p className="text-white/60 text-sm">{data.user.branch.phone}</p>
                <p className="text-white/60 text-sm">{data.user.branch.timings}</p>
              </div>
            ) : <p className="text-white/40">No branch assigned yet</p>}

            <div className="mt-6 pt-4 border-t border-white/10">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">Attendance this month</span>
                <span className="text-white font-bold">{data.attendancePercent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#8B4513] rounded-full transition-all" style={{ width: `${data.attendancePercent}%` }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass p-10 text-center">
          <p className="text-white/50 mb-4">You haven't enrolled in any batch yet.</p>
          <a href="/programs" className="btn-primary py-2 px-6">Browse Programs</a>
        </div>
      )}
    </div>
  );
}

// ── Attendance Calendar ────────────────────────────────────────
function AttendanceView() {
  const [data, setData] = useState(null);
  const now = new Date();
  const [month, setMonth] = useState(now.getMonth() + 1);
  const [year, setYear] = useState(now.getFullYear());

  useEffect(() => {
    axios.get(`${API}/user/attendance`, { params: { month, year } }).then((r) => setData(r.data)).catch(() => {});
  }, [month, year]);

  const daysInMonth = new Date(year, month, 0).getDate();
  const firstDay = new Date(year, month - 1, 1).getDay();

  const statusMap = {};
  data?.records?.forEach((r) => {
    const d = new Date(r.date).getDate();
    statusMap[d] = r.status;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Attendance</h2>
        <div className="flex gap-2">
          <select value={month} onChange={(e) => setMonth(+e.target.value)} className="glass-input py-1.5 text-sm w-28">
            {['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((m, i) => (
              <option key={m} value={i + 1}>{m}</option>
            ))}
          </select>
          <select value={year} onChange={(e) => setYear(+e.target.value)} className="glass-input py-1.5 text-sm w-24">
            {[2024, 2025, 2026].map((y) => <option key={y} value={y}>{y}</option>)}
          </select>
        </div>
      </div>

      {data && (
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 glass p-5">
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Su','Mo','Tu','We','Th','Fr','Sa'].map((d) => (
                <div key={d} className="text-center text-white/30 text-xs py-1">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {[...Array(firstDay)].map((_, i) => <div key={`e-${i}`} />)}
              {[...Array(daysInMonth)].map((_, i) => {
                const day = i + 1;
                const s = statusMap[day];
                return (
                  <div key={day} className={`aspect-square rounded-lg flex items-center justify-center text-xs font-medium transition-all ${
                    s === 'present' ? 'bg-green-500/30 text-green-300 border border-green-500/30' :
                    s === 'absent' ? 'bg-red-500/20 text-red-400 border border-red-500/20' :
                    s === 'late' ? 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/20' :
                    'text-white/30 hover:bg-white/5'
                  }`}>
                    {day}
                  </div>
                );
              })}
            </div>
            <div className="flex gap-4 mt-4 pt-4 border-t border-white/10">
              {[['bg-green-500/30 border-green-500/30 text-green-300', 'Present'], ['bg-red-500/20 border-red-500/20 text-red-400', 'Absent'], ['bg-yellow-500/20 border-yellow-500/20 text-yellow-400', 'Late']].map(([cls, label]) => (
                <div key={label} className={`flex items-center gap-1.5 text-xs ${cls.split(' ').pop()}`}>
                  <div className={`w-3 h-3 rounded border ${cls.split(' ').slice(0,2).join(' ')}`} /> {label}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {[['Total Classes', data.summary.total], ['Classes Attended', data.summary.present], ['Attendance %', `${data.summary.percent}%`]].map(([label, val]) => (
              <div key={label} className="glass p-4 text-center">
                <div className="text-2xl font-bold text-[#FF6B35]">{val}</div>
                <div className="text-white/50 text-sm mt-1">{label}</div>
              </div>
            ))}
            <div className="glass p-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-white/50">Progress</span>
                <span className="text-white font-bold">{data.summary.percent}%</span>
              </div>
              <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#FF6B35] to-[#8B4513] rounded-full" style={{ width: `${data.summary.percent}%` }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Payments ───────────────────────────────────────────────────
function Payments() {
  const [payments, setPayments] = useState([]);
  useEffect(() => { axios.get(`${API}/user/payments`).then((r) => setPayments(r.data)).catch(() => {}); }, []);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Payment History</h2>
      <div className="glass overflow-hidden">
        <table className="w-full glass-table">
          <thead><tr><th>Month</th><th>Batch</th><th>Amount</th><th>Discount</th><th>Final</th><th>Status</th><th></th></tr></thead>
          <tbody>
            {payments.map((p) => (
              <tr key={p._id}>
                <td className="text-white font-medium">{p.month || new Date(p.createdAt).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })}</td>
                <td className="text-white/60 text-sm">{p.batchId?.name || '—'}</td>
                <td className="text-white/70 text-sm">₹{p.amount?.toLocaleString()}</td>
                <td className="text-green-400 text-sm">{p.discount ? `-₹${Math.round(p.amount * p.discount / 100).toLocaleString()}` : '—'}</td>
                <td className="text-[#FF6B35] font-bold">₹{p.finalAmount?.toLocaleString()}</td>
                <td><span className={p.status === 'paid' ? 'badge-active' : 'badge-inactive'}>{p.status}</span></td>
                <td>
                  <button className="text-white/40 hover:text-white transition-colors" title="Download invoice">
                    <Download className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {payments.length === 0 && (
              <tr><td colSpan={7} className="text-center text-white/40 py-10">No payment records found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Profile ────────────────────────────────────────────────────
function Profile() {
  const { user } = useAuth();
  const [form, setForm] = useState({ name: '', phone: '', address: '', pincode: '', medicalConditions: '' });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || '', phone: user.phone || '', address: user.address || '', pincode: user.pincode || '', medicalConditions: user.medicalConditions || '' });
  }, [user]);

  const save = async () => {
    setSaving(true);
    try {
      await axios.put(`${API}/user/profile`, form);
      toast.success('Profile updated successfully');
    } catch { toast.error('Failed to update profile'); }
    finally { setSaving(false); }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">My Profile</h2>
      <div className="glass p-8 max-w-xl">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center text-white text-2xl font-bold">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h3 className="text-white font-bold text-xl">{user?.name}</h3>
            <p className="text-white/50 text-sm">{user?.email}</p>
            <span className={user?.subscriptionStatus === 'active' ? 'badge-active' : 'badge-inactive'}>{user?.subscriptionStatus}</span>
          </div>
        </div>

        <div className="space-y-4">
          {[['name', 'Full Name', 'text'], ['phone', 'Phone', 'tel'], ['address', 'Address', 'text'], ['pincode', 'Pincode', 'text']].map(([key, label, type]) => (
            <div key={key}>
              <label className="text-white/70 text-sm mb-1.5 block">{label}</label>
              <input type={type} value={form[key]} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="glass-input" />
            </div>
          ))}
          <div>
            <label className="text-white/70 text-sm mb-1.5 block">Medical Conditions</label>
            <textarea rows={3} value={form.medicalConditions} onChange={(e) => setForm({ ...form, medicalConditions: e.target.value })} className="glass-input resize-none" placeholder="None" />
          </div>
        </div>

        <button onClick={save} disabled={saving} className="btn-primary mt-6 w-full py-3">
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
}

// ── User Dashboard Shell ───────────────────────────────────────
export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => { logout(); toast.success('Logged out'); navigate('/'); };

  return (
    <div className="dashboard-layout">
      <div className={`dashboard-sidebar glass-dark border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">My Dashboard</div>
              <div className="text-[#FF6B35] text-xs truncate">{user?.name}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink key={to} to={to} onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'text-white/60 hover:text-white hover:bg-white/10'}`}>
              <Icon className="w-4 h-4" /> {label}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button onClick={handleLogout} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/10 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </div>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="dashboard-main">
        <div className="glass-nav sticky top-0 z-20 flex items-center justify-between px-6 h-16">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white"><Menu className="w-5 h-5" /></button>
          <h1 className="text-white font-semibold hidden sm:block">Student Portal</h1>
          <div className="text-white/50 text-sm">Hello, {user?.name?.split(' ')[0]}</div>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<MyClasses />} />
            <Route path="attendance" element={<AttendanceView />} />
            <Route path="payments" element={<Payments />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
