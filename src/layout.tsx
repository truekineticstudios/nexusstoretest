import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingBag, Menu, X } from "lucide-react";
import { DiscIcon as Discord, Twitter, Github } from "lucide-react";
import { useCart } from "@/store";
import { cn } from "@/store";

// ─── Navbar ───────────────────────────────────────────────────────────────────

function Navbar() {
  const [location] = useLocation();
  const { cartCount } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Products" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className={cn("fixed top-0 w-full z-50 transition-all duration-300", isScrolled ? "glass py-3" : "bg-transparent py-5")}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-8 h-8 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center border border-primary/30 group-hover:border-primary/60 transition-colors">
              <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xl tracking-wider text-white">NEXUS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={cn("text-sm font-medium transition-colors hover:text-primary", location === link.href ? "text-primary" : "text-muted-foreground")}>
                {link.label}
              </Link>
            ))}
            <Link href="/cart" className="relative p-2 text-muted-foreground hover:text-white transition-colors">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          <div className="flex items-center gap-4 md:hidden">
            <Link href="/cart" className="relative p-2 text-muted-foreground">
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-muted-foreground hover:text-white transition-colors focus:outline-none">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full glass-card border-x-0 border-t-0 animate-in slide-in-from-top-2">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setIsMobileMenuOpen(false)}
                className={cn("px-4 py-3 rounded-xl text-base font-medium transition-colors",
                  location === link.href ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-white/5 hover:text-white")}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

// ─── Footer ───────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background pt-16 pb-8 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg overflow-hidden bg-primary/20 flex items-center justify-center border border-primary/30">
                <img src={`${import.meta.env.BASE_URL}images/logo.png`} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <span className="font-display font-bold text-xl tracking-wider text-white">NEXUS</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              The next generation of premium tech and digital lifestyle products. Minimalism meets exceptional quality.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Store</h4>
            <ul className="space-y-4">
              <li><Link href="/" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link href="/cart" className="text-muted-foreground hover:text-primary transition-colors">Your Cart</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-6">Legal</h4>
            <ul className="space-y-4">
              <li><a href="/sitemap.xml" className="text-muted-foreground hover:text-primary transition-colors">Sitemap</a></li>
              <li><a href="/robots.txt" className="text-muted-foreground hover:text-primary transition-colors">Robots.txt</a></li>
              <li><span className="text-muted-foreground cursor-not-allowed">Privacy Policy</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NEXUS Store. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {[Twitter, Discord, Github].map((Icon, i) => (
              <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-muted-foreground hover:bg-primary/20 hover:text-primary transition-all">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col relative selection:bg-primary/30 selection:text-white">
      <Navbar />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </div>
  );
}
