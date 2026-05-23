import { Link } from 'react-router-dom';
import { Leaf, Phone, Mail, MapPin, Camera, Play, Share2 } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="glass-dark mt-0 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-none">Bilva</div>
                <div className="text-[#FF6B35] text-xs tracking-widest uppercase">Yogashala</div>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Transforming lives through the ancient wisdom of yoga since 2014. Join our community of 500+ students across Mumbai and Thane.
            </p>
            <div className="flex gap-3">
              <a href="#" aria-label="Instagram" className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-colors">
                <Camera className="w-4 h-4" />
              </a>
              <a href="#" aria-label="YouTube" className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-colors">
                <Play className="w-4 h-4" />
              </a>
              <a href="#" aria-label="Facebook" className="w-9 h-9 glass rounded-full flex items-center justify-center text-white/70 hover:text-[#FF6B35] hover:border-[#FF6B35]/50 transition-colors">
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Quick Links</h4>
            <ul className="space-y-2">
              {[['/', 'Home'], ['/about', 'About Us'], ['/programs', 'Programs'], ['/branches', 'Branches'], ['/gallery', 'Gallery'], ['/contact', 'Contact']].map(([to, label]) => (
                <li key={to}>
                  <Link to={to} className="text-white/60 hover:text-[#FF6B35] text-sm transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Our Branches</h4>
            <ul className="space-y-3">
              {['Andheri West', 'Goregaon West', 'Thane West'].map((branch) => (
                <li key={branch} className="flex items-start gap-2 text-white/60 text-sm">
                  <MapPin className="w-4 h-4 text-[#FF6B35] mt-0.5 shrink-0" />
                  {branch}, Mumbai
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm tracking-widest uppercase">Contact Us</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Phone className="w-4 h-4 text-[#FF6B35]" />
                +91 98765 43210
              </li>
              <li className="flex items-center gap-2 text-white/60 text-sm">
                <Mail className="w-4 h-4 text-[#FF6B35]" />
                hello@bilvayoga.com
              </li>
            </ul>
            <h4 className="text-white font-semibold mb-2 text-sm">Newsletter</h4>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="glass-input flex-1 text-sm py-2 px-3"
              />
              <button className="btn-primary text-sm py-2 px-4 whitespace-nowrap">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Bilva Yogashala. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-white/40 hover:text-white/60 text-xs transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/40 hover:text-white/60 text-xs transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
