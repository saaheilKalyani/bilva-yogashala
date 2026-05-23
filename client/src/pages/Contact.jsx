import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Send, Clock, MessageCircle } from 'lucide-react';
import toast from 'react-hot-toast';

const WA = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setSending(false);
  };

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Get In Touch</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Have a question or want to join us? We'd love to hear from you. Reach out and our team will respond promptly.</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Form */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="glass p-8">
            <h2 className="text-xl font-bold text-white mb-6">Send a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Full Name *</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="glass-input" />
                </div>
                <div>
                  <label className="text-white/70 text-sm mb-1.5 block">Phone</label>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className="glass-input" />
                </div>
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1.5 block">Email *</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" className="glass-input" />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1.5 block">Subject</label>
                <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} placeholder="How can we help?" className="glass-input" />
              </div>
              <div>
                <label className="text-white/70 text-sm mb-1.5 block">Message *</label>
                <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us more..." className="glass-input resize-none" />
              </div>
              <button type="submit" disabled={sending} className="btn-primary w-full flex items-center justify-center gap-2 py-3">
                {sending ? 'Sending...' : <><Send className="w-4 h-4" /> Send Message</>}
              </button>
            </form>
          </motion.div>

          {/* Contact info */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-6">
            <div className="glass p-6">
              <h3 className="text-white font-bold text-lg mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">Phone</div>
                    <a href="tel:+919876543210" className="hover:text-white transition-colors">+91 98765 43210</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">Email</div>
                    <a href="mailto:hello@bilvayoga.com" className="hover:text-white transition-colors">hello@bilvayoga.com</a>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <div className="w-10 h-10 bg-[#FF6B35]/20 rounded-xl flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#FF6B35]" />
                  </div>
                  <div>
                    <div className="text-white/40 text-xs uppercase tracking-wider">Hours</div>
                    <span>Mon–Sat: 5:30 AM – 9:00 PM</span>
                  </div>
                </div>
              </div>
            </div>

            {[
              { name: 'Andheri West', addr: 'Shop 12, Lokhandwala Complex, Andheri West, Mumbai 400053', phone: '+91 98765 43210' },
              { name: 'Goregaon West', addr: 'A-4, Oberoi Mall Road, Goregaon West, Mumbai 400062', phone: '+91 98765 43211' },
              { name: 'Thane West', addr: 'B-201, Viviana Mall Complex, Thane West 400601', phone: '+91 98765 43212' },
            ].map((b) => (
              <div key={b.name} className="glass p-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#FF6B35] mt-0.5 shrink-0" />
                  <div>
                    <h4 className="text-white font-semibold">{b.name}</h4>
                    <p className="text-white/60 text-sm mt-1">{b.addr}</p>
                    <a href={`tel:${b.phone}`} className="text-[#FF6B35] text-sm mt-1 block hover:text-[#F5E6C8] transition-colors">{b.phone}</a>
                  </div>
                </div>
              </div>
            ))}

            <a
              href={`https://wa.me/${WA}?text=Hi%2C%20I%20have%20a%20query%20about%20Bilva%20Yogashala`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 glass p-5 hover:bg-green-500/10 hover:border-green-500/30 transition-all duration-300 group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-green-400 fill-green-400" />
              </div>
              <div>
                <div className="text-white font-semibold">Chat on WhatsApp</div>
                <div className="text-white/50 text-sm">Usually replies within minutes</div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
