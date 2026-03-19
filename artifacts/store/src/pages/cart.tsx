import { Link } from "wouter";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { SEO } from "@/components";
import { useCart, formatPrice } from "@/store";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, cartTotal } = useCart();

  if (items.length === 0) {
    return (
      <>
        <SEO title="Your Cart" />
        <div className="pt-32 pb-24 min-h-[70vh] flex flex-col items-center justify-center bg-background px-4">
          <div className="w-24 h-24 rounded-full bg-white/5 flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-muted-foreground" />
          </div>
          <h2 className="text-3xl font-display font-bold text-white mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8 text-center max-w-md">
            Looks like you haven't added anything to your cart yet. Discover our premium products and find what you need.
          </p>
          <Link href="/" className="px-8 py-4 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300">
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO title="Your Cart" />
      <div className="pt-32 pb-24 bg-background min-h-[80vh]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-display font-bold text-white mb-12">Shopping Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-8 space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 p-6 bg-card border border-white/5 rounded-2xl relative group">
                  <Link href={`/products/${item.id}`} className="block shrink-0">
                    <div className="w-full sm:w-32 aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10">
                      <img
                        src={item.imageUrl || "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80"; }}
                      />
                    </div>
                  </Link>

                  <div className="flex-1 flex flex-col justify-between">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-display font-semibold text-white mb-1">
                          <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">{item.name}</Link>
                        </h3>
                        <p className="text-sm text-muted-foreground">{item.category}</p>
                      </div>
                      <span className="text-lg font-bold text-white">{formatPrice(item.price * item.quantity)}</span>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 rounded-md transition-colors">
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-white">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-white hover:bg-white/10 rounded-md transition-colors">
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="p-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-lg transition-colors" title="Remove item">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="lg:col-span-4">
              <div className="bg-card border border-white/5 rounded-2xl p-8 sticky top-32 shadow-xl shadow-black/50">
                <h2 className="text-xl font-display font-bold text-white mb-6">Order Summary</h2>
                <div className="space-y-4 mb-6 text-sm text-muted-foreground">
                  {[
                    { label: "Subtotal", value: formatPrice(cartTotal) },
                    { label: "Shipping", value: "Free", highlight: true },
                    { label: "Taxes", value: "Calculated at checkout" },
                  ].map(({ label, value, highlight }) => (
                    <div key={label} className="flex justify-between">
                      <span>{label}</span>
                      <span className={highlight ? "text-emerald-400" : "text-white"}>{value}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/5 pt-6 mb-8 flex justify-between items-end">
                  <span className="text-lg font-medium text-white">Total</span>
                  <span className="text-3xl font-bold text-white">{formatPrice(cartTotal)}</span>
                </div>
                <button
                  onClick={() => alert("Checkout coming soon!")}
                  className="w-full py-4 rounded-xl font-bold bg-white text-black hover:bg-white/90 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_30px_-10px_rgba(255,255,255,0.2)] hover:scale-[1.02]"
                >
                  Proceed to Checkout <ArrowRight className="w-5 h-5" />
                </button>
                <p className="text-center text-xs text-muted-foreground mt-6">Secure encrypted checkout</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
