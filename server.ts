import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", message: "Thole Coffee Backend is active" });
  });

  app.get("/api/menu", (req, res) => {
    const menuItems = [
      { 
        id: '01', 
        name: 'KOPI TUBRUK', 
        price: 'Rp 5.000', 
        icon: 'Coffee', 
        desc: 'Classic robusta, ground fresh. Strong, bold, and unapologetically traditional.',
        image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1000&auto=format&fit=crop'
      },
      { 
        id: '02', 
        name: 'ES KOPI SUSU', 
        price: 'Rp 8.000', 
        icon: 'Droplets', 
        desc: 'Creamy sweetness on the go. Perfectly balanced palm sugar and fresh milk.',
        image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1000&auto=format&fit=crop'
      },
      { 
        id: '03', 
        name: 'BLACK NITRO', 
        price: 'Rp 10.000', 
        icon: 'Zap', 
        desc: 'Extra kick for your morning. Cold-brewed for 12 hours and nitrogen-infused.',
        image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=1000&auto=format&fit=crop'
      },
      { 
        id: '04', 
        name: 'TEH TARIK', 
        price: 'Rp 5.000', 
        icon: 'Wind', 
        desc: 'Frothy, smooth, comforting. Pulled to perfection for that silky texture.',
        image: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?q=80&w=1000&auto=format&fit=crop'
      },
    ];
    res.json(menuItems);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Serve static files in production
    app.use(express.static(path.resolve(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "dist", "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
