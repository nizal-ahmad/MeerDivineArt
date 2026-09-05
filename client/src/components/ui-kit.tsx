import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "fade-up max-w-2xl",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2 className="mt-3 text-3xl leading-tight text-brown sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-4 text-sm leading-relaxed text-brown/65 sm:text-base">
          {subtitle}
        </p>
      ) : null}
      <div
        className={cn(
          "rule-gold mt-6 h-px w-24",
          align === "center" && "mx-auto",
        )}
      />
    </div>
  );
}

const buttonBase =
  "inline-flex items-center justify-center gap-2 whitespace-nowrap px-7 py-3.5 text-[0.72rem] font-semibold uppercase tracking-[0.2em] transition-all duration-300 disabled:opacity-50";

const variants = {
  solid: "bg-brown text-ivory hover:bg-burnt",
  gold: "bg-gold text-brown hover:bg-burnt hover:text-ivory",
  outline: "border border-brown/40 text-brown hover:border-gold hover:bg-sand/40",
  outlineLight:
    "border border-gold/60 text-ivory hover:bg-gold hover:text-brown",
  ghost: "text-brown underline-offset-4 hover:text-burnt hover:underline",
} as const;

type Variant = keyof typeof variants;

export function ActionButton({
  children,
  variant = "solid",
  className,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button className={cn(buttonBase, variants[variant], className)} {...rest}>
      {children}
    </button>
  );
}

export function LinkButton({
  to,
  params,
  children,
  variant = "solid",
  className,
}: {
  to: string;
  params?: Record<string, string>;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      to={to as any}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      params={params as any}
      className={cn(buttonBase, variants[variant], className)}
    >
      {children}
    </Link>
  );
}

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="bg-brown/90 px-3 py-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-ivory">
      {children}
    </span>
  );
}

export function Stars({ rating = 5, className }: { rating?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-0.5 text-gold", className)}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 20 20"
          className="h-3.5 w-3.5"
          fill={i < rating ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.2"
          aria-hidden="true"
        >
          <path d="M10 1.8l2.4 4.9 5.4.8-3.9 3.8.9 5.4-4.8-2.5-4.8 2.5.9-5.4L2.2 7.5l5.4-.8z" />
        </svg>
      ))}
    </span>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="border-b border-gold/20 bg-beige/50">
      <div className="mx-auto max-w-7xl px-5 py-14 text-center sm:px-8 md:py-20">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h1 className="fade-up mt-3 text-4xl text-brown sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {subtitle ? (
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-brown/65 sm:text-base">
            {subtitle}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
