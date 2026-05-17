"use client";
import { useState } from "react";
import "./globals.css";

const WHATSAPP_NUMBER = "573107518438";
const isOpen = () => {
  const hour = new Date().getHours();
  return hour >= 17 && hour < 22;
};

const products = [
  {
    id: 1,
    category: "postres",
    name: "Cremosa Leche en Polvo",
    description: "Postre artesanal cremoso con toque de leche en polvo. Recién hecho para ti.",
    price: 8000,
    emoji: "🍮",
    image: "/images/leche-polvo.jpg",
    badge: "Favorito",
    badgeColor: "#F39C12",
  },
  {
    id: 2,
    category: "postres",
    name: "Frutos Rojos Irresistibles",
    description: "Postre con salsa de frutos rojos frescos. Una explosión de sabor en cada porción.",
    price: 8000,
    emoji: "🍓",
    image: "/images/frutos-rojos.jpg",
    badge: "Más pedido",
    badgeColor: "#E74C3C",
  },
  {
    id: 3,
    category: "postres",
    name: "Clásica Oreo",
    description: "El clásico que nunca falla. Base cremosa con cobertura de Oreo triturada.",
    price: 8000,
    emoji: "🍪",
    image: "/images/oreo.jpg",
    badge: null,
    badgeColor: null,
  },
  {
    id: 4,
    category: "postres",
    name: "Exótico Maracuyá",
    description: "Sabor tropical intenso con maracuyá fresco. La porción perfecta para tu antojo.",
    price: 8000,
    emoji: "🌟",
    image: "/images/maracuya.jpg",
    badge: "Nuevo",
    badgeColor: "#27AE60",
  },
  {
    id: 5,
    category: "deditos",
    name: "Bandeja de Deditos",
    description: "Deditos crujientes y dorados, perfectos para compartir.",
    price: 0,
    emoji: "🍟",
    image: null,
    badge: "Próximamente",
    badgeColor: "#95A5A6",
  },
  {
    id: 6,
    category: "carnes",
    name: "Carnes al Barril",
    description: "Carnes jugosas preparadas al barril con sazón cartagenera.",
    price: 0,
    emoji: "🥩",
    image: null,
    badge: "Próximamente",
    badgeColor: "#95A5A6",
  },
];

type CartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  emoji: string;
};

const categories = [
  { id: "todos", label: "Todo" },
  { id: "postres", label: "🍮 Postres" },
  { id: "deditos", label: "🍟 Deditos" },
  { id: "carnes", label: "🥩 Carnes" },
];

const whyUs = [
  { icon: "🍽️", title: "Recién Hecho", desc: "Todo preparado al momento de tu pedido" },
  { icon: "🛵", title: "A Domicilio", desc: "Entregamos en Cartagena rápido y seguro" },
  { icon: "💳", title: "Fácil Pago", desc: "Efectivo o pago digital con Bold" },
  { icon: "❤️", title: "Con Amor", desc: "Postres artesanales hechos con dedicación" },
];

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState("todos");
  const [showCart, setShowCart] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [payMethod, setPayMethod] = useState("efectivo");

  const filtered =
    activeCategory === "todos"
      ? products
      : products.filter((p) => p.category === activeCategory);

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const cartCount = cart.reduce((sum, i) => sum + i.qty, 0);

  const addToCart = (product: (typeof products)[0]) => {
    if (product.price === 0) return;
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          qty: 1,
          emoji: product.emoji,
        },
      ];
    });
  };

  const removeFromCart = (id: number) =>
    setCart((prev) => prev.filter((i) => i.id !== id));

  const updateQty = (id: number, qty: number) => {
    if (qty <= 0) return removeFromCart(id);
    setCart((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  };

const sendWhatsApp = () => {
  if (!name || !address)
    return alert("Por favor ingresa tu nombre y dirección.");
  
  const items = cart
    .map(
      (i) =>
        `  • ${i.emoji} ${i.name} x${i.qty} = $${(i.price * i.qty).toLocaleString("es-CO")}`
    )
    .join("\n");
  
  const msg =
    `🛵 *NUEVO PEDIDO - ANTOJO CTG* 🛵\n\n` +
    `👤 *Cliente:* ${name}\n` +
    `📍 *Dirección:* ${address}` +
    `${notes ? `\n📝 *Notas:* ${notes}` : ""}\n` +
    `💳 *Pago:* ${payMethod === "efectivo" ? "Efectivo" : "Bold (digital)"}\n\n` +
    `🧾 *Detalle del pedido:*\n${items}\n\n` +
    `💰 *TOTAL: $${total.toLocaleString("es-CO")}*\n\n` +
    `¡Gracias por tu pedido! 🙌`;

  if (payMethod === "bold") {
    window.open("https://checkout.bold.co/payment/LNK_EMZU6WEN6T", "_blank");
    setTimeout(() => {
      window.location.href = `https://wa.me/573107518438?text=${encodeURIComponent(msg)}`;
    }, 1500);
  } else {
    window.location.href = `https://wa.me/573107518438?text=${encodeURIComponent(msg)}`;
  }
};

  return (
    <div>
      {/* ── HEADER ── */}
      {isOpen() ? (
  <div style={{ background: "#27AE60", color: "white", textAlign: "center", padding: "8px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
    🟢 ¡Estamos abiertos! Pedidos hasta las 10pm
  </div>
) : (
  <div style={{ background: "#E74C3C", color: "white", textAlign: "center", padding: "8px", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>
    🔴 Cerrado ahora · Abrimos hoy a las 5pm
  </div>
)}
      <header className="site-header">
        <div>
          <div className="hero-title" style={{ fontSize: 24, fontWeight: 900, color: "#C0392B", lineHeight: 1 }}>
            Antojo CTG
          </div>
          <div style={{ fontSize: 11, color: "#7D5A3C", letterSpacing: 2, textTransform: "uppercase" }}>
            Cartagena · Pedidos a domicilio
          </div>
        </div>
        <button
          className="btn-primary"
          onClick={() => setShowCart(true)}
          style={{ position: "relative", padding: "10px 20px" }}
        >
          🛒 Mi pedido
          {cartCount > 0 && (
            <span style={{ position: "absolute", top: -6, right: -6, background: "#F39C12", color: "white", borderRadius: "50%", width: 22, height: 22, fontSize: 12, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
              {cartCount}
            </span>
          )}
        </button>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div style={{ position: "relative", maxWidth: 600, margin: "0 auto" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🍮🍓🍟🥩</div>
          <h1 className="hero-title" style={{ fontSize: "clamp(32px, 6vw, 56px)", fontWeight: 900, color: "white", lineHeight: 1.1, marginBottom: 16 }}>
            ¡Deliciosos antojos,<br />directo a tu puerta!
          </h1>
          <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", marginBottom: 28, lineHeight: 1.6 }}>
            Postres artesanales recién hechos y más.<br />
            Pedidos a domicilio en Cartagena. 🛵
          </p>
          <button
            className="btn-outline"
            onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
          >
            Ver menú completo ↓
          </button>
        </div>
      </section>

      {/* ── MENU ── */}
      <section id="menu" className="menu-section">
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <h2 className="hero-title" style={{ fontSize: 36, fontWeight: 900, color: "#2A1A0E", marginBottom: 8 }}>
            Nuestro Menú
          </h2>
          <p style={{ color: "#7D5A3C", fontSize: 15 }}>Todo hecho con amor en Cartagena 🌴</p>
        </div>

        {/* Category filter */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center", marginBottom: 32 }}>
          {categories.map((c) => (
            <button
              key={c.id}
              className={`cat-btn ${activeCategory === c.id ? "active" : ""}`}
              onClick={() => setActiveCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {/* Products grid */}
        <div className="products-grid">
          {filtered.map((product) => (
            <div key={product.id} className="card">
              <div className="product-img" style={{ 
  background: product.price === 0 ? "#F5F5F5" : "linear-gradient(135deg,#FDF0E0,#FAE0C0)",
  padding: 0,
  fontSize: product.image ? 0 : 72
}}>
  {product.image ? (
    <img 
      src={product.image} 
      alt={product.name} 
      style={{ width: "100%", height: "200px", objectFit: "cover", display: "block" }} 
    />
  ) : (
    <span>{product.emoji}</span>
  )}
  {product.badge && (
    <span className="badge" style={{ position: "absolute", top: 12, right: 12, background: product.badgeColor ?? "#999", color: "white" }}>
      {product.badge}
    </span>
  )}
</div>
              <div style={{ padding: "20px" }}>
                <h3 className="hero-title" style={{ fontSize: 17, fontWeight: 700, marginBottom: 6, color: "#2A1A0E" }}>
                  {product.name}
                </h3>
                <p style={{ fontSize: 13, color: "#7D5A3C", lineHeight: 1.5, marginBottom: 16 }}>
                  {product.description}
                </p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: "#C0392B" }}>
                    {product.price === 0 ? "Próximo" : `$${product.price.toLocaleString("es-CO")}`}
                  </span>
                  <button
                    className="btn-primary"
                    onClick={() => addToCart(product)}
                    disabled={product.price === 0}
                    style={{ padding: "8px 18px", fontSize: 13 }}
                  >
                    {product.price === 0 ? "Próximamente" : "Pedir"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── WHY US ── */}
      <section className="why-us">
        <h2 className="hero-title" style={{ fontSize: 32, color: "#F39C12", marginBottom: 32 }}>
          ¿Por qué elegirnos?
        </h2>
        <div className="why-us-grid">
          {whyUs.map((item, i) => (
            <div key={i} className="why-card">
              <div style={{ fontSize: 36, marginBottom: 10 }}>{item.icon}</div>
              <div style={{ fontWeight: 700, color: "white", marginBottom: 6, fontSize: 15 }}>{item.title}</div>
              <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div style={{ marginBottom: 8, fontSize: 20 }}>
          🌴 <strong style={{ color: "#F39C12" }}>Antojo CTG</strong> 🌴
        </div>
        <div>Cartagena de Indias · Colombia</div>
        <div style={{ marginTop: 4 }}>© 2026 Antojo CTG — Todos los derechos reservados</div>
      </footer>

      {/* ── CART PANEL ── */}
      {showCart && (
        <div
          className="overlay"
          onClick={(e) => e.target === e.currentTarget && setShowCart(false)}
        >
          <div className="cart-panel">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h2 className="hero-title" style={{ fontSize: 24, fontWeight: 900, color: "#2A1A0E" }}>
                🛒 Mi Pedido
              </h2>
              <button
                onClick={() => setShowCart(false)}
                style={{ background: "none", border: "none", fontSize: 24, cursor: "pointer", color: "#7D5A3C" }}
              >
                ✕
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={{ textAlign: "center", padding: "40px 0", color: "#7D5A3C" }}>
                <div style={{ fontSize: 48, marginBottom: 12 }}>🍽️</div>
                <p>Tu pedido está vacío.<br />¡Agrega algo delicioso!</p>
              </div>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <span style={{ fontSize: 28 }}>{item.emoji}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: "#2A1A0E" }}>{item.name}</div>
                      <div style={{ color: "#C0392B", fontWeight: 700, fontSize: 13 }}>
                        ${(item.price * item.qty).toLocaleString("es-CO")}
                      </div>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty - 1)}>−</button>
                      <span style={{ fontWeight: 700, minWidth: 20, textAlign: "center" }}>{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                    </div>
                  </div>
                ))}

                <div className="form-section">
                  <div style={{ fontWeight: 700, color: "#2A1A0E", marginBottom: 12, fontSize: 15 }}>
                    📋 Datos de entrega
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <input placeholder="Tu nombre *" value={name} onChange={(e) => setName(e.target.value)} />
                    <input placeholder="Dirección de entrega *" value={address} onChange={(e) => setAddress(e.target.value)} />
                    <textarea
                      placeholder="Notas (opcional)"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      rows={2}
                      style={{ resize: "none" }}
                    />
                    <select value={payMethod} onChange={(e) => setPayMethod(e.target.value)}>
                      <option value="efectivo">💵 Efectivo</option>
                      <option value="bold">💳 Bold (pago digital)</option>
                    </select>
                  </div>
                </div>

                <div className="cart-total-row">
                  <span style={{ fontWeight: 700, color: "#2A1A0E", fontSize: 16 }}>Total:</span>
                  <span style={{ fontWeight: 900, color: "#C0392B", fontSize: 22 }}>
                    ${total.toLocaleString("es-CO")}
                  </span>
                </div>

                <button
                  className="btn-primary"
                  onClick={sendWhatsApp}
                  style={{ width: "100%", padding: "16px", fontSize: 16, borderRadius: 14 }}
                >
                  📲 Enviar pedido por WhatsApp
                </button>
                <p style={{ textAlign: "center", fontSize: 12, color: "#7D5A3C" }}>
                  Te redirigiremos a WhatsApp con todos los detalles de tu pedido
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}