import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { Users, Award, MapPin, Heart, Star, ArrowRight, Leaf, Wind, Flame, Clock } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.15 } } };

const stats = [
  { icon: Users, value: '500+', label: 'Happy Students' },
  { icon: Award, value: '10+', label: 'Years of Excellence' },
  { icon: MapPin, value: '3', label: 'Branches' },
  { icon: Heart, value: '4', label: 'Programs' },
];

const features = [
  { icon: Leaf, title: 'Expert Instructors', desc: 'Certified yoga gurus with decades of experience in traditional and therapeutic yoga.' },
  { icon: Wind, title: 'Flexible Batches', desc: 'Morning, evening, online and offline batches to fit your lifestyle perfectly.' },
  { icon: Flame, title: 'Personalised Care', desc: 'Small batch sizes ensure individual attention and customised practice for every student.' },
  { icon: Clock, title: 'All Age Groups', desc: 'Specially designed programs for kids, adults, seniors, and therapeutic needs.' },
];

const programs = [
  { title: 'Morning Hatha', category: 'Adult', time: '6:00 – 7:00 AM', fees: '₹2,500/mo', seats: 8, color: 'from-orange-500/30 to-red-600/20' },
  { title: 'Kids Yoga Fun', category: 'Kids', time: '4:00 – 4:45 PM', fees: '₹1,800/mo', seats: 5, color: 'from-yellow-500/30 to-orange-500/20' },
  { title: 'Senior Gentle', category: 'Senior', time: '8:00 – 9:00 AM', fees: '₹2,000/mo', seats: 4, color: 'from-green-500/30 to-teal-600/20' },
  { title: 'Therapy Yoga', category: 'Therapy', time: '7:00 – 8:00 AM', fees: '₹3,500/mo', seats: 2, color: 'from-purple-500/30 to-pink-600/20' },
];

const testimonials = [
  { name: 'Priya Sharma', batch: 'Morning Hatha', rating: 5, text: 'Bilva Yogashala transformed my life! The instructors are incredibly knowledgeable and the classes are perfectly paced for all levels.' },
  { name: 'Rajesh Mehta', batch: 'Therapy Yoga', rating: 5, text: 'The therapy yoga classes helped me overcome chronic back pain completely. I\'m pain-free for the first time in 5 years!' },
  { name: 'Ananya Patel', batch: 'Kids Yoga', rating: 5, text: 'My kids absolutely love the children\'s yoga classes. Their focus and flexibility have improved dramatically in just 3 months!' },
  { name: 'Suresh Iyer', batch: 'Senior Yoga', rating: 4, text: 'The senior yoga classes are gentle yet effective. I feel more energetic at 65 than I did at 50. Highly recommended!' },
  { name: 'Meera Nair', batch: 'Online Flow', rating: 5, text: 'The online classes are just as effective as in-person. The instructor makes sure everyone follows correctly even through the screen.' },
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4">
        {/* Ambient orbs */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-[#FF6B35]/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#8B4513]/20 rounded-full blur-3xl pointer-events-none" />

        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="relative z-10 text-center max-w-4xl mx-auto"
        >
          <motion.div variants={fadeUp} className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm text-[#FF6B35] font-medium mb-6">
            <Leaf className="w-4 h-4" /> Welcome to Bilva Yogashala
          </motion.div>

          <motion.h1 variants={fadeUp} className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Transform Your Life{' '}
            <span className="bg-gradient-to-r from-[#FF6B35] to-[#F5E6C8] bg-clip-text text-transparent">
              Through Yoga
            </span>
          </motion.h1>

          <motion.p variants={fadeUp} className="text-white/70 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Join Mumbai's most trusted yoga center. Experience the ancient wisdom of yoga with modern teaching methods across our 3 branches.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 justify-center mb-16">
            <Link to="/register" className="btn-primary text-base px-8 py-4">
              Start Your Journey
            </Link>
            <Link to="/programs" className="btn-outline text-base px-8 py-4">
              Explore Programs
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div variants={stagger} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map(({ icon: Icon, value, label }) => (
              <motion.div key={label} variants={fadeUp} className="glass p-5 float-animation" style={{ animationDelay: `${Math.random() * 2}s` }}>
                <Icon className="w-6 h-6 text-[#FF6B35] mx-auto mb-2" />
                <div className="text-2xl font-bold text-white">{value}</div>
                <div className="text-white/60 text-xs">{label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Features ─────────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Why Choose Us</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">What Makes Us Different</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <motion.div key={title} variants={fadeUp} className="glass p-6 hover:bg-white/15 transition-all duration-300 group">
                <div className="w-12 h-12 bg-gradient-to-br from-[#FF6B35]/30 to-[#8B4513]/30 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-[#FF6B35]" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── Programs Preview ─────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Our Programs</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">Find Your Perfect Class</motion.h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10"
          >
            {programs.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className={`glass p-6 bg-gradient-to-br ${p.color} hover:scale-105 transition-all duration-300 cursor-pointer`}
              >
                <span className="text-xs font-semibold text-[#FF6B35] bg-[#FF6B35]/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  {p.category}
                </span>
                <h3 className="text-white font-bold text-lg mt-3 mb-1">{p.title}</h3>
                <p className="text-white/60 text-sm mb-3 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {p.time}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-[#FF6B35] font-bold">{p.fees}</span>
                  <span className="text-white/50 text-xs">{p.seats} seats left</span>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <div className="text-center">
            <Link to="/programs" className="btn-primary inline-flex items-center gap-2">
              View All Programs <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Testimonials ─────────────────────────── */}
      <section className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-14"
          >
            <motion.p variants={fadeUp} className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Testimonials</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">What Our Students Say</motion.h2>
          </motion.div>

          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="pb-12"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="glass p-6 h-full">
                  <div className="flex gap-1 mb-3">
                    {[...Array(t.rating)].map((_, j) => (
                      <Star key={j} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-white/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <div>
                    <div className="text-white font-semibold">{t.name}</div>
                    <div className="text-[#FF6B35] text-xs">{t.batch}</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────────── */}
      <section className="py-20 px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-4xl mx-auto glass text-center p-12 bg-gradient-to-br from-[#FF6B35]/20 to-[#8B4513]/20"
        >
          <Leaf className="w-12 h-12 text-[#FF6B35] mx-auto mb-4" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Begin Your Yoga Journey Today
          </h2>
          <p className="text-white/70 mb-8 max-w-xl mx-auto">
            Join 500+ students who have transformed their health, mind, and spirit with Bilva Yogashala. First class is FREE!
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/register" className="btn-primary px-10 py-4 text-lg">
              Register Now — It's Free
            </Link>
            <Link to="/contact" className="btn-outline px-10 py-4 text-lg">
              Talk to Us
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
