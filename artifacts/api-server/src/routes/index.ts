import { Router, type IRouter } from "express";
import {
  HealthCheckResponse,
  ListProductsResponse,
  GetProductParams,
  GetProductResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

// ─── Health ───────────────────────────────────────────────────────────────────

router.get("/healthz", (_req, res) => {
  res.json(HealthCheckResponse.parse({ status: "ok" }));
});

// ─── Products ─────────────────────────────────────────────────────────────────

const products = [
  { id: 1, name: "Wireless Noise-Cancelling Headphones", description: "Premium over-ear headphones with active noise cancellation, 30-hour battery life, and studio-quality sound. Perfect for travel, work, or immersive listening at home.", price: 249.99, imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80", category: "Audio", inStock: true },
  { id: 2, name: "Mechanical Gaming Keyboard", description: "Full-size mechanical keyboard with RGB backlighting, tactile switches, and a durable aluminum frame. Designed for gamers who demand precision and speed.", price: 129.99, imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80", category: "Peripherals", inStock: true },
  { id: 3, name: "Ultra-Wide Curved Monitor", description: "34-inch curved ultrawide display with 144Hz refresh rate, 1ms response time, and HDR10 support. Immerse yourself in every task and game.", price: 699.99, imageUrl: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=600&q=80", category: "Displays", inStock: true },
  { id: 4, name: "Smart Home Security Camera", description: "1080p HD security camera with night vision, two-way audio, motion alerts, and cloud storage. Keep an eye on your home from anywhere.", price: 79.99, imageUrl: "https://images.unsplash.com/photo-1590065707046-4837c6cce7b1?w=600&q=80", category: "Smart Home", inStock: false },
  { id: 5, name: "Ergonomic Office Chair", description: "Fully adjustable ergonomic chair with lumbar support, breathable mesh backrest, and 4D armrests. Built for all-day comfort and posture support.", price: 399.99, imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80", category: "Furniture", inStock: true },
  { id: 6, name: "Portable SSD — 1TB", description: "Ultra-fast portable solid state drive with USB-C 3.2 Gen 2 connection, 1050MB/s read speed, and a rugged shock-resistant case.", price: 109.99, imageUrl: "https://images.unsplash.com/photo-1597852074816-d933c7d2b988?w=600&q=80", category: "Storage", inStock: true },
  { id: 7, name: "Wireless Charging Pad", description: "15W fast wireless charging pad compatible with Qi-enabled devices. Slim, sleek design with LED indicator and foreign-object detection.", price: 39.99, imageUrl: "https://images.unsplash.com/photo-1585338107529-13afc5f02586?w=600&q=80", category: "Accessories", inStock: true },
  { id: 8, name: "Smart Watch Pro", description: "Advanced smartwatch with health monitoring, GPS, always-on display, and 7-day battery life. Water-resistant to 50 meters with customizable watch faces.", price: 329.99, imageUrl: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=600&q=80", category: "Wearables", inStock: true },
];

router.get("/products", (_req, res) => {
  res.json(ListProductsResponse.parse(products));
});

router.get("/products/:id", (req, res) => {
  const params = GetProductParams.parse({ id: parseInt(req.params.id, 10) });
  const product = products.find((p) => p.id === params.id);
  if (!product) { res.status(404).json({ error: "Product not found" }); return; }
  res.json(GetProductResponse.parse(product));
});

export default router;
