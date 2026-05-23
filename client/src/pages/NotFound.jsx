import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Leaf, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass p-12 text-center max-w-md"
      >
        <Leaf className="w-16 h-16 text-[#FF6B35]/50 mx-auto mb-4" />
        <h1 className="text-7xl font-bold text-[#FF6B35] mb-2">404</h1>
        <h2 className="text-2xl font-bold text-white mb-3">Page Not Found</h2>
        <p className="text-white/60 mb-8">The path you're seeking doesn't exist. Let's guide you back to your centre.</p>
        <Link to="/" className="btn-primary inline-flex items-center gap-2">
          <Home className="w-4 h-4" /> Go Home
        </Link>
      </motion.div>
    </div>
  );
}
