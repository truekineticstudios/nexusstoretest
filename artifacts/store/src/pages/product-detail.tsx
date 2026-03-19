import { useRoute, Link } from "wouter";
import { ShoppingCart, ArrowLeft, Check, Shield, Truck } from "lucide-react";
import { useGetProduct } from "@workspace/api-client-react";
import { SEO, Loader } from "@/components";
import { useCart, formatPrice } from "@/store";

export default function ProductDetail() {
  const [, params] = useRoute("/products/:id");
  const productId = parseInt(params?.id || "0");
  const { data: product, isLoading, error } = useGetProduct(productId);
  const { addToCart } = useCart();

  if (isLoading) return <div className="pt-32 pb-20"><Loader /></div>;

  if (error || !product) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-display font-bold text-white mb-4">Product Not Found</h2>
        <Link href="/" className="text-primary hover:underline">Return to Store</Link>
      </div>
    );
  }

  return (
    <>
      <SEO title={product.name} description={product.description} image={product.imageUrl} />

      <div className="pt-32 pb-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-white transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to products
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            <div className="relative group rounded-3xl overflow-hidden bg-card border border-white/5 aspect-square lg:aspect-auto lg:h-[600px]">
              <img
                src={product.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1200&q=80"; }}
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="mb-8">
                <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-semibold tracking-wide uppercase mb-6">
                  {product.category}
                </span>
                <h1 className="text-4xl lg:text-5xl font-display font-bold text-white leading-tight mb-4">{product.name}</h1>
                <div className="flex items-end gap-4 mb-6">
                  <span className="text-3xl font-bold text-white">{formatPrice(product.price)}</span>
                  {product.inStock ? (
                    <span className="flex items-center gap-1 text-sm font-medium text-emerald-400 mb-1"><Check className="w-4 h-4" /> In Stock</span>
                  ) : (
                    <span className="text-sm font-medium text-destructive mb-1">Out of Stock</span>
                  )}
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>
              </div>

              <div className="space-y-6 mb-10 pt-8 border-t border-white/5">
                {[
                  { Icon: Truck, title: "Free Worldwide Shipping", sub: "On all orders over $150" },
                  { Icon: Shield, title: "2 Year Warranty", sub: "Guarantee against manufacturing defects" },
                ].map(({ Icon, title, sub }) => (
                  <div key={title} className="flex items-center gap-4 text-muted-foreground">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center shrink-0">
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-medium">{title}</h4>
                      <p className="text-sm">{sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => product.inStock && addToCart(product)}
                disabled={!product.inStock}
                className="w-full py-5 rounded-xl font-bold text-lg bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {product.inStock ? (
                  <span className="flex items-center justify-center gap-2"><ShoppingCart className="w-5 h-5" /> Add to Cart</span>
                ) : "Out of Stock"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
