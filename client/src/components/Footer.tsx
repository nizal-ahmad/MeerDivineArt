import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import { categories } from "@/data/catalog";
import logoImg from "../../assets/Logo@2x.png";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-gold/25 bg-brown text-ivory/85">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-4 md:py-16">
        <div className="md:col-span-1">
          <Link to="/" className="inline-block">
            <img
              src={logoImg}
              alt="Meer Divine Art"
              className="h-12 w-auto object-contain brightness-0 invert opacity-95"
            />
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-ivory/65">
            Handcrafted calligraphy, Islamic art and personalised frames, made in
            Pakistan with patience and care.
          </p>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">
            Collections
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  to="/shop"
                  search={{ category: c.slug }}
                  className="text-ivory/70 transition-colors hover:text-gold"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">
            Explore
          </h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/shop" className="text-ivory/70 hover:text-gold">
                Shop All
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-ivory/70 hover:text-gold">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-ivory/70 hover:text-gold">
                Contact
              </Link>
            </li>
            <li>
              <Link to="/cart" className="text-ivory/70 hover:text-gold">
                Cart
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-[0.65rem] uppercase tracking-[0.24em] text-gold">
            Studio
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-ivory/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              <span>Master City, Gujranwala, Pakistan</span>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              <a href="tel:+923242894377" className="hover:text-gold transition-colors">
                +92 324 2894377
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              <a href="mailto:meerdivineart@gmail.com" className="hover:text-gold transition-colors">
                meerdivineart@gmail.com
              </a>
            </li>
          </ul>

          {/* Social Media Icons (TikTok, Instagram, Facebook, YouTube) */}
          <div className="mt-6 flex items-center gap-3">
            <a
              href="https://www.tiktok.com/@meerdivineart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-brown/60 text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-brown active:scale-95 cursor-pointer shadow-xs"
            >
              <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-2.891 2.887 2.896 2.896 0 0 1-2.887-2.887 2.896 2.896 0 0 1 2.887-2.891c.24 0 .47.03.69.085V9.336a6.327 6.327 0 0 0-.69-.038A6.338 6.338 0 0 0 3.153 15.63 6.338 6.338 0 0 0 9.49 21.97a6.338 6.338 0 0 0 6.337-6.34V8.718a8.212 8.212 0 0 0 4.762 1.527V6.79a4.832 4.832 0 0 1-1.000-.104z"/>
              </svg>
            </a>
            <a
              href="https://www.instagram.com/meerdivineart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-brown/60 text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-brown active:scale-95 cursor-pointer shadow-xs"
            >
              <Instagram className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://www.facebook.com/share/1BoMgDNKzc/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-brown/60 text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-brown active:scale-95 cursor-pointer shadow-xs"
            >
              <Facebook className="h-4 w-4" strokeWidth={1.6} />
            </a>
            <a
              href="https://youtube.com/@meerdivineart"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-brown/60 text-gold transition-all duration-300 hover:border-gold hover:bg-gold hover:text-brown active:scale-95 cursor-pointer shadow-xs"
            >
              <Youtube className="h-4 w-4" strokeWidth={1.6} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-ivory/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-5 text-[0.65rem] uppercase tracking-[0.18em] text-ivory/45 sm:flex-row sm:px-8">
          <span>© {new Date().getFullYear()} Meer Divine Art</span>
          <span>Handcrafted in Pakistan</span>
        </div>
      </div>
    </footer>
  );
}
