import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import {
  LayoutDashboard,
  Package,
  FolderTree,
  ShoppingBag,
  BarChart3,
  LogOut,
  Menu,
  X,
  ShieldCheck,
  Store,
} from "lucide-react";
import { api, getAdminToken } from "@/services/api";
import { Toaster } from "sonner";

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  action?: ReactNode;
}

export function AdminLayout({
  children,
  title,
  subtitle,
  action,
}: AdminLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [adminEmail, setAdminEmail] = useState<string>("admin@meerdivineart.com");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = getAdminToken();
    if (!token) {
      navigate({ to: "/admin/login" });
      return;
    }

    api
      .getProfile()
      .then((res) => {
        if (res.success && res.data) {
          setAdminEmail(res.data.email);
        }
      })
      .catch(() => {
        api.logout();
        navigate({ to: "/admin/login" });
      })
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ivory">
        <div className="flex flex-col items-center gap-3 text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-brown border-t-transparent" />
          <p className="font-display text-lg text-brown">Loading Admin Studio…</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
    { label: "Products", href: "/admin/products", icon: Package },
    { label: "Categories", href: "/admin/categories", icon: FolderTree },
    { label: "Orders", href: "/admin/orders", icon: ShoppingBag },
    { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  ];

  return (
    <div className="flex min-h-screen bg-beige/30 text-brown font-sans">
      <Toaster position="top-right" richColors />

      {/* Sidebar Desktop */}
      <aside className="hidden w-64 shrink-0 flex-col border-r border-gold/25 bg-ivory shadow-[var(--shadow-soft)] lg:flex">
        <div className="flex h-20 items-center justify-between border-b border-gold/25 px-6">
          <Link to="/admin" className="block">
            <span className="block font-display text-xl leading-none tracking-[0.18em] text-brown">
              MEER
            </span>
            <span className="block text-[0.55rem] uppercase tracking-[0.42em] text-burnt font-semibold">
              Admin Studio
            </span>
          </Link>
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sand/60 text-brown text-xs" title="Single Admin Verified">
            <ShieldCheck className="h-3.5 w-3.5 text-burnt" />
          </span>
        </div>

        <nav className="flex-1 space-y-1.5 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.exact
              ? location.pathname === item.href
              : location.pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                to={item.href as any}
                className={`flex items-center gap-3.5 rounded-none px-4 py-3 text-[0.7rem] font-semibold uppercase tracking-[0.18em] transition-all duration-200 ${
                  isActive
                    ? "bg-brown text-ivory shadow-sm"
                    : "text-brown/80 hover:bg-sand/40 hover:text-burnt"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-gold" : "text-burnt/70"}`} strokeWidth={1.5} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-gold/25 p-4 space-y-3">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center gap-2 w-full border border-brown/30 bg-card py-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-brown hover:bg-sand/40 transition-colors"
          >
            <Store className="h-3.5 w-3.5 text-burnt" />
            View Live Site
          </a>

          <div className="flex items-center justify-between pt-2 text-xs text-brown/60 border-t border-gold/15">
            <span className="truncate max-w-[130px] font-medium" title={adminEmail}>
              {adminEmail}
            </span>
            <button
              onClick={() => {
                api.logout();
                navigate({ to: "/admin/login" });
              }}
              title="Logout"
              className="text-brown hover:text-burnt transition-colors p-1"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "" : "pointer-events-none"
        }`}
      >
        <div
          onClick={() => setSidebarOpen(false)}
          className={`absolute inset-0 bg-charcoal/45 transition-opacity duration-300 ${
            sidebarOpen ? "opacity-100" : "opacity-0"
          }`}
        />
        <aside
          className={`absolute inset-y-0 left-0 w-72 bg-ivory shadow-[var(--shadow-lift)] transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between border-b border-gold/25 px-5 py-4">
            <span className="font-display text-lg tracking-[0.18em] text-brown">
              MEER ADMIN
            </span>
            <button onClick={() => setSidebarOpen(false)} className="text-brown">
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = item.exact
                ? location.pathname === item.href
                : location.pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href as any}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs font-semibold uppercase tracking-[0.18em] ${
                    isActive ? "bg-brown text-ivory" : "text-brown hover:bg-sand/40"
                  }`}
                >
                  <Icon className="h-4 w-4 text-gold" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </aside>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-x-hidden">
        {/* Top Header */}
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-gold/25 bg-ivory/95 px-5 backdrop-blur sm:px-8">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="text-brown lg:hidden"
            >
              <Menu className="h-6 w-6" />
            </button>
            <div>
              <h1 className="font-display text-2xl leading-none text-brown sm:text-3xl">
                {title}
              </h1>
              {subtitle ? (
                <p className="mt-1 text-xs text-brown/65">{subtitle}</p>
              ) : null}
            </div>
          </div>
          {action ? <div>{action}</div> : null}
        </header>

        <main className="flex-1 p-5 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
