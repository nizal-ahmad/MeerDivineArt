export function ArabicCalligraphy({ className = "h-16 w-auto" }: { className?: string }) {
  return (
    <div className={`inline-flex flex-col items-start select-none ${className}`}>
      <span
        className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"
        style={{ fontFamily: "'Amiri', 'Traditional Arabic', 'Scheherazade New', serif" }}
        dir="rtl"
        lang="ar"
      >
        لا إله إلا الله محمد رسول الله
      </span>
      <div className="h-0.5 w-full bg-gradient-to-r from-white/90 via-gold/80 to-transparent mt-1 rounded-full opacity-80" />
    </div>
  );
}
