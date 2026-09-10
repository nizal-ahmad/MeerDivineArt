import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
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
                  to="/category/$slug"
                  params={{ slug: c.slug }}
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
              <Link to="/wishlist" className="text-ivory/70 hover:text-gold">
                Wishlist
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
              Studio 12, Gulberg III, Lahore, Pakistan
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              +92 300 0000000
            </li>
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              hello@meerdivineart.pk
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} />
              @meerdivineart
            </li>
          </ul>
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
