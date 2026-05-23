export default function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center section-gradient">
      <div className="glass p-10 flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-white/10" />
          <div className="absolute inset-0 rounded-full border-4 border-t-[#FF6B35] border-r-transparent border-b-transparent border-l-transparent animate-spin" />
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-[#8B4513] border-b-transparent border-l-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }} />
        </div>
        <p className="text-white/70 text-sm tracking-widest uppercase">Loading...</p>
      </div>
    </div>
  );
}
