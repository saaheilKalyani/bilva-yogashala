import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  { name: 'Priya Sharma', batch: 'Morning Hatha', location: 'Andheri West', rating: 5, years: 2, text: 'Bilva Yogashala transformed my life completely. The instructors are incredibly knowledgeable, the classes are perfectly paced, and the community is so warm and welcoming. I\'ve never felt healthier!' },
  { name: 'Rajesh Mehta', batch: 'Therapy Yoga', location: 'Goregaon West', rating: 5, years: 3, text: 'The therapy yoga classes helped me overcome chronic back pain that I had suffered with for years. Under Dr. Meera\'s guidance, I\'m completely pain-free. Life-changing experience!' },
  { name: 'Ananya Patel', batch: 'Kids Yoga', location: 'Andheri West', rating: 5, years: 1, text: 'My children aged 7 and 10 absolutely love their classes. Their focus has improved dramatically, they sleep better, and they\'re more confident in school. Priya ma\'am is wonderful with kids.' },
  { name: 'Suresh Iyer', batch: 'Senior Gentle', location: 'Thane West', rating: 4, years: 2, text: 'The senior yoga classes are gentle yet very effective. Dr. Anand is extremely patient and attentive. I feel more energetic at 65 than I did at 50. Highly recommended for seniors!' },
  { name: 'Meera Nair', batch: 'Online Flow', location: 'Online', rating: 5, years: 1, text: 'The online classes are just as effective as in-person. The instructor makes sure everyone follows correctly through the screen. Perfect for my busy schedule. Best decision I made!' },
  { name: 'Vikram Joshi', batch: 'Adult Hatha', location: 'Goregaon West', rating: 5, years: 4, text: 'Outstanding instruction and a wonderful community feel. Guru Ravi\'s teaching style is authentic and deeply rooted in traditional yoga philosophy. I\'ve been coming for 4 years and counting.' },
  { name: 'Sunita Desai', batch: 'Morning Hatha', location: 'Thane West', rating: 5, years: 1, text: 'I joined during a stressful period in my life and yoga here became my anchor. The peaceful atmosphere and expert guidance have truly changed how I handle stress. Forever grateful.' },
  { name: 'Amit Shah', batch: 'Therapy Yoga', location: 'Andheri West', rating: 5, years: 2, text: 'Suffering from spondylitis, I was skeptical but Bilva\'s therapy yoga has given me so much relief. The personalised attention in small batches makes all the difference.' },
];

export default function Testimonials() {
  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-14">
          <p className="text-[#FF6B35] text-sm font-semibold tracking-widest uppercase mb-2">Testimonials</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Stories of Transformation</h1>
          <p className="text-white/60 max-w-2xl mx-auto">Real experiences from our community of 500+ students who have transformed their lives through yoga.</p>
        </motion.div>

        {/* Featured large slider */}
        <div className="mb-16">
          <Swiper
            modules={[Pagination, Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{ 768: { slidesPerView: 2 }, 1200: { slidesPerView: 3 } }}
            pagination={{ clickable: true }}
            autoplay={{ delay: 4500, disableOnInteraction: false }}
            navigation
            className="pb-14"
          >
            {testimonials.map((t, i) => (
              <SwiperSlide key={i}>
                <div className="glass p-8 h-full flex flex-col">
                  <Quote className="w-8 h-8 text-[#FF6B35]/50 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className={`w-4 h-4 ${j < t.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/20'}`} />
                    ))}
                  </div>
                  <p className="text-white/80 leading-relaxed italic flex-1 mb-6">"{t.text}"</p>
                  <div className="pt-4 border-t border-white/10 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#FF6B35] to-[#8B4513] flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {t.name.split(' ').map((n) => n[0]).join('')}
                    </div>
                    <div>
                      <div className="text-white font-semibold">{t.name}</div>
                      <div className="text-[#FF6B35] text-xs">{t.batch} · {t.location}</div>
                    </div>
                    <div className="ml-auto text-white/40 text-xs">{t.years}y</div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[['500+', 'Happy Students'], ['4.9', 'Average Rating'], ['98%', 'Would Recommend'], ['10+', 'Years Trusted']].map(([val, label]) => (
            <div key={label} className="glass p-6 text-center">
              <div className="text-3xl font-bold text-[#FF6B35] mb-1">{val}</div>
              <div className="text-white/60 text-sm">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
