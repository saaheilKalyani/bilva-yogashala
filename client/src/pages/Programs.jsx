import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Clock, Users, MapPin, Wifi, Star } from 'lucide-react';

const categories = ['all', 'adult', 'kids', 'senior', 'therapy'];
const API = import.meta.env.VITE_API_URL || '/api';

export default function Programs() {
  const [active, setActive] = useState('all');
  const [batches, setBatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/public/batches`).then(({ data }) => setBatches(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const filtered = active === 'all' ? batches : batches.filter((b) => b.category === active);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <p className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Our Programs</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Class</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Choose from our range of carefully designed programs for every age group and wellness goal.</p>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-6 py-2.5 rounded-full text-sm font-semibold capitalize transition-all duration-300 ${
                active === cat
                  ? 'bg-gradient-to-r from-[#FF6B35] to-[#8B4513] text-white shadow-lg shadow-orange-500/30'
                  : 'glass text-white/70 hover:text-white hover:bg-white/15'
              }`}
            >
              {cat === 'all' ? 'All Programs' : cat === 'senior' ? 'Senior' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="text-center text-white/60 py-20">Loading programs...</div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.length === 0 && (
                <div className="col-span-3 text-center text-white/50 py-20">No programs found.</div>
              )}
              {filtered.map((batch) => (
                <div key={batch._id} className="glass p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1 group">
                  <div className="flex items-start justify-between mb-4">
                    <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                      batch.category === 'kids' ? 'bg-yellow-500/20 text-yellow-300' :
                      batch.category === 'senior' ? 'bg-green-500/20 text-green-300' :
                      batch.category === 'therapy' ? 'bg-purple-500/20 text-purple-300' :
                      'bg-orange-500/20 text-orange-300'
                    }`}>
                      {batch.category}
                    </span>
                    <span className={`text-xs flex items-center gap-1 ${batch.type === 'online' ? 'text-blue-300' : batch.type === 'hybrid' ? 'text-teal-300' : 'text-white/50'}`}>
                      <Wifi className="w-3 h-3" /> {batch.type}
                    </span>
                  </div>

                  <h3 className="text-white font-bold text-xl mb-1">{batch.name}</h3>
                  <p className="text-[#FF6B35] text-sm mb-3">by {batch.instructor}</p>
                  <p className="text-white/60 text-sm leading-relaxed mb-4 line-clamp-2">{batch.description}</p>

                  <div className="space-y-2 mb-5">
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Clock className="w-4 h-4 text-[#FF6B35]" />
                      {batch.timing} · {batch.duration}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm">
                      <Users className="w-4 h-4 text-[#FF6B35]" />
                      {batch.seatsAvailable} of {batch.capacity} seats available
                    </div>
                    {batch.branch?.name && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <MapPin className="w-4 h-4 text-[#FF6B35]" />
                        {batch.branch.name}
                      </div>
                    )}
                    {batch.daysOfWeek?.length > 0 && (
                      <div className="flex items-center gap-2 text-white/60 text-sm">
                        <Star className="w-4 h-4 text-[#FF6B35]" />
                        {batch.daysOfWeek.join(', ')}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/10">
                    <div>
                      <span className="text-2xl font-bold text-[#FF6B35]">₹{batch.fees.toLocaleString()}</span>
                      <span className="text-white/40 text-sm">/month</span>
                    </div>
                    <Link
                      to={`/register?batch=${batch._id}`}
                      className="btn-primary text-sm py-2 px-5"
                    >
                      Register Now
                    </Link>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
