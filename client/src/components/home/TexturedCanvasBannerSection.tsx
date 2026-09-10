import { Link } from "@tanstack/react-router";
import { Flame } from "lucide-react";

const canvasImages = [
  {
    url: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=600&q=80",
    title: "Allah Muhammad Frame",
    rotate: "rotate-[-10deg] -mr-6 sm:-mr-8 lg:-mr-10",
  },
  {
    url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&w=600&q=80",
    title: "4 Qul Handcrafted Frame",
    rotate: "rotate-[-5deg] -mr-6 sm:-mr-8 lg:-mr-10",
  },
  {
    url: "https://images.unsplash.com/photo-1578926375605-eaf7559b1458?auto=format&fit=crop&w=600&q=80",
    title: "Ayat-ul-Kursi Gold",
    rotate: "rotate-[0deg] -mr-6 sm:-mr-8 lg:-mr-10",
  },
  {
    url: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
    title: "Custom Frame Artwork",
    rotate: "rotate-[5deg] -mr-6 sm:-mr-8 lg:-mr-10",
  },
  {
    url: "https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=600&q=80",
    title: "Minimal Bismillah Frame",
    rotate: "rotate-[10deg] -mr-6 sm:-mr-8 lg:-mr-10",
  },
  {
    url: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80",
    title: "SubhanAllah Calligraphy",
    rotate: "rotate-[15deg]",
  },
];

export function TexturedCanvasBannerSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f2f2f2] p-6 sm:p-10 lg:p-12 border border-black/5 shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center">
            
            {/* Left Column: Text & Call To Action */}
            <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left gap-3.5 sm:gap-4">
              
              {/* Hot Selling Red Badge */}
              <div className="inline-flex items-center gap-1.5 rounded-xs bg-[#c62828] px-4 py-1 text-xs font-bold uppercase text-white shadow-xs tracking-wider">
                <Flame className="h-3.5 w-3.5 fill-white text-white" />
                HOT SELLING
              </div>

              {/* Main Heading */}
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-[#1f1f1f] tracking-wide leading-tight">
                TEXTURED CANVAS
              </h2>

              {/* Description Paragraph */}
              <p className="max-w-lg text-xs sm:text-sm font-semibold uppercase tracking-wider text-charcoal/85 leading-relaxed">
                TEXTURED PRINTS THAT LOOK AND FEEL LIKE REAL PAINTINGS.
                <br className="hidden sm:inline" /> GET THE GALLERY VIBE WITHOUT THE HIGH-END PRICE TAG.
                <br className="hidden sm:inline" /> A LITERAL MASTERPIECE.
              </p>

              {/* Shop Now Button */}
              <div className="mt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-[#c62828] px-8 py-2.5 text-xs font-bold tracking-[0.2em] text-white uppercase shadow-md transition-all duration-300 hover:bg-[#9a1e1e] hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>

            {/* Right Column: Fanned Overlapping 3D Canvas Cards */}
            <div className="lg:col-span-6 flex items-center justify-center lg:justify-end py-4 sm:py-6 overflow-hidden">
              <div className="flex items-center py-4 px-2">
                {canvasImages.map((img, idx) => (
                  <div
                    key={img.title + idx}
                    className={`relative z-${10 + idx} ${img.rotate} transition-all duration-500 hover:scale-115 hover:z-40 hover:rotate-0`}
                  >
                    <img
                      src={img.url}
                      alt={img.title}
                      className="w-[95px] sm:w-[125px] md:w-[145px] lg:w-[155px] aspect-[3/4] rounded-lg shadow-[0_12px_28px_rgba(0,0,0,0.25)] border-2 border-white/80 object-cover bg-white"
                    />
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
