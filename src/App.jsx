import { useState, useEffect } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  THE ZODIAC LIBRARY — Star Guides & Astrology               ║
 ║  Design: Nocturnal palette + Glass cards + Constellations    ║
 ╚══════════════════════════════════════════════════════════════╝
*/

const SIGNS = [
  { id: 1, name: "Aries", subtitle: "The Warrior", price: 4.99, symbol: "♈", tier: "Fire", dates: "Mar 21 – Apr 19",
    desc: "The ram charges forward where others hesitate. An in-depth guide to the Aries personality — your strengths, your shadows, your relationships, and the fire that drives everything you do.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 2, name: "Taurus", subtitle: "The Anchor", price: 4.99, symbol: "♉", tier: "Earth", dates: "Apr 20 – May 20",
    desc: "The bull knows what it wants and will not be rushed. An in-depth guide to the Taurus personality — your loyalty, your stubbornness, your deep need for beauty and security.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 3, name: "Gemini", subtitle: "The Mirror", price: 4.99, symbol: "♊", tier: "Air", dates: "May 21 – Jun 20",
    desc: "The twins live in two worlds at once. An in-depth guide to the Gemini personality — your curiosity, your restlessness, your gift for connection and your fear of being pinned down.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 4, name: "Cancer", subtitle: "The Guardian", price: 4.99, symbol: "♋", tier: "Water", dates: "Jun 21 – Jul 22",
    desc: "The crab carries its home on its back. An in-depth guide to the Cancer personality — your fierce protectiveness, your emotional depth, and the soft heart you guard so carefully.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 5, name: "Leo", subtitle: "The Sovereign", price: 4.99, symbol: "♌", tier: "Fire", dates: "Jul 23 – Aug 22",
    desc: "The lion does not dim its light for anyone. An in-depth guide to the Leo personality — your warmth, your pride, your generosity, and the need to be seen that runs deeper than ego.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 6, name: "Virgo", subtitle: "The Alchemist", price: 4.99, symbol: "♍", tier: "Earth", dates: "Aug 23 – Sep 22",
    desc: "The maiden sees every flaw — especially her own. An in-depth guide to the Virgo personality — your precision, your devotion, your quiet service, and the inner critic you need to tame.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 7, name: "Libra", subtitle: "The Diplomat", price: 4.99, symbol: "♎", tier: "Air", dates: "Sep 23 – Oct 22",
    desc: "The scales seek balance in all things — and sometimes lose themselves in the search. An in-depth guide to the Libra personality — your grace, your indecision, and your deep hunger for harmony.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 8, name: "Scorpio", subtitle: "The Mystic", price: 4.99, symbol: "♏", tier: "Water", dates: "Oct 23 – Nov 21",
    desc: "The scorpion transforms through fire and emerges reborn. An in-depth guide to the Scorpio personality — your intensity, your loyalty, your secrets, and the depth most people will never understand.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 9, name: "Sagittarius", subtitle: "The Seeker", price: 4.99, symbol: "♐", tier: "Fire", dates: "Nov 22 – Dec 21",
    desc: "The archer aims at the horizon and runs toward it. An in-depth guide to the Sagittarius personality — your freedom, your honesty, your restless search for meaning and your fear of being caged.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 10, name: "Capricorn", subtitle: "The Architect", price: 4.99, symbol: "♑", tier: "Earth", dates: "Dec 22 – Jan 19",
    desc: "The sea-goat climbs the mountain no matter how long it takes. An in-depth guide to the Capricorn personality — your ambition, your discipline, your hidden tenderness, and the walls you build.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 11, name: "Aquarius", subtitle: "The Visionary", price: 4.99, symbol: "♒", tier: "Air", dates: "Jan 20 – Feb 18",
    desc: "The water bearer pours for the collective, not the self. An in-depth guide to the Aquarius personality — your vision, your detachment, your quiet rebellion, and the loneliness of seeing what others don't.",
    payhipId: "XXXXX", pages: "Coming soon" },
  { id: 12, name: "Pisces", subtitle: "The Dreamer", price: 4.99, symbol: "♓", tier: "Water", dates: "Feb 19 – Mar 20",
    desc: "The fish swims in two directions — one toward the world, one toward the dream. An in-depth guide to the Pisces personality — your empathy, your imagination, your boundaries (or lack of them), and the magic you carry without trying.",
    payhipId: "XXXXX", pages: "Coming soon" },
];

const ELEMENT_COLORS = {
  Fire:  { primary: "#D4844A", glow: "rgba(212,132,74,0.12)", border: "rgba(212,132,74,0.25)", bg: "rgba(212,132,74,0.04)" },
  Earth: { primary: "#8A9F6A", glow: "rgba(138,159,106,0.12)", border: "rgba(138,159,106,0.25)", bg: "rgba(138,159,106,0.04)" },
  Air:   { primary: "#9A9DB8", glow: "rgba(154,157,184,0.12)", border: "rgba(154,157,184,0.25)", bg: "rgba(154,157,184,0.04)" },
  Water: { primary: "#6A9AB8", glow: "rgba(106,154,184,0.12)", border: "rgba(106,154,184,0.25)", bg: "rgba(106,154,184,0.04)" },
};

const TIERS = ["All", "Fire", "Earth", "Air", "Water"];

// Colors from the mood board
const C = {
  bg: "#0D0E12",
  bgCard: "#1A1D25",
  bronze: "#B87333",
  star: "#F1E5AC",
  silver: "#C0C0C0",
  silverMuted: "#8A8D94",
  silverDim: "#5A5D64",
  text: "#D0CEC8",
  textMuted: "#8A8D94",
  textDim: "#4A4D54",
  glass: "rgba(26,29,37,0.65)",
  glassBorder: "rgba(241,229,172,0.08)",
  glassHover: "rgba(26,29,37,0.80)",
  glassHoverBorder: "rgba(241,229,172,0.18)",
};

export default function App() {
  const [hoveredId, setHoveredId] = useState(null);
  const [filter, setFilter] = useState("All");
  const [toast, setToast] = useState({ msg: "", show: false });
  const [payhipReady, setPayhipReady] = useState(false);

  useEffect(() => {
    const check = () => {
      if (window.Payhip) setPayhipReady(true);
      else setTimeout(check, 300);
    };
    check();
  }, []);

  const showToast = (msg) => {
    setToast({ msg, show: true });
    setTimeout(() => setToast(p => ({ ...p, show: false })), 2800);
  };

  const handleBuy = (sign) => {
    if (sign.payhipId === "XXXXX") {
      showToast("Coming soon — this guide is being written in the stars");
      return;
    }
  };

  const filtered = SIGNS.filter(s => filter === "All" || s.tier === filter);

  return (
    <div style={{
      minHeight: "100vh",
      background: C.bg,
      color: C.text,
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel+Decorative:wght@400;700&family=Cinzel:wght@400;500;600;700&family=Fira+Code:wght@300;400&display=swap" rel="stylesheet" />

      {/* Constellation SVG background pattern */}
      <svg style={{ position: "fixed", inset: 0, zIndex: 0, width: "100%", height: "100%", opacity: 0.06 }}>
        <defs>
          <pattern id="constellation" x="0" y="0" width="400" height="400" patternUnits="userSpaceOnUse">
            {/* Dots */}
            <circle cx="50" cy="80" r="1.5" fill="#F1E5AC" />
            <circle cx="120" cy="40" r="1" fill="#C0C0C0" />
            <circle cx="180" cy="120" r="1.5" fill="#F1E5AC" />
            <circle cx="280" cy="60" r="1" fill="#C0C0C0" />
            <circle cx="320" cy="160" r="1.5" fill="#F1E5AC" />
            <circle cx="60" cy="200" r="1" fill="#C0C0C0" />
            <circle cx="200" cy="280" r="1.5" fill="#F1E5AC" />
            <circle cx="340" cy="300" r="1" fill="#C0C0C0" />
            <circle cx="100" cy="340" r="1.5" fill="#B87333" />
            <circle cx="250" cy="180" r="1" fill="#C0C0C0" />
            <circle cx="380" cy="380" r="1" fill="#F1E5AC" />
            <circle cx="150" cy="370" r="1.5" fill="#C0C0C0" />
            {/* Lines connecting some dots */}
            <line x1="50" y1="80" x2="120" y2="40" stroke="#F1E5AC" strokeWidth="0.5" />
            <line x1="120" y1="40" x2="180" y2="120" stroke="#F1E5AC" strokeWidth="0.5" />
            <line x1="180" y1="120" x2="250" y2="180" stroke="#C0C0C0" strokeWidth="0.3" />
            <line x1="280" y1="60" x2="320" y2="160" stroke="#C0C0C0" strokeWidth="0.3" />
            <line x1="60" y1="200" x2="100" y2="340" stroke="#B87333" strokeWidth="0.3" />
            <line x1="200" y1="280" x2="340" y2="300" stroke="#F1E5AC" strokeWidth="0.3" />
            <line x1="340" y1="300" x2="380" y2="380" stroke="#C0C0C0" strokeWidth="0.3" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#constellation)" />
      </svg>

      {/* Radial glows */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 60% 40% at 50% 0%, rgba(184,115,51,0.06) 0%, transparent 60%),
          radial-gradient(ellipse 50% 50% at 20% 80%, rgba(106,154,184,0.04) 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 80% 50%, rgba(241,229,172,0.03) 0%, transparent 50%)
        `,
      }} />

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%",
        transform: `translateX(-50%) translateY(${toast.show ? 0 : 16}px)`,
        background: C.star, color: C.bg, padding: "10px 28px",
        borderRadius: 4, fontSize: 13, fontFamily: "'Fira Code', monospace",
        opacity: toast.show ? 1 : 0, transition: "all 0.3s ease",
        zIndex: 1000, pointerEvents: "none",
      }}>
        {toast.msg}
      </div>

      <div style={{ position: "relative", zIndex: 2 }}>

        {/* Header */}
        <header style={{
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "18px 32px",
          borderBottom: `1px solid ${C.glassBorder}`,
          position: "sticky", top: 0, zIndex: 100,
          background: "rgba(13,14,18,0.88)",
          backdropFilter: "blur(16px)",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cinzel Decorative', 'Cinzel', serif", fontSize: 18, fontWeight: 400,
              color: C.star, letterSpacing: 4, textTransform: "uppercase",
            }}>The Zodiac Library</div>
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: 9,
              color: C.silverMuted, letterSpacing: 2, marginTop: 3,
              textTransform: "uppercase",
            }}>
              ☽ · Star Guides & Astrology · ☾
            </div>
          </div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 9,
            color: C.silverDim, display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 5, height: 5, borderRadius: "50%",
              background: payhipReady ? "#6A9F6A" : C.bronze,
              display: "inline-block",
              boxShadow: payhipReady ? "0 0 8px rgba(106,159,106,0.4)" : "none",
            }} />
            {payhipReady ? "Shop open" : "Loading..."}
          </div>
        </header>

        {/* Hero */}
        <div style={{
          backgroundImage: "url('/hero-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
        }}>
          <div style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0,
            background: `linear-gradient(180deg, ${C.bg}cc 0%, ${C.bg}99 30%, ${C.bg}bb 60%, ${C.bg} 100%)`,
          }} />
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", padding: "80px 0 56px" }}>
              {/* Moon phases */}
              <div style={{
                fontSize: 16, color: C.bronze, letterSpacing: 18,
                marginBottom: 32, opacity: 0.7,
              }}>
                ● ◐ ○ ◑ ●
              </div>

              <h1 style={{
                fontFamily: "'Cinzel Decorative', 'Cinzel', serif",
                fontSize: "clamp(26px, 4.5vw, 42px)",
                fontWeight: 400, color: C.star,
                letterSpacing: 6, textTransform: "uppercase",
                margin: 0, lineHeight: 1.5,
                textShadow: "0 0 60px rgba(241,229,172,0.15)",
              }}>
                Guides Written<br />in the Stars
              </h1>

              <div style={{
                width: 80, height: 1,
                background: `linear-gradient(90deg, transparent, ${C.bronze}, transparent)`,
                margin: "28px auto",
              }} />

              <p style={{
                color: C.silver, maxWidth: 460, margin: "0 auto",
                fontSize: 17, lineHeight: 2,
                fontStyle: "italic", fontWeight: 300,
                letterSpacing: 0.5,
              }}>
                Twelve signs. Twelve worlds. Each guide goes deeper than a horoscope —
                into your strengths, your shadows, and the patterns written in your chart.
              </p>

              <p style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 10, color: C.silverDim, marginTop: 28,
                letterSpacing: 2, textTransform: "uppercase",
              }}>
                Downloadable PDF guides · Instant delivery
              </p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "0 28px" }}>

          {/* Element Filters */}
          <div style={{
            display: "flex", gap: 8, flexWrap: "wrap",
            justifyContent: "center", marginBottom: 40,
            paddingBottom: 28, paddingTop: 28,
            borderBottom: `1px solid ${C.glassBorder}`,
          }}>
            {TIERS.map(t => {
              const isActive = filter === t;
              const elColor = t !== "All" ? ELEMENT_COLORS[t]?.primary : C.star;
              return (
                <button key={t} onClick={() => setFilter(t)} style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 10,
                  padding: "7px 18px", borderRadius: 20, cursor: "pointer",
                  letterSpacing: 2, textTransform: "uppercase",
                  border: `1px solid ${isActive ? elColor + "55" : C.glassBorder}`,
                  background: isActive ? elColor + "12" : "transparent",
                  color: isActive ? elColor : C.silverDim,
                  transition: "all 0.3s ease",
                  backdropFilter: isActive ? "blur(8px)" : "none",
                }}>{t === "All" ? "✦ All Signs" : t}</button>
              );
            })}
          </div>

          {/* Sign Grid — Glass Cards */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 20,
            marginBottom: 48,
          }}>
            {filtered.map((sign) => {
              const isHovered = hoveredId === sign.id;
              const el = ELEMENT_COLORS[sign.tier];
              const isPlaceholder = sign.payhipId === "XXXXX";

              return (
                <div
                  key={sign.id}
                  onMouseEnter={() => setHoveredId(sign.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    background: isHovered ? C.glassHover : C.glass,
                    border: `1px solid ${isHovered ? C.glassHoverBorder : C.glassBorder}`,
                    borderRadius: 12,
                    padding: "28px 24px",
                    backdropFilter: "blur(12px)",
                    transition: "all 0.4s ease",
                    animation: "fadeIn 0.5s ease",
                    position: "relative",
                    overflow: "hidden",
                    cursor: "default",
                    boxShadow: isHovered ? `0 8px 32px rgba(0,0,0,0.3), 0 0 20px ${el.glow}` : "0 2px 12px rgba(0,0,0,0.2)",
                  }}
                >
                  {/* Subtle element glow in corner */}
                  <div style={{
                    position: "absolute", top: -30, right: -30,
                    width: 100, height: 100, borderRadius: "50%",
                    background: `radial-gradient(circle, ${el.glow} 0%, transparent 70%)`,
                    opacity: isHovered ? 1 : 0.3,
                    transition: "opacity 0.4s ease",
                  }} />

                  {/* Hexagonal symbol frame */}
                  <div style={{
                    width: 56, height: 56,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 16px",
                    position: "relative",
                  }}>
                    {/* Hex border using CSS clip-path */}
                    <div style={{
                      position: "absolute", inset: 0,
                      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                      background: `linear-gradient(135deg, ${el.primary}33, ${el.primary}11)`,
                      border: "none",
                    }} />
                    <div style={{
                      position: "absolute", inset: 2,
                      clipPath: "polygon(50% 0%, 93% 25%, 93% 75%, 50% 100%, 7% 75%, 7% 25%)",
                      background: C.bg,
                    }} />
                    <span style={{
                      position: "relative", zIndex: 1,
                      fontSize: 22, color: el.primary,
                      filter: isHovered ? `drop-shadow(0 0 8px ${el.primary}66)` : "none",
                      transition: "filter 0.3s ease",
                    }}>{sign.symbol}</span>
                  </div>

                  {/* Name */}
                  <h3 style={{
                    fontFamily: "'Cinzel', serif",
                    margin: 0, fontSize: 18, fontWeight: 600,
                    color: isHovered ? C.star : C.silver,
                    letterSpacing: 3, textTransform: "uppercase",
                    textAlign: "center",
                    transition: "color 0.3s ease",
                  }}>{sign.name}</h3>

                  {/* Subtitle */}
                  <div style={{
                    fontFamily: "'Cinzel', serif",
                    fontSize: 11, color: el.primary,
                    letterSpacing: 2, textTransform: "uppercase",
                    textAlign: "center", marginTop: 4, marginBottom: 12,
                    opacity: 0.8,
                  }}>{sign.subtitle}</div>

                  {/* Dates + Element */}
                  <div style={{
                    fontFamily: "'Fira Code', monospace",
                    fontSize: 9, color: C.silverDim,
                    letterSpacing: 1, textAlign: "center",
                    marginBottom: 14,
                  }}>{sign.dates} · {sign.tier}</div>

                  {/* Description */}
                  <p style={{
                    margin: "0 0 18px", fontSize: 13.5,
                    color: C.silverMuted, lineHeight: 1.8,
                    fontStyle: "italic", fontWeight: 300,
                    textAlign: "center",
                    display: isHovered ? "block" : "-webkit-box",
                    WebkitLineClamp: isHovered ? "unset" : 3,
                    WebkitBoxOrient: "vertical",
                    overflow: isHovered ? "visible" : "hidden",
                  }}>{sign.desc}</p>

                  {/* Divider */}
                  <div style={{
                    width: 40, height: 1, margin: "0 auto 14px",
                    background: `linear-gradient(90deg, transparent, ${el.primary}44, transparent)`,
                  }} />

                  {/* Price + Action */}
                  <div style={{
                    display: "flex", justifyContent: "space-between",
                    alignItems: "center",
                  }}>
                    <span style={{
                      fontFamily: "'Cinzel', serif",
                      fontSize: 18, fontWeight: 600,
                      color: C.star, letterSpacing: 1,
                    }}>${sign.price}</span>

                    {isPlaceholder ? (
                      <span style={{
                        fontFamily: "'Fira Code', monospace",
                        fontSize: 9, color: C.silverDim,
                        letterSpacing: 1.5, textTransform: "uppercase",
                        fontStyle: "italic",
                      }}>Coming soon</span>
                    ) : (
                      <a href={`https://payhip.com/b/${sign.payhipId}`}
                        className="buy-btn" data-product={sign.payhipId}
                        onClick={(e) => { handleBuy(sign); if (isPlaceholder) e.preventDefault(); }}
                        style={{
                          fontFamily: "'Fira Code', monospace", fontSize: 10,
                          padding: "8px 22px", borderRadius: 20, cursor: "pointer",
                          letterSpacing: 1.5, textTransform: "uppercase",
                          border: `1px solid ${C.star}44`,
                          background: "transparent",
                          color: C.star,
                          textDecoration: "none", transition: "all 0.3s ease",
                        }}>Acquire</a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: C.silverDim }}>
              <p style={{ fontSize: 18, fontWeight: 300, fontStyle: "italic" }}>
                No guides in this element yet. The stars are still aligning...
              </p>
            </div>
          )}

          {/* The Four Elements — Glass Panel */}
          <div style={{
            margin: "0 0 40px", padding: "40px 28px",
            background: C.glass,
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 16,
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 10,
              color: C.bronze, letterSpacing: 5, textTransform: "uppercase",
              marginBottom: 8, textAlign: "center",
            }}>── ✦ ──</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 500,
              color: C.star, textAlign: "center", margin: "0 0 6px",
              letterSpacing: 3, textTransform: "uppercase",
            }}>The Four Elements</h2>
            <p style={{
              fontSize: 14, color: C.silverMuted, textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 1.8,
              maxWidth: 440, margin: "0 auto 28px", letterSpacing: 0.5,
            }}>Your element shapes how you feel, how you love, how you fight,
              and how you move through the world.</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 12,
            }}>
              {[
                { name: "Fire", signs: "Aries · Leo · Sagittarius", desc: "Passion, courage, drive. The ones who burn bright.", icon: "🔥" },
                { name: "Earth", signs: "Taurus · Virgo · Capricorn", desc: "Stability, patience, loyalty. The ones who build.", icon: "🌍" },
                { name: "Air", signs: "Gemini · Libra · Aquarius", desc: "Intellect, freedom, communication. The ones who think.", icon: "💨" },
                { name: "Water", signs: "Cancer · Scorpio · Pisces", desc: "Emotion, intuition, depth. The ones who feel.", icon: "🌊" },
              ].map((el, i) => {
                const ec = ELEMENT_COLORS[el.name];
                return (
                  <div key={i} style={{
                    padding: "18px 16px",
                    background: ec.bg,
                    border: `1px solid ${ec.border}`,
                    borderRadius: 10,
                  }}>
                    <div style={{ fontSize: 18, marginBottom: 8, opacity: 0.7 }}>{el.icon}</div>
                    <div style={{
                      fontFamily: "'Cinzel', serif", fontSize: 13,
                      fontWeight: 600, color: ec.primary, letterSpacing: 2,
                      textTransform: "uppercase", marginBottom: 4,
                    }}>{el.name}</div>
                    <div style={{
                      fontFamily: "'Fira Code', monospace", fontSize: 9,
                      color: C.silverDim, letterSpacing: 1, marginBottom: 8,
                    }}>{el.signs}</div>
                    <p style={{
                      fontFamily: "'Cormorant Garamond', serif", fontSize: 13,
                      color: C.silverMuted, margin: 0, lineHeight: 1.6,
                      fontStyle: "italic",
                    }}>{el.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* More Than a Horoscope — Glass Panel */}
          <div style={{
            margin: "0 0 40px", padding: "44px 32px",
            background: C.glass,
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 16,
            backdropFilter: "blur(12px)",
            textAlign: "center",
          }}>
            <div style={{
              fontSize: 16, color: C.bronze, letterSpacing: 18,
              marginBottom: 20, opacity: 0.5,
            }}>● ◐ ○ ◑ ●</div>
            <h2 style={{
              fontFamily: "'Cinzel', serif", fontSize: 13,
              color: C.silver, letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 20,
            }}>More Than a Horoscope</h2>
            <p style={{
              fontSize: 17, color: C.silverMuted, textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 2.1,
              maxWidth: 480, margin: "0 auto",
            }}>
              A horoscope tells you what might happen on a Tuesday.
              These guides tell you who you are — your strengths, your shadows,
              your patterns in love and work and solitude.
              The parts of yourself you recognise immediately
              and the parts you have been avoiding.
            </p>
            <div style={{
              width: 40, height: 1, margin: "24px auto 0",
              background: `linear-gradient(90deg, transparent, ${C.bronze}66, transparent)`,
            }} />
          </div>

          {/* The Path */}
          <div style={{
            margin: "0 0 40px", padding: "40px 28px",
            background: C.glass,
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 16,
            backdropFilter: "blur(12px)",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 10,
              color: C.bronze, letterSpacing: 5, textTransform: "uppercase",
              marginBottom: 28, textAlign: "center",
            }}>── The Path ──</div>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: 32,
            }}>
              {[
                { n: "I", title: "Find Your Sign", desc: "Browse by element or scroll to find your sun sign. Each guide is self-contained." },
                { n: "II", title: "Exchange", desc: "Secure payment through card or local methods. Your details are protected." },
                { n: "III", title: "Receive", desc: "Your guide arrives as a PDF — instantly. Print or keep digital." },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "'Cinzel Decorative', serif", fontSize: 30,
                    color: C.star, fontWeight: 400,
                    display: "block", marginBottom: 12,
                    textShadow: `0 0 20px rgba(241,229,172,0.2)`,
                  }}>{s.n}</span>
                  <h4 style={{
                    fontFamily: "'Cinzel', serif",
                    margin: "0 0 8px", fontSize: 14, fontWeight: 500,
                    color: C.silver, letterSpacing: 2, textTransform: "uppercase",
                  }}>{s.title}</h4>
                  <p style={{
                    fontSize: 13, color: C.silverMuted,
                    margin: 0, lineHeight: 1.8,
                    fontStyle: "italic", fontWeight: 300,
                  }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{
            margin: "0 0 48px",
            background: C.glass,
            border: `1px solid ${C.glassBorder}`,
            borderRadius: 16,
            backdropFilter: "blur(12px)",
            overflow: "hidden",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 10,
              color: C.bronze, letterSpacing: 4, textTransform: "uppercase",
              padding: "20px 28px",
              borderBottom: `1px solid ${C.glassBorder}`,
              textAlign: "center",
            }}>Common Questions</div>
            {[
              { q: "What do I receive after purchase?", a: "A beautifully formatted PDF guide delivered instantly to your email. Print it, keep it on your device, or gift it." },
              { q: "How are these different from a horoscope?", a: "A horoscope predicts your week. These guides explain who you are — personality, patterns, strengths, shadows, relationships. They don't change with the calendar." },
              { q: "Is my payment secure?", a: "All payments are processed through Payhip's encrypted checkout. Your details never touch this site." },
              { q: "Can I get a refund?", a: "Due to the digital nature of these guides, all sales are final. Read the descriptions carefully — your sign knows what it wants." },
              { q: "I didn't receive my download?", a: "Check your spam folder first. If it's not there, reach out and we'll resolve it promptly." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "18px 28px",
                borderBottom: i < 4 ? `1px solid ${C.glassBorder}` : "none",
              }}>
                <h4 style={{
                  fontFamily: "'Cinzel', serif",
                  margin: "0 0 6px", fontSize: 13, fontWeight: 500,
                  color: C.silver, letterSpacing: 1,
                }}>{item.q}</h4>
                <p style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 11,
                  color: C.silverDim, margin: 0, lineHeight: 1.8,
                }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: `1px solid ${C.glassBorder}`,
          padding: "32px 28px", textAlign: "center",
        }}>
          <div style={{
            fontSize: 16, color: C.bronze, letterSpacing: 18,
            marginBottom: 16, opacity: 0.3,
          }}>● ◐ ○ ◑ ●</div>
          <div style={{
            fontFamily: "'Cinzel Decorative', serif", fontSize: 13,
            color: C.star, opacity: 0.25, letterSpacing: 4, textTransform: "uppercase",
            marginBottom: 8,
          }}>The Zodiac Library</div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 9,
            color: C.silverDim, marginBottom: 12,
          }}>© 2026 Clydie Cronje · Secure payments by Payhip</div>
          <a href="https://hollow-library.vercel.app" style={{
            fontFamily: "'Fira Code', monospace", fontSize: 9,
            color: C.textDim, textDecoration: "none", letterSpacing: 1,
          }}>From the creators of The Hollow Library</a>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(12px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: rgba(241,229,172,0.2); color: ${C.text}; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${C.bgCard}; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: ${C.bg}; }
        .buy-btn:hover {
          background: ${C.star} !important;
          color: ${C.bg} !important;
          border-color: ${C.star} !important;
          box-shadow: 0 0 16px rgba(241,229,172,0.25) !important;
        }
      `}</style>
    </div>
  );
}
