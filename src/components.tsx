import { useState } from "react";
import { Link } from "wouter";
import { ShoppingCart } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { Product } from "@workspace/api-client-react";
import { useCart, formatPrice } from "@/store";

// ─── SEO ──────────────────────────────────────────────────────────────────────

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export function SEO({
  title = "NEXUS | Premium Tech & Gear",
  description = "Discover the next generation of premium tech, gear, and digital lifestyle products. Sleek, minimal, and unmatched quality.",
  image = `${import.meta.env.BASE_URL}images/hero-bg.png`,
  url = "https://yourdomain.com",
}: SEOProps) {
  const siteTitle = title.includes("NEXUS") ? title : `${title} | NEXUS`;
  return (
    <Helmet>
      <title>{siteTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={siteTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={siteTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={image} />
    </Helmet>
  );
}

// ─── Loader ───────────────────────────────────────────────────────────────────

export function Loader() {
  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[400px]">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin" />
        <div className="absolute inset-2 rounded-full border-r-2 border-accent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
      </div>
      <p className="mt-4 text-muted-foreground font-medium animate-pulse">Loading amazing things...</p>
    </div>
  );
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);
  void isHovered;

  return (
    <div
      className="group relative flex flex-col bg-card rounded-2xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/15 hover:shadow-2xl hover:shadow-primary/5"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 rounded-full bg-background/80 backdrop-blur-md border border-white/10 text-xs font-medium text-white shadow-lg">
          {product.category}
        </span>
      </div>

      <Link href={`/products/${product.id}`} className="block relative aspect-[4/3] overflow-hidden bg-white/5">
        <img
          src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80"; }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>

      <div className="p-6 flex flex-col flex-1">
        <Link href={`/products/${product.id}`} className="block mb-2">
          <h3 className="font-display font-semibold text-lg text-white group-hover:text-primary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-6 flex-1">{product.description}</p>

        <div className="flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl text-white">{formatPrice(product.price)}</span>
            {!product.inStock && <span className="text-xs text-destructive mt-1">Out of Stock</span>}
          </div>
          <button
            onClick={(e) => { e.preventDefault(); if (product.inStock) addToCart(product); }}
            disabled={!product.inStock}
            className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/5 border border-white/10 text-white transition-all duration-300 hover:bg-primary hover:border-primary hover:shadow-lg hover:shadow-primary/25 disabled:opacity-50 disabled:cursor-not-allowed group-hover:w-auto group-hover:px-6"
          >
            <ShoppingCart className="w-5 h-5 group-hover:mr-2 transition-all" />
            <span className="hidden group-hover:block whitespace-nowrap text-sm font-semibold">Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
}
