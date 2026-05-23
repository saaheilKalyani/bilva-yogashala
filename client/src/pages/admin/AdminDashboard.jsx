import { useState, useEffect } from 'react';
import { NavLink, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import {
  LayoutDashboard, Users, BookOpen, CalendarCheck, Building2, LogOut, Leaf, Menu, X,
  TrendingUp, DollarSign, Activity, Star
} from 'lucide-react';
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const navItems = [
  { to: '/admin/overview', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/batches', icon: BookOpen, label: 'Batches' },
  { to: '/admin/attendance', icon: CalendarCheck, label: 'Attendance' },
  { to: '/admin/branches', icon: Building2, label: 'Branches' },
];

// ── Overview ──────────────────────────────────────────────────
function Overview() {
  const [data, setData] = useState(null);
  useEffect(() => { axios.get(`${API}/admin/analytics/overview`).then((r) => setData(r.data)).catch(() => {}); }, []);

  const mockMonthly = [
    { month: 'Jan', revenue: 45000 }, { month: 'Feb', revenue: 52000 },
    { month: 'Mar', revenue: 48000 }, { month: 'Apr', revenue: 61000 },
    { month: 'May', revenue: 67000 }, { month: 'Jun', revenue: 58000 },
  ];
  const branchData = data?.branchStats?.map((b) => ({ name: b.name, students: b.count })) || [
    { name: 'Andheri W', students: 12 }, { name: 'Goregaon W', students: 8 }, { name: 'Thane W', students: 6 },
  ];

  const stats = [
    { icon: Users, label: 'Total Students', value: data?.totalUsers ?? '—', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { icon: Activity, label: 'Active Subscriptions', value: data?.activeSubscriptions ?? '—', color: 'text-green-400', bg: 'bg-green-400/10' },
    { icon: DollarSign, label: 'Total Revenue', value: data ? `₹${data.totalRevenue.toLocaleString()}` : '—', color: 'text-[#FF6B35]', bg: 'bg-orange-400/10' },
    { icon: Star, label: 'Active Batches', value: data?.totalBatches ?? '—', color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-white">Dashboard Overview</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map(({ icon: Icon, label, value, color, bg }) => (
          <div key={label} className="glass p-5">
            <div className={`w-11 h-11 ${bg} rounded-xl flex items-center justify-center mb-3`}>
              <Icon className={`w-5 h-5 ${color}`} />
            </div>
            <div className="text-2xl font-bold text-white">{value}</div>
            <div className="text-white/50 text-sm mt-1">{label}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="glass p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><TrendingUp className="w-4 h-4 text-[#FF6B35]" /> Monthly Revenue</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data?.monthlyRevenue?.length ? data.monthlyRevenue.map((m) => ({ month: m._id, revenue: m.revenue })) : mockMonthly}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#FF6B35" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#FF6B35" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} tickFormatter={(v) => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ background: 'rgba(26,10,0,0.95)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 8, color: '#fff' }} formatter={(v) => [`₹${v.toLocaleString()}`, 'Revenue']} />
              <Area type="monotone" dataKey="revenue" stroke="#FF6B35" fill="url(#revGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="glass p-6">
          <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><Building2 className="w-4 h-4 text-[#FF6B35]" /> Branch Performance</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={branchData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fill: 'rgba(255,255,255,0.5)', fontSize: 11 }} />
              <Tooltip contentStyle={{ background: 'rgba(26,10,0,0.95)', border: '1px solid rgba(255,107,53,0.3)', borderRadius: 8, color: '#fff' }} />
              <Bar dataKey="students" fill="#FF6B35" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

// ── Users ──────────────────────────────────────────────────────
function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => { axios.get(`${API}/admin/users`).then((r) => setUsers(r.data)).catch(() => {}); }, []);

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-white">Students ({users.length})</h2>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email..." className="glass-input w-full sm:w-72" />
      </div>
      <div className="glass overflow-hidden">
        <table className="w-full glass-table">
          <thead>
            <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th></tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u._id}>
                <td className="text-white font-medium">{u.name}</td>
                <td className="text-white/60 text-sm">{u.email}</td>
                <td className="text-white/60 text-sm">{u.phone || '—'}</td>
                <td><span className={u.role === 'admin' ? 'badge-admin' : 'badge-user'}>{u.role}</span></td>
                <td><span className={u.subscriptionStatus === 'active' ? 'badge-active' : 'badge-inactive'}>{u.subscriptionStatus}</span></td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr><td colSpan={5} className="text-center text-white/40 py-10">No users found</td></tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ── Batches ────────────────────────────────────────────────────
function AdminBatches() {
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', category: 'adult', instructor: '', timing: '', duration: '60 min', fees: '', capacity: 20, type: 'offline', description: '' });

  useEffect(() => {
    axios.get(`${API}/admin/batches`).then((r) => setBatches(r.data));
    axios.get(`${API}/admin/branches`).then((r) => setBranches(r.data));
  }, []);

  const openAdd = () => { setEditing(null); setForm({ name: '', category: 'adult', instructor: '', timing: '', duration: '60 min', fees: '', capacity: 20, type: 'offline', description: '' }); setModal(true); };
  const openEdit = (b) => { setEditing(b); setForm({ ...b, branch: b.branch?._id || '' }); setModal(true); };

  const save = async () => {
    try {
      if (editing) {
        const r = await axios.put(`${API}/admin/batches/${editing._id}`, form);
        setBatches(batches.map((b) => b._id === editing._id ? r.data : b));
        toast.success('Batch updated');
      } else {
        const r = await axios.post(`${API}/admin/batches`, form);
        setBatches([...batches, r.data]);
        toast.success('Batch created');
      }
      setModal(false);
    } catch { toast.error('Failed to save batch'); }
  };

  const deleteBatch = async (id) => {
    if (!confirm('Delete this batch?')) return;
    await axios.delete(`${API}/admin/batches/${id}`);
    setBatches(batches.filter((b) => b._id !== id));
    toast.success('Batch deleted');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Batches ({batches.length})</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2 px-5">+ Add Batch</button>
      </div>

      <div className="glass overflow-hidden">
        <table className="w-full glass-table">
          <thead><tr><th>Name</th><th>Category</th><th>Instructor</th><th>Timing</th><th>Fees</th><th>Seats</th><th>Actions</th></tr></thead>
          <tbody>
            {batches.map((b) => (
              <tr key={b._id}>
                <td className="text-white font-medium">{b.name}</td>
                <td><span className="badge-user capitalize">{b.category}</span></td>
                <td className="text-white/70 text-sm">{b.instructor}</td>
                <td className="text-white/70 text-sm">{b.timing}</td>
                <td className="text-[#FF6B35] font-semibold">₹{b.fees?.toLocaleString()}</td>
                <td className="text-white/60 text-sm">{b.seatsAvailable}/{b.capacity}</td>
                <td>
                  <div className="flex gap-2">
                    <button onClick={() => openEdit(b)} className="text-xs text-[#FF6B35] hover:text-white transition-colors px-2 py-1 glass rounded">Edit</button>
                    <button onClick={() => deleteBatch(b._id)} className="text-xs text-red-400 hover:text-white transition-colors px-2 py-1 glass rounded">Del</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass w-full max-w-lg p-7 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">{editing ? 'Edit Batch' : 'Add New Batch'}</h3>
              <button onClick={() => setModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="text-white/70 text-sm mb-1 block">Batch Name</label>
                <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="glass-input" placeholder="e.g. Morning Hatha" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Category</label>
                  <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="glass-input">
                    {['adult', 'kids', 'senior', 'therapy'].map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Type</label>
                  <select value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} className="glass-input">
                    {['offline', 'online', 'hybrid'].map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1 block">Instructor</label>
                <input value={form.instructor} onChange={(e) => setForm({ ...form, instructor: e.target.value })} className="glass-input" placeholder="Instructor name" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Timing</label>
                  <input value={form.timing} onChange={(e) => setForm({ ...form, timing: e.target.value })} className="glass-input" placeholder="6:00 AM – 7:00 AM" />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Duration</label>
                  <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} className="glass-input" placeholder="60 min" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Fees (₹/mo)</label>
                  <input type="number" value={form.fees} onChange={(e) => setForm({ ...form, fees: e.target.value })} className="glass-input" />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1 block">Capacity</label>
                  <input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} className="glass-input" />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1 block">Branch</label>
                <select value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="glass-input">
                  <option value="">Select branch</option>
                  {branches.map((br) => <option key={br._id} value={br._id}>{br.name}</option>)}
                </select>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1 block">Description</label>
                <textarea rows={3} value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="glass-input resize-none" />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setModal(false)} className="btn-outline flex-1 py-2.5">Cancel</button>
              <button onClick={save} className="btn-primary flex-1 py-2.5">Save Batch</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ── Attendance ─────────────────────────────────────────────────
function AdminAttendance() {
  const [batches, setBatches] = useState([]);
  const [batchId, setBatchId] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [records, setRecords] = useState([]);
  const [statuses, setStatuses] = useState({});

  useEffect(() => { axios.get(`${API}/admin/batches`).then((r) => setBatches(r.data)); }, []);

  const load = async () => {
    const { data } = await axios.get(`${API}/admin/attendance`, { params: { batchId, date } });
    setRecords(data);
    const s = {};
    data.forEach((r) => { s[r.userId._id] = r.status; });
    setStatuses(s);
  };

  const save = async () => {
    const recs = records.map((r) => ({ userId: r.userId._id, batchId, date, status: statuses[r.userId._id] || 'absent' }));
    await axios.post(`${API}/admin/attendance`, { records: recs });
    toast.success('Attendance saved');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white">Attendance</h2>
      <div className="glass p-5 flex flex-col sm:flex-row gap-4">
        <select value={batchId} onChange={(e) => setBatchId(e.target.value)} className="glass-input flex-1">
          <option value="">Select batch...</option>
          {batches.map((b) => <option key={b._id} value={b._id}>{b.name} — {b.timing}</option>)}
        </select>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="glass-input w-full sm:w-44" />
        <button onClick={load} disabled={!batchId} className="btn-primary px-6 py-2 whitespace-nowrap">Load</button>
      </div>

      {records.length > 0 && (
        <>
          <div className="glass overflow-hidden">
            <table className="w-full glass-table">
              <thead><tr><th>Student</th><th>Email</th><th>Status</th></tr></thead>
              <tbody>
                {records.map((r) => (
                  <tr key={r._id}>
                    <td className="text-white font-medium">{r.userId.name}</td>
                    <td className="text-white/60 text-sm">{r.userId.email}</td>
                    <td>
                      <div className="flex gap-2">
                        {['present', 'absent', 'late'].map((s) => (
                          <button key={s} onClick={() => setStatuses({ ...statuses, [r.userId._id]: s })}
                            className={`text-xs px-3 py-1 rounded-full capitalize transition-all ${statuses[r.userId._id] === s ? s === 'present' ? 'badge-active' : s === 'absent' ? 'badge-inactive' : 'badge-user' : 'glass text-white/40'}`}>
                            {s}
                          </button>
                        ))}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button onClick={save} className="btn-primary py-3 px-8">Save Attendance</button>
        </>
      )}
      {records.length === 0 && batchId && <div className="text-center text-white/40 py-10 glass">No attendance records loaded. Click "Load" after selecting batch and date.</div>}
    </div>
  );
}

// ── Branches ───────────────────────────────────────────────────
function AdminBranches() {
  const [branches, setBranches] = useState([]);
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ name: '', address: '', city: 'Mumbai', phone: '', email: '', timings: '', mapLink: '' });

  useEffect(() => { axios.get(`${API}/admin/branches`).then((r) => setBranches(r.data)); }, []);

  const openEdit = (b) => { setEditing(b); setForm(b); setModal(true); };
  const openAdd = () => { setEditing(null); setForm({ name: '', address: '', city: 'Mumbai', phone: '', email: '', timings: '', mapLink: '' }); setModal(true); };

  const save = async () => {
    try {
      if (editing) {
        const r = await axios.put(`${API}/admin/branches/${editing._id}`, form);
        setBranches(branches.map((b) => b._id === editing._id ? r.data : b));
        toast.success('Branch updated');
      } else {
        const r = await axios.post(`${API}/admin/branches`, form);
        setBranches([...branches, r.data]);
        toast.success('Branch created');
      }
      setModal(false);
    } catch { toast.error('Failed'); }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Branches ({branches.length})</h2>
        <button onClick={openAdd} className="btn-primary text-sm py-2 px-5">+ Add Branch</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {branches.map((b) => (
          <div key={b._id} className="glass p-5">
            <h3 className="text-white font-bold text-lg mb-1">Bilva {b.name}</h3>
            <p className="text-[#FF6B35] text-sm mb-3">{b.city}</p>
            <p className="text-white/60 text-sm mb-1">{b.address}</p>
            <p className="text-white/60 text-sm mb-1">{b.phone}</p>
            <p className="text-white/60 text-sm mb-3">{b.timings}</p>
            <button onClick={() => openEdit(b)} className="btn-outline text-sm py-1.5 w-full">Edit</button>
          </div>
        ))}
      </div>
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="glass w-full max-w-md p-7">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-xl font-bold text-white">{editing ? 'Edit Branch' : 'Add Branch'}</h3>
              <button onClick={() => setModal(false)} className="text-white/40 hover:text-white"><X className="w-5 h-5" /></button>
            </div>
            <div className="space-y-3">
              {[['name', 'Branch Name'], ['address', 'Address'], ['city', 'City'], ['phone', 'Phone'], ['email', 'Email'], ['timings', 'Timings'], ['mapLink', 'Google Maps Link']].map(([key, label]) => (
                <div key={key}>
                  <label className="text-white/70 text-sm mb-1 block">{label}</label>
                  <input value={form[key] || ''} onChange={(e) => setForm({ ...form, [key]: e.target.value })} className="glass-input" />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-5">
              <button onClick={() => setModal(false)} className="btn-outline flex-1 py-2.5">Cancel</button>
              <button onClick={save} className="btn-primary flex-1 py-2.5">Save</button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

// ── Admin Dashboard Shell ─────────────────────────────────────
export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); toast.success('Logged out'); navigate('/'); };

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <div className={`dashboard-sidebar glass-dark border-r border-white/10 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="p-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center">
              <Leaf className="w-4 h-4 text-white" />
            </div>
            <div>
              <div className="text-white font-bold text-sm">Bilva Admin</div>
              <div className="text-[#FF6B35] text-xs">{user?.name}</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${isActive ? 'bg-[#FF6B35]/20 text-[#FF6B35]' : 'text-white/60 hover:text-white hover:bg-white/10'}`
              }
            >
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

      {/* Overlay for mobile */}
      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Main content */}
      <div className="dashboard-main">
        {/* Topbar */}
        <div className="glass-nav sticky top-0 z-20 flex items-center justify-between px-6 h-16">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-white"><Menu className="w-5 h-5" /></button>
          <h1 className="text-white font-semibold hidden sm:block">Admin Panel</h1>
          <div className="text-white/50 text-sm">Welcome, {user?.name?.split(' ')[0]}</div>
        </div>

        <div className="p-6">
          <Routes>
            <Route index element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<Overview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="batches" element={<AdminBatches />} />
            <Route path="attendance" element={<AdminAttendance />} />
            <Route path="branches" element={<AdminBranches />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
