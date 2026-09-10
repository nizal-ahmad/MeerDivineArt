import { useState, useRef, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, VolumeX } from "lucide-react";

interface StoryReel {
  id: string;
  image: string;
  alt: string;
  hasAudio?: boolean;
}

const reelItems: StoryReel[] = [
  {
    id: "reel-1",
    image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80",
    alt: "Calligraphy Frame Trio Unboxing",
    hasAudio: true,
  },
  {
    id: "reel-2",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    alt: "Customer Opening Package",
    hasAudio: false,
  },
  {
    id: "reel-3",
    image: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=600&q=80",
    alt: "Living Room Wall Setup",
    hasAudio: true,
  },
  {
    id: "reel-4",
    image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
    alt: "Artist Review & Craft Detail",
    hasAudio: true,
  },
  {
    id: "reel-5",
    image: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
    alt: "Customer Holding Artwork",
    hasAudio: false,
  },
  {
    id: "reel-6",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    alt: "Gold Leaf Framing Moment",
    hasAudio: true,
  },
];

export function HomeStoriesSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidthRatio, setThumbWidthRatio] = useState(0.2);

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) {
      setScrollProgress(0);
      setThumbWidthRatio(1);
    } else {
      const progress = scrollLeft / maxScroll;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
      setThumbWidthRatio(Math.max(clientWidth / scrollWidth, 0.15));
    }
  }, []);

  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [handleScroll]);

  const scrollByAmount = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const containerWidth = scrollRef.current.clientWidth;
    const scrollAmount = direction === "left" ? -containerWidth * 0.75 : containerWidth * 0.75;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section className="w-full bg-white py-12 sm:py-16 lg:py-20 border-t border-gold/15">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="relative flex flex-col items-center justify-center mb-8 sm:mb-10">
          <h2 className="font-display text-lg sm:text-2xl lg:text-3xl font-extrabold uppercase tracking-wider text-[#1a1a1a] text-center">
            WHAT MAKES YOUR HOUSE A “HOME”
          </h2>

          {/* Desktop Arrow Navigation Buttons */}
          <div className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 items-center gap-2">
            <button
              type="button"
              onClick={() => scrollByAmount("left")}
              aria-label="Previous Stories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white text-brown shadow-xs transition-all duration-200 hover:bg-beige hover:border-gold active:scale-95 cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByAmount("right")}
              aria-label="Next Stories"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-white text-brown shadow-xs transition-all duration-200 hover:bg-beige hover:border-gold active:scale-95 cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Reel Carousel Row */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="no-scrollbar flex gap-4 sm:gap-5 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1"
        >
          {reelItems.map((reel) => (
            <div
              key={reel.id}
              className="group relative min-w-[180px] w-[180px] sm:min-w-[210px] sm:w-[210px] md:min-w-[230px] md:w-[230px] aspect-[9/14] sm:aspect-[9/15] flex-shrink-0 snap-start select-none overflow-hidden rounded-2xl border border-gold/20 bg-[#f7f5f0] shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
            >
              {/* Background Reel Image */}
              <img
                src={reel.image}
                alt={reel.alt}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Soft Gradient Overlay at Bottom */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/10 opacity-90 transition-opacity group-hover:opacity-100" />

              {/* Video Play & Mute Button Overlays at Bottom (Matching Reference Image) */}
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white border border-white/20">
                  <Play className="h-4 w-4 fill-white text-white translate-x-0.5" />
                </div>
                {reel.hasAudio && (
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-black/40 backdrop-blur-xs text-white border border-white/20">
                    <VolumeX className="h-4 w-4 text-white" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Scroll Progress Bar Indicator */}
        <div className="mt-6 sm:mt-8 w-full px-1">
          <div className="relative h-[3px] w-full rounded-full bg-neutral-200 overflow-hidden">
            <div
              className="absolute top-0 bottom-0 bg-[#1a1a1a] rounded-full transition-all duration-150 ease-out"
              style={{
                width: `${thumbWidthRatio * 100}%`,
                left: `${scrollProgress * (100 - thumbWidthRatio * 100)}%`,
              }}
            />
          </div>
        </div>

      </div>
    </section>
  );
}
