import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';

const API = import.meta.env.VITE_API_URL || '/api';
const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

export default function Branches() {
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`${API}/public/branches`).then(({ data }) => setBranches(data)).catch(() => {}).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Locations</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Branches</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Find a Bilva Yogashala centre near you. We're conveniently located across Mumbai and Thane.</p>
        </motion.div>

        {loading ? (
          <div className="text-center text-white/60 py-20">Loading branches...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {branches.map((branch, i) => (
              <motion.div
                key={branch._id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="glass p-6 hover:bg-white/15 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/30 to-[#8B4513]/30 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-[#FF6B35]" />
                </div>

                <h3 className="text-white font-bold text-xl mb-1">Bilva {branch.name}</h3>
                <p className="text-[#FF6B35] text-sm mb-4">{branch.city}</p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                    {branch.address}
                  </div>
                  {branch.phone && (
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Phone className="w-4 h-4 text-[#FF6B35]" />
                      <a href={`tel:${branch.phone}`} className="hover:text-white transition-colors">{branch.phone}</a>
                    </div>
                  )}
                  {branch.email && (
                    <div className="flex items-center gap-3 text-white/70 text-sm">
                      <Mail className="w-4 h-4 text-[#FF6B35]" />
                      <a href={`mailto:${branch.email}`} className="hover:text-white transition-colors">{branch.email}</a>
                    </div>
                  )}
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <Clock className="w-4 h-4 text-[#FF6B35]" />
                    {branch.timings}
                  </div>
                </div>

                {branch.mapLink && (
                  <a
                    href={branch.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline text-sm py-2.5 w-full flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" /> Get Directions
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
