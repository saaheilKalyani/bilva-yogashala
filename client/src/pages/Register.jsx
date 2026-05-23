import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Leaf, Check, ChevronRight, Tag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const API = import.meta.env.VITE_API_URL || '/api';

const COUPONS = { YOGA10: 10, BILVA20: 20, FIRST50: 50 };

const steps = ['Personal Details', 'Batch & Branch', 'Payment Summary'];

export default function Register() {
  const [step, setStep] = useState(0);
  const [searchParams] = useSearchParams();
  const [batches, setBatches] = useState([]);
  const [branches, setBranches] = useState([]);
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', password: 'User@123', phone: '', gender: '',
    dob: '', address: '', pincode: '',
    batch: searchParams.get('batch') || '',
    branch: '',
  });

  useEffect(() => {
    Promise.all([
      axios.get(`${API}/public/batches`),
      axios.get(`${API}/public/branches`),
    ]).then(([b, br]) => { setBatches(b.data); setBranches(br.data); });
  }, []);

  const selectedBatch = batches.find((b) => b._id === form.batch);
  const baseAmount = selectedBatch?.fees || 0;
  const discountAmt = Math.round(baseAmount * (discount / 100));
  const finalAmount = baseAmount - discountAmt;

  const applyCoupon = () => {
    const pct = COUPONS[coupon.toUpperCase()];
    if (pct) { setDiscount(pct); toast.success(`Coupon applied! ${pct}% off`); }
    else toast.error('Invalid coupon code');
  };

  const next = () => { if (step < 2) setStep(step + 1); };
  const back = () => { if (step > 0) setStep(step - 1); };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await register({ ...form, dob: form.dob || undefined });
      toast.success('Registration successful! Welcome to Bilva Yogashala 🧘');
      navigate('/user');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 flex items-start justify-center">
      <div className="w-full max-w-2xl">
        {/* Step indicator */}
        <div className="flex items-center justify-center gap-0 mb-10">
          {steps.map((s, i) => (
            <div key={i} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all ${i < step ? 'bg-green-500 text-white' : i === step ? 'bg-[#FF6B35] text-white' : 'glass text-white/40'}`}>
                {i < step ? <Check className="w-4 h-4" /> : i + 1}
              </div>
              <span className={`hidden sm:block ml-2 text-sm font-medium ${i === step ? 'text-white' : 'text-white/40'}`}>{s}</span>
              {i < steps.length - 1 && <ChevronRight className="w-4 h-4 text-white/20 mx-3" />}
            </div>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={step} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.3 }} className="glass p-8">
            <div className="text-center mb-8">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center mx-auto mb-3">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">{steps[step]}</h2>
            </div>

            {/* Step 1: Personal Details */}
            {step === 0 && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Full Name *</label>
                    <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your full name" className="glass-input" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Phone *</label>
                    <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="glass-input" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="glass-input" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Gender</label>
                    <select value={form.gender} onChange={(e) => setForm({ ...form, gender: e.target.value })} className="glass-input">
                      <option value="">Select gender</option>
                      <option value="female">Female</option>
                      <option value="male">Male</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Date of Birth</label>
                    <input type="date" value={form.dob} onChange={(e) => setForm({ ...form, dob: e.target.value })} className="glass-input" />
                  </div>
                  <div>
                    <label className="text-white/70 text-sm mb-1.5 block">Pincode</label>
                    <input value={form.pincode} onChange={(e) => setForm({ ...form, pincode: e.target.value })} placeholder="400053" className="glass-input" />
                  </div>
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Address</label>
                  <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} placeholder="Your full address" className="glass-input resize-none" />
                </div>
              </div>
            )}

            {/* Step 2: Batch & Branch */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Select Branch *</label>
                  <select required value={form.branch} onChange={(e) => setForm({ ...form, branch: e.target.value })} className="glass-input">
                    <option value="">Choose a branch...</option>
                    {branches.map((br) => (
                      <option key={br._id} value={br._id}>{br.name} — {br.city}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Select Program/Batch *</label>
                  <select required value={form.batch} onChange={(e) => setForm({ ...form, batch: e.target.value })} className="glass-input">
                    <option value="">Choose a batch...</option>
                    {batches.map((b) => (
                      <option key={b._id} value={b._id}>{b.name} — {b.timing} — ₹{b.fees}/mo</option>
                    ))}
                  </select>
                </div>
                {selectedBatch && (
                  <div className="glass-dark p-4 rounded-xl">
                    <h4 className="text-white font-semibold mb-2">{selectedBatch.name}</h4>
                    <div className="grid grid-cols-2 gap-2 text-sm text-white/70">
                      <span>Instructor: {selectedBatch.instructor}</span>
                      <span>Timing: {selectedBatch.timing}</span>
                      <span>Duration: {selectedBatch.duration}</span>
                      <span>Seats left: {selectedBatch.seatsAvailable}</span>
                      <span className="col-span-2 text-[#FF6B35] font-bold text-lg">₹{selectedBatch.fees.toLocaleString()} / month</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Step 3: Payment Summary */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="glass-dark p-6 rounded-xl space-y-3">
                  <h3 className="text-white font-semibold mb-3">Order Summary</h3>
                  <div className="flex justify-between text-white/70 text-sm"><span>Program</span><span>{selectedBatch?.name || '—'}</span></div>
                  <div className="flex justify-between text-white/70 text-sm"><span>Monthly fee</span><span>₹{baseAmount.toLocaleString()}</span></div>
                  {discount > 0 && <div className="flex justify-between text-green-400 text-sm"><span>Discount ({discount}%)</span><span>−₹{discountAmt.toLocaleString()}</span></div>}
                  <div className="border-t border-white/10 pt-3 flex justify-between text-white font-bold text-xl">
                    <span>Total</span><span className="text-[#FF6B35]">₹{finalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Coupon Code</label>
                  <div className="flex gap-2">
                    <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="YOGA10, BILVA20, FIRST50" className="glass-input flex-1" />
                    <button type="button" onClick={applyCoupon} className="btn-primary px-4 py-2 flex items-center gap-1 text-sm whitespace-nowrap">
                      <Tag className="w-4 h-4" /> Apply
                    </button>
                  </div>
                  <p className="text-white/30 text-xs mt-1">Try: YOGA10 / BILVA20 / FIRST50</p>
                </div>

                <div className="glass-dark p-4 rounded-xl text-sm text-white/60 space-y-1">
                  <p><span className="text-white/40">Name:</span> {form.name}</p>
                  <p><span className="text-white/40">Email:</span> {form.email}</p>
                  <p><span className="text-white/40">Phone:</span> {form.phone}</p>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex gap-3 mt-8">
              {step > 0 && (
                <button onClick={back} className="btn-outline flex-1 py-3">Back</button>
              )}
              {step < 2 ? (
                <button
                  onClick={next}
                  disabled={step === 0 ? !form.name || !form.email : !form.batch || !form.branch}
                  className="btn-primary flex-1 py-3 disabled:opacity-40"
                >
                  Continue
                </button>
              ) : (
                <button onClick={handleSubmit} disabled={loading} className="btn-primary flex-1 py-3">
                  {loading ? 'Registering...' : 'Complete Registration'}
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
