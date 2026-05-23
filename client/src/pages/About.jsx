import { motion } from 'framer-motion';
import { Leaf, Award, Heart, Users } from 'lucide-react';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const stagger = { visible: { transition: { staggerChildren: 0.12 } } };

const instructors = [
  { name: 'Guru Ravi Shankar', role: 'Founder & Head Instructor', experience: '22 years', speciality: 'Hatha & Ashtanga Yoga', initials: 'RS' },
  { name: 'Dr. Meera Kulkarni', role: 'Therapy Yoga Specialist', experience: '15 years', speciality: 'Therapeutic & Medical Yoga', initials: 'MK' },
  { name: 'Priya Nair', role: 'Kids Yoga Instructor', experience: '10 years', speciality: 'Children\'s Yoga & Mindfulness', initials: 'PN' },
  { name: 'Dr. Anand Iyer', role: 'Senior Yoga Specialist', experience: '18 years', speciality: 'Gentle Yoga & Pranayama', initials: 'AI' },
];

const achievements = [
  { icon: Users, value: '500+', label: 'Happy Students' },
  { icon: Award, value: '10+', label: 'Years of Experience' },
  { icon: Heart, value: '4', label: 'Specialized Programs' },
  { icon: Leaf, value: '3', label: 'Active Branches' },
];

export default function About() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div initial="hidden" animate="visible" variants={stagger} className="text-center mb-20">
          <motion.p variants={fadeUp} className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">About Us</motion.p>
          <motion.h1 variants={fadeUp} className="text-4xl md:text-5xl font-bold text-white mb-6">
            Our Story of <span className="bg-gradient-to-r from-[#FF6B35] to-[#F5E6C8] bg-clip-text text-transparent">Transformation</span>
          </motion.h1>
          <motion.p variants={fadeUp} className="text-white/70 text-lg max-w-3xl mx-auto leading-relaxed">
            Founded in 2014 by Guru Ravi Shankar, Bilva Yogashala was born from a simple vision: to bring the authentic teachings of yoga to the heart of Mumbai and make them accessible to everyone regardless of age or ability.
          </motion.p>
        </motion.div>

        {/* Story */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid md:grid-cols-2 gap-10 mb-24 items-center"
        >
          <motion.div variants={fadeUp} className="glass p-8">
            <h2 className="text-2xl font-bold text-white mb-4">The Bilva Philosophy</h2>
            <p className="text-white/70 leading-relaxed mb-4">
              The Bilva tree (Aegle marmelos) is sacred in Indian tradition — its three-leafed structure symbolises the trinity of body, mind, and spirit. This philosophy is at the core of everything we do at Bilva Yogashala.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              We believe yoga is not just exercise — it's a complete lifestyle transformation. Our curriculum blends classical Hatha, therapeutic techniques, pranayama, and meditation to offer a holistic path to wellness.
            </p>
            <p className="text-white/70 leading-relaxed">
              From our first small studio in Andheri West, we've grown to 3 branches serving 500+ students. Each student journey is unique, and we honour that with personalised attention and small batch sizes.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} className="grid grid-cols-2 gap-4">
            {achievements.map(({ icon: Icon, value, label }) => (
              <div key={label} className="glass p-6 text-center">
                <Icon className="w-8 h-8 text-[#FF6B35] mx-auto mb-3" />
                <div className="text-3xl font-bold text-white mb-1">{value}</div>
                <div className="text-white/60 text-sm">{label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Instructors */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
          <div className="text-center mb-12">
            <motion.p variants={fadeUp} className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Our Team</motion.p>
            <motion.h2 variants={fadeUp} className="text-3xl md:text-4xl font-bold text-white">Expert Instructors</motion.h2>
          </div>

          <motion.div variants={stagger} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {instructors.map((inst) => (
              <motion.div key={inst.name} variants={fadeUp} className="glass p-6 text-center hover:bg-white/15 transition-all duration-300">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {inst.initials}
                </div>
                <h3 className="text-white font-bold text-lg">{inst.name}</h3>
                <p className="text-[#FF6B35] text-sm mb-2">{inst.role}</p>
                <p className="text-white/60 text-xs mb-1">{inst.speciality}</p>
                <p className="text-white/40 text-xs">{inst.experience} experience</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
