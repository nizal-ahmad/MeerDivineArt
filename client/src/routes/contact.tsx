import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Clock, Mail, MapPin, MessageSquare, Phone, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/ui-kit";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const title = "Contact Us — Meer Divine Art Studio";
const description =
  "Get in touch with Meer Divine Art. Ask about custom orders, wall art inquiries, or reach out directly on WhatsApp.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const whatsappPhone = "923242894377";
  const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(
    "Hello Meer Divine Art, I would like to make an inquiry about your artwork."
  )}`;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please enter your full name (at least 2 characters).";
    }

    if (!formData.email.trim()) {
      errs.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = "Please enter a valid email address (e.g. user@example.com).";
    }

    if (!formData.phone.trim()) {
      errs.phone = "Please enter your phone number.";
    } else if (!/^\d+$/.test(formData.phone.trim())) {
      errs.phone = "Phone number must contain numbers only.";
    } else if (formData.phone.trim().length !== 11) {
      errs.phone = "Phone number must be exactly 11 digits (e.g., 03001234567).";
    }

    if (!formData.subject.trim() || formData.subject.trim().length < 3) {
      errs.subject = "Please enter a subject (at least 3 characters).";
    }

    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePhoneChange = (val: string) => {
    const digitsOnly = val.replace(/\D/g, "").slice(0, 11);
    setFormData((prev) => ({ ...prev, phone: digitsOnly }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: "" }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
      setErrors({});
    }, 600);
  };

  const faqs = [
    {
      q: "How long does custom order delivery take?",
      a: "Custom calligraphy and name pieces typically take 5–8 business days for design, crafting, framing, and nationwide delivery.",
    },
    {
      q: "Do you ship across Pakistan with safe packaging?",
      a: "Yes! We provide nationwide shipping with specialized shockproof bubble wrap and corner protection to ensure your frame arrives in perfect condition.",
    },
    {
      q: "Can I request specific Quranic ayats or custom font styles?",
      a: "Absoluty. You can specify your desired Arabic text, translation, frame finish, and color scheme through our custom inquiry form or directly on WhatsApp.",
    },
    {
      q: "What payment methods do you accept?",
      a: "We accept Cash on Delivery (COD), Online Bank Transfers, and EasyPaisa/JazzCash.",
    },
  ];

  return (
    <div className="bg-background">
      {/* Page Hero */}
      <PageHero
        eyebrow="Reach Out To Us"
        title="We'd Love To Hear From You"
        subtitle="Have questions about a piece, custom sizes, or delivery? Send us a message or chat with us directly."
      />

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 md:py-24">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Contact Details & Direct WhatsApp Card */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="eyebrow">Studio Contact</p>
              <h2 className="mt-3 text-3xl font-display text-brown sm:text-4xl">
                Get In Touch
              </h2>
              <p className="mt-3 text-sm text-brown/75 leading-relaxed">
                Whether you need advice selecting artwork or want to discuss a bespoke custom order, our team is always ready to assist you.
              </p>
            </div>

            {/* Direct WhatsApp Callout Card */}
            <div className="rounded-2xl border border-[#25D366]/40 bg-emerald-950/10 p-6 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#25D366] text-white">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-brown">Instant WhatsApp Inquiry</h3>
                  <p className="mt-1 text-xs leading-relaxed text-brown/70">
                    Prefer instant responses? Chat directly with our master studio team on WhatsApp.
                  </p>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-xs font-semibold text-white shadow transition-all hover:bg-[#20ba5a] hover:scale-105 active:scale-95"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info List */}
            <div className="space-y-6 rounded-2xl border border-gold/25 bg-beige/30 p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burnt/10 text-burnt">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brown">Studio Location</p>
                  <p className="mt-1 text-xs text-brown/75">Master City, Gujranwala, Pakistan</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gold/15 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burnt/10 text-burnt">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brown">Phone / WhatsApp</p>
                  <p className="mt-1 text-xs text-brown/75">+92 324 2894377</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gold/15 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burnt/10 text-burnt">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brown">Email Inquiry</p>
                  <p className="mt-1 text-xs text-brown/75">meerdivineart@gmail.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 border-t border-gold/15 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-burnt/10 text-burnt">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-brown">Studio Hours</p>
                  <p className="mt-1 text-xs text-brown/75">Monday – Saturday: 10:00 AM – 7:00 PM (PKT)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-gold/30 bg-card p-6 sm:p-10 shadow-[var(--shadow-lift)]">
              <h3 className="font-display text-2xl text-brown">Send Us A Message</h3>
              <p className="mt-1 text-xs text-brown/70">
                Fill out the form below and our studio team will respond within 24 hours.
              </p>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-600" />
                  <h4 className="mt-3 font-display text-xl font-bold text-brown">Thank You!</h4>
                  <p className="mt-2 text-xs leading-relaxed text-brown/80">
                    Your message has been sent successfully. Our studio representative will contact you shortly.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-5 inline-flex items-center justify-center rounded-sm bg-brown px-6 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-ivory hover:bg-burnt"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-brown">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        value={formData.name}
                        onChange={(e) => {
                          setFormData({ ...formData, name: e.target.value });
                          if (errors.name) setErrors({ ...errors, name: "" });
                        }}
                        placeholder="e.g. Fatima Ali"
                        className={`mt-1.5 w-full rounded-sm border px-3.5 py-3 text-xs text-brown bg-ivory focus:outline-none focus:ring-1 focus:ring-gold ${
                          errors.name ? "border-red-500" : "border-gold/30"
                        }`}
                      />
                      {errors.name ? (
                        <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-600">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.name}</span>
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-brown">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: "" });
                        }}
                        placeholder="fatima@example.com"
                        className={`mt-1.5 w-full rounded-sm border px-3.5 py-3 text-xs text-brown bg-ivory focus:outline-none focus:ring-1 focus:ring-gold ${
                          errors.email ? "border-red-500" : "border-gold/30"
                        }`}
                      />
                      {errors.email ? (
                        <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-600">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-brown">
                        Phone Number (11 Digits) *
                      </label>
                      <input
                        type="text"
                        value={formData.phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        maxLength={11}
                        placeholder="03001234567"
                        className={`mt-1.5 w-full rounded-sm border px-3.5 py-3 text-xs text-brown bg-ivory focus:outline-none focus:ring-1 focus:ring-gold ${
                          errors.phone ? "border-red-500" : "border-gold/30"
                        }`}
                      />
                      {errors.phone ? (
                        <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-600">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.phone}</span>
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-brown">
                        Subject *
                      </label>
                      <input
                        type="text"
                        value={formData.subject}
                        onChange={(e) => {
                          setFormData({ ...formData, subject: e.target.value });
                          if (errors.subject) setErrors({ ...errors, subject: "" });
                        }}
                        placeholder="e.g. Custom Calligraphy Quote"
                        className={`mt-1.5 w-full rounded-sm border px-3.5 py-3 text-xs text-brown bg-ivory focus:outline-none focus:ring-1 focus:ring-gold ${
                          errors.subject ? "border-red-500" : "border-gold/30"
                        }`}
                      />
                      {errors.subject ? (
                        <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-600">
                          <AlertCircle className="h-3 w-3 shrink-0" />
                          <span>{errors.subject}</span>
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div>
                    <label className="block text-[0.7rem] font-bold uppercase tracking-wider text-brown">
                      Your Message *
                    </label>
                    <textarea
                      rows={5}
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: "" });
                      }}
                      placeholder="Tell us about your requirements, dimensions, or specific Quranic ayat preference..."
                      className={`mt-1.5 w-full rounded-sm border px-3.5 py-3 text-xs text-brown bg-ivory focus:outline-none focus:ring-1 focus:ring-gold ${
                        errors.message ? "border-red-500" : "border-gold/30"
                      }`}
                    />
                    {errors.message ? (
                      <p className="mt-1 flex items-center gap-1 text-[0.68rem] text-red-600">
                        <AlertCircle className="h-3 w-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-brown py-4 text-xs font-semibold uppercase tracking-[0.2em] text-ivory shadow transition-all hover:bg-burnt disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                    <span>{isSubmitting ? "Sending..." : "Submit Message"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="border-t border-gold/20 bg-card/60 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-5 sm:px-8">
          <SectionHeading
            eyebrow="Help Center"
            title="Frequently Asked Questions"
            subtitle="Find quick answers to common questions about custom framing, materials, and delivery."
          />
          <div className="mt-12">
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-xl border border-gold/25 bg-ivory px-6 shadow-sm"
                >
                  <AccordionTrigger className="font-display text-lg text-brown hover:text-burnt hover:no-underline py-4">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs leading-relaxed text-brown/75 pb-5">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </div>
  );
}
