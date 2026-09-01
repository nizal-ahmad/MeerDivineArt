import { Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type PlaceholderType =
  | "hero"
  | "product"
  | "category"
  | "gallery"
  | "thumbnail"
  | "story";

const ratioClass: Record<PlaceholderType, string> = {
  hero: "aspect-[4/5]",
  product: "aspect-[4/5]",
  category: "aspect-[3/4]",
  gallery: "aspect-square",
  thumbnail: "aspect-square",
  story: "aspect-[5/6]",
};

/**
 * Temporary premium image placeholder.
 * Replace with <img src={...} alt={...} className="h-full w-full object-cover" />
 * inside the same wrapper when real photography is available.
 */
export function ImagePlaceholder({
  type = "product",
  label = "Product Image",
  className,
  ratio,
  zoomOnHover = true,
}: {
  type?: PlaceholderType;
  label?: string;
  className?: string;
  ratio?: string;
  zoomOnHover?: boolean;
}) {
  const isLarge = type === "hero" || type === "story";

  return (
    <div
      className={cn(
        "group/ph relative w-full overflow-hidden border border-gold/30 bg-ivory",
        ratio ?? ratioClass[type],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--color-beige),var(--color-ivory)_60%)]" />

      {/* subtle geometric motif */}
      <svg
        className={cn(
          "absolute inset-0 h-full w-full text-gold/25 transition-transform duration-700",
          zoomOnHover && "group-hover/ph:scale-[1.04]",
        )}
        viewBox="0 0 200 200"
        fill="none"
        aria-hidden="true"
        preserveAspectRatio="xMidYMid slice"
      >
        <rect
          x="24"
          y="24"
          width="152"
          height="152"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <rect
          x="100"
          y="16"
          width="118"
          height="118"
          transform="rotate(45 100 16)"
          stroke="currentColor"
          strokeWidth="0.6"
        />
        <circle cx="100" cy="100" r="54" stroke="currentColor" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="34" stroke="currentColor" strokeWidth="0.6" />
      </svg>

      <div className="absolute inset-3 border border-gold/25" />

      <div className="relative flex h-full w-full flex-col items-center justify-center gap-2 px-4 text-center">
        <span
          className={cn(
            "flex items-center justify-center rounded-full border border-gold/40 bg-sand/40 text-brown/70",
            isLarge ? "h-12 w-12" : "h-9 w-9",
          )}
        >
          <ImageIcon className={isLarge ? "h-5 w-5" : "h-4 w-4"} strokeWidth={1.2} />
        </span>
        {label ? (
          <span
            className={cn(
              "font-sans uppercase text-brown/60",
              isLarge
                ? "text-[0.7rem] tracking-[0.32em]"
                : "text-[0.6rem] tracking-[0.24em]",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    </div>
  );
}

export const HeroImagePlaceholder = ({
  label = "Hero Artwork",
}: {
  label?: string;
}) => <ImagePlaceholder type="hero" label={label} />;

export const ProductImagePlaceholder = ({
  label = "Product Image",
  className,
}: {
  label?: string;
  className?: string;
}) => <ImagePlaceholder type="product" label={label} className={className} />;
