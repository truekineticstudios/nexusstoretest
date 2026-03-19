import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Sparkles } from "lucide-react";
import { useListProducts } from "@workspace/api-client-react";
import { SEO, ProductCard, Loader } from "@/components";

export default function Home() {
  const { data: products, isLoading, error } = useListProducts();

  return (
    <>
      <SEO />

      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-background z-[-2]" />
        <div className="absolute inset-0 z-[-1] opacity-60">
          <img src={`${import.meta.env.BASE_URL}images/hero-bg.png`} alt="Abstract Background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/60 to-background" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary mb-8 backdrop-blur-md">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm font-semibold tracking-wide uppercase">New Collection Live</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-extrabold text-white leading-[1.1] mb-6">
              Elevate Your <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Digital Lifestyle</span>
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl leading-relaxed">
              Discover our curated selection of premium gear designed for modern creators, developers, and minimalists.
              Uncompromising quality meets striking design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
                className="px-8 py-4 rounded-xl font-semibold bg-white text-black hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_0_40px_-10px_rgba(255,255,255,0.3)] hover:scale-[1.02]"
              >
                Shop Now <ArrowRight className="w-5 h-5" />
              </button>
              <Link href="/contact" className="px-8 py-4 rounded-xl font-semibold bg-white/5 text-white border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 flex items-center justify-center">
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="products" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Featured Products</h2>
              <p className="text-muted-foreground max-w-xl">Our most sought-after items, precision-engineered for excellence.</p>
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : error ? (
            <div className="w-full p-12 rounded-2xl border border-destructive/20 bg-destructive/5 text-center">
              <h3 className="text-xl font-bold text-white mb-2">Unable to load products</h3>
              <p className="text-muted-foreground mb-6">There was an error fetching the product catalog.</p>
              <button onClick={() => window.location.reload()} className="px-6 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors">
                Try Again
              </button>
            </div>
          ) : products?.length === 0 ? (
            <div className="text-center py-20 border border-white/5 rounded-2xl bg-card">
              <h3 className="text-xl font-bold text-white mb-2">No products found</h3>
              <p className="text-muted-foreground">Check back later for new arrivals.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products?.map((product, i) => (
                <motion.div key={product.id} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <ProductCard product={product} />
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
