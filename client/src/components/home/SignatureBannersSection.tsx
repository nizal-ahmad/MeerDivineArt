import { Link } from "@tanstack/react-router";
import { Truck, ShieldCheck, ArrowRight } from "lucide-react";

export function SignatureBannersSection() {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-6">
        
        {/* Top 2 Banners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          
          {/* Banner 1: Luxury Calligraphy / Millionaire Club */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-[#f4f4f2] min-h-[260px] sm:min-h-[290px] flex items-center shadow-xs transition-shadow duration-300 hover:shadow-md">
            <img
              src="https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?auto=format&fit=crop&w=900&q=80"
              alt="Luxury Calligraphy Art"
              className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-1000 group-hover:scale-105"
            />
            {/* Gradient Overlay for Left Text Readability */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f4f2] via-[#f4f4f2]/85 to-transparent max-w-[80%]" />

            <div className="relative z-10 p-6 sm:p-8 max-w-xs sm:max-w-sm flex flex-col items-start gap-3">
              <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-[#1a1a1a] leading-none tracking-wide">
                LUXURY <br />
                CALLIGRAPHY
              </h3>

              <div className="inline-block bg-[#ba55d3] px-3 py-1 rounded-xs shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                  BIG , BOLD & AESTHETIC
                </span>
              </div>

              <div className="mt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-2.5 text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase shadow-md transition-all duration-300 hover:bg-gold hover:text-brown active:scale-95 cursor-pointer"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

          {/* Banner 2: Signature Frames */}
          <div className="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-gold/20 bg-[#f4f4f2] min-h-[260px] sm:min-h-[290px] flex items-center shadow-xs transition-shadow duration-300 hover:shadow-md">
            <img
              src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=900&q=80"
              alt="Signature Frames Artwork"
              className="absolute inset-0 h-full w-full object-cover object-right transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f4f4f2] via-[#f4f4f2]/85 to-transparent max-w-[80%]" />

            <div className="relative z-10 p-6 sm:p-8 max-w-xs sm:max-w-sm flex flex-col items-start gap-3">
              <div>
                <span className="font-serif italic text-3xl sm:text-4xl text-brown font-normal block leading-none">
                  Signature
                </span>
                <span className="font-display font-extrabold uppercase text-xl sm:text-2xl text-[#1a1a1a] tracking-wider leading-none mt-1 block">
                  FRAMES
                </span>
              </div>

              <div className="inline-block bg-[#0b5394] px-3 py-1 rounded-xs shadow-xs">
                <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] text-white uppercase">
                  ARCHITECT'S CHOICE
                </span>
              </div>

              <div className="mt-2">
                <Link
                  to="/shop"
                  className="inline-flex items-center justify-center rounded-md bg-white px-6 py-2.5 text-xs font-bold tracking-[0.18em] text-[#1a1a1a] uppercase shadow-md transition-all duration-300 hover:bg-gold hover:text-brown active:scale-95 cursor-pointer"
                >
                  SHOP NOW
                </Link>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Delivery Trust Banner */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#f7ede2] border border-gold/20 p-6 sm:p-8 lg:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          <div className="flex flex-col items-start gap-2.5 text-left max-w-xl">
            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#1a1a1a] tracking-tight">
              Free Delivery, Zero Worries
            </h3>
            <p className="text-xs sm:text-sm font-medium text-brown/80 leading-relaxed">
              Doorstep delivery and easy replacements across Pakistan, with no additional cost.
            </p>
            <div className="mt-2">
              <Link
                to="/about"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#d32f2f] px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md transition-all duration-300 hover:bg-[#b71c1c] active:scale-95 cursor-pointer"
              >
                <span>Read more</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

          {/* Red Delivery Truck Graphic Badge */}
          <div className="flex-shrink-0 flex items-center justify-center">
            <div className="relative flex items-center gap-4 bg-white/80 backdrop-blur-xs border border-gold/30 p-4 sm:p-5 rounded-2xl shadow-sm">
              <div className="flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-xl bg-[#d32f2f] text-white shadow-md">
                <Truck className="h-6 w-6 sm:h-7 sm:w-7" />
              </div>
              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold text-brown uppercase tracking-wider">
                  <ShieldCheck className="h-4 w-4 text-[#d32f2f]" />
                  <span>Nationwide Shipping</span>
                </div>
                <p className="text-[11px] text-brown/70 font-sans mt-0.5">
                  Safe & insured doorstep dispatch
                </p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
