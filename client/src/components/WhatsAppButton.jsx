import { MessageCircle } from 'lucide-react';

const WA_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER || '919876543210';

export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WA_NUMBER}?text=Hi%2C%20I%27m%20interested%20in%20joining%20Bilva%20Yogashala!`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-green-500 hover:bg-green-400 rounded-full flex items-center justify-center shadow-lg hover:shadow-green-400/40 transition-all duration-300 hover:scale-110 pulse-glow"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white fill-white" />
    </a>
  );
}
