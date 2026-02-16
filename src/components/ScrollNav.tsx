import { ChevronLeft, ChevronRight } from "lucide-react";

interface ScrollNavProps {
  total: number;
  current: number;
  onNavigate: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const ScrollNav = ({ total, current, onNavigate, onPrev, onNext }: ScrollNavProps) => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-6 bg-black/40 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full">
      <button
        onClick={onPrev}
        className="p-2 transition-all hover:scale-110 text-white/50 hover:text-white"
        aria-label="Previous"
      >
        <ChevronLeft size={20} />
      </button>

      <div className="flex items-center gap-3">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            onClick={() => onNavigate(i)}
            className={`h-1.5 transition-all duration-500 rounded-full ${i === current ? "w-8 bg-primary" : "w-1.5 bg-white/10 hover:bg-white/30"
              }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      <button
        onClick={onNext}
        className="p-2 transition-all hover:scale-110 text-white/50 hover:text-white"
        aria-label="Next"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

export default ScrollNav;
