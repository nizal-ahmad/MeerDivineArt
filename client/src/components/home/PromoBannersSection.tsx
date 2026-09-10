import { Link } from "@tanstack/react-router";

export function PromoBannersSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-6 items-stretch">
          
          {/* Left Main Banner Card (Wallpaper Murals / Handcrafted Wall Art) */}
          <div className="lg:col-span-7 xl:col-span-7 relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-charcoal min-h-[380px] sm:min-h-[440px] lg:min-h-[500px] flex items-center shadow-md transition-shadow duration-300 hover:shadow-xl">
            {/* Background Lifestyle Image */}
            <img
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=1200&q=80"
              alt="Wallpaper Murals - Handcrafted Wall Art"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
            />

            {/* Subtle Darkness Overlay on Left */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/50 to-transparent sm:from-black/80 sm:via-black/40" />

            {/* Banner Text Content */}
            <div className="relative z-10 p-6 sm:p-10 lg:p-12 max-w-md flex flex-col items-start gap-3.5 sm:gap-4">
              <h2 className="font-display text-2xl sm:text-4xl xl:text-5xl font-extrabold uppercase text-white leading-[1.1] tracking-wider drop-shadow-lg">
                WALLPAPER <br />
                MURALS
              </h2>

              {/* Tagline Badge */}
              <div className="inline-block bg-[#1f241d]/90 backdrop-blur-xs border border-white/20 px-3.5 py-1.5 rounded-xs shadow-sm">
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-white uppercase">
                  MADE TO MEASURE
                </span>
              </div>

              {/* CTA Action Button */}
              <div className="mt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 sm:px-7 py-2.5 sm:py-3 text-xs sm:text-sm font-bold tracking-[0.2em] text-black uppercase shadow-md transition-all duration-300 hover:bg-gold hover:text-brown active:scale-95 cursor-pointer"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          {/* Right Stacked Cards Container */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5 lg:gap-6 justify-between">
            
            {/* Top Right Card (Handmade Paintings) */}
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-brown min-h-[220px] sm:min-h-[240px] flex items-center justify-end shadow-md transition-shadow duration-300 hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80"
                alt="Handmade Paintings"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Darkness Overlay on Right */}
              <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-transparent" />

              <div className="relative z-10 p-5 sm:p-7 text-right flex flex-col items-end gap-2.5 sm:gap-3 max-w-xs">
                <h3 className="font-display text-xl sm:text-2xl xl:text-3xl font-extrabold uppercase text-white leading-tight tracking-wider drop-shadow-md">
                  HANDMADE <br />
                  PAINTINGS
                </h3>

                <div className="inline-block bg-[#4e2714]/90 border border-gold/30 px-3 py-1 rounded-xs shadow-sm">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-ivory uppercase">
                    BY TOP ARTISTS
                  </span>
                </div>

                <div className="mt-1">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-md bg-white px-5 sm:px-6 py-2 text-xs font-bold tracking-[0.18em] text-black uppercase shadow-md transition-all duration-300 hover:bg-gold hover:text-brown active:scale-95 cursor-pointer"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Right Card (Framed Posters) */}
            <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-burnt min-h-[220px] sm:min-h-[240px] flex items-center justify-start shadow-md transition-shadow duration-300 hover:shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80"
                alt="Framed Calligraphy Posters"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />

              {/* Darkness Overlay on Left */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

              <div className="relative z-10 p-5 sm:p-7 text-left flex flex-col items-start gap-2.5 sm:gap-3 max-w-xs">
                <h3 className="font-display text-xl sm:text-2xl xl:text-3xl font-extrabold uppercase text-white leading-tight tracking-wider drop-shadow-md">
                  FRAMED <br />
                  POSTERS
                </h3>

                <div className="inline-block bg-[#7a1818]/90 border border-white/20 px-3 py-1 rounded-xs shadow-sm">
                  <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                    INSTANT MOOD SHIFT
                  </span>
                </div>

                <div className="mt-1">
                  <Link
                    to="/shop"
                    className="inline-flex items-center justify-center rounded-md bg-white px-5 sm:px-6 py-2 text-xs font-bold tracking-[0.18em] text-black uppercase shadow-md transition-all duration-300 hover:bg-gold hover:text-brown active:scale-95 cursor-pointer"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
