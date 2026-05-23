import { motion } from 'framer-motion';

const images = [
  { id: 1, title: 'Morning Hatha Session', category: 'Class', color: 'from-orange-600/40 to-red-800/40', span: 'md:col-span-2' },
  { id: 2, title: 'Kids Yoga Fun', category: 'Kids', color: 'from-yellow-600/40 to-orange-700/40', span: '' },
  { id: 3, title: 'Meditation Circle', category: 'Meditation', color: 'from-purple-700/40 to-indigo-800/40', span: '' },
  { id: 4, title: 'Therapy Session', category: 'Therapy', color: 'from-teal-600/40 to-green-700/40', span: '' },
  { id: 5, title: 'Senior Gentle Yoga', category: 'Senior', color: 'from-blue-600/40 to-cyan-700/40', span: 'md:col-span-2' },
  { id: 6, title: 'Advanced Asanas', category: 'Advanced', color: 'from-pink-600/40 to-rose-800/40', span: '' },
  { id: 7, title: 'Pranayama Practice', category: 'Breathing', color: 'from-amber-600/40 to-yellow-700/40', span: '' },
  { id: 8, title: 'Community Class', category: 'Community', color: 'from-emerald-600/40 to-teal-700/40', span: 'md:col-span-2' },
  { id: 9, title: 'Outdoor Session', category: 'Outdoor', color: 'from-sky-600/40 to-blue-700/40', span: '' },
];

export default function Gallery() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Gallery</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Life at Bilva Yogashala</h1>
          <p className="text-white/60 max-w-2xl mx-auto">A glimpse into our vibrant yoga community — from morning sessions to therapy classes.</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((img, i) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              className={`${img.span} relative h-56 md:h-64 rounded-2xl overflow-hidden cursor-pointer group`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${img.color}`} />
              {/* Yoga pose placeholder pattern */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20">
                <div className="w-24 h-24 rounded-full border-4 border-white" />
              </div>
              {/* Hover overlay */}
              <div className="absolute inset-0 glass opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center">
                <span className="text-xs text-[#FF6B35] font-semibold tracking-widest uppercase mb-1">{img.category}</span>
                <h3 className="text-white font-bold text-lg text-center px-4">{img.title}</h3>
              </div>
              {/* Default label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-white font-semibold text-sm">{img.title}</p>
                <p className="text-white/60 text-xs">{img.category}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
