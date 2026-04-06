import { useState, useEffect } from "react";

/*
 ╔══════════════════════════════════════════════════════════════╗
 ║  THE ZODIAC LIBRARY — Star Guides & Astrology               ║
 ╠══════════════════════════════════════════════════════════════╣
 ║                                                              ║
 ║  1. Create a free account at https://payhip.com              ║
 ║  2. Add each zodiac guide as a "Digital Download" product    ║
 ║  3. Copy each product's ID from its URL:                     ║
 ║     e.g. payhip.com/b/AbC1d → ID is "AbC1d"                ║
 ║  4. Replace the payhipId values in SIGNS below               ║
 ║  5. git add . && git commit && git push                      ║
 ║     → Vercel auto-deploys your changes                       ║
 ║                                                              ║
 ║  YOUR DOMAIN: zodiac.siyenza.app                             ║
 ║  Cloudflare DNS: CNAME → zodiac → cname.vercel-dns.com     ║
 ║                                                              ║
 ║  Sister site: The Hollow Library — wicca.siyenza.app         ║
 ║                                                              ║
 ╚══════════════════════════════════════════════════════════════╝
*/

const SIGNS = [
  {
    id: 1, name: "Aries", price: 4.99, icon: "♈", tier: "Fire",
    dates: "Mar 21 – Apr 19",
    desc: "The ram charges forward where others hesitate. An in-depth guide to the Aries personality — your strengths, your shadows, your relationships, and the fire that drives everything you do.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 2, name: "Taurus", price: 4.99, icon: "♉", tier: "Earth",
    dates: "Apr 20 – May 20",
    desc: "The bull knows what it wants and will not be rushed. An in-depth guide to the Taurus personality — your loyalty, your stubbornness, your deep need for beauty and security.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 3, name: "Gemini", price: 4.99, icon: "♊", tier: "Air",
    dates: "May 21 – Jun 20",
    desc: "The twins live in two worlds at once. An in-depth guide to the Gemini personality — your curiosity, your restlessness, your gift for connection and your fear of being pinned down.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 4, name: "Cancer", price: 4.99, icon: "♋", tier: "Water",
    dates: "Jun 21 – Jul 22",
    desc: "The crab carries its home on its back. An in-depth guide to the Cancer personality — your fierce protectiveness, your emotional depth, and the soft heart you guard so carefully.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 5, name: "Leo", price: 4.99, icon: "♌", tier: "Fire",
    dates: "Jul 23 – Aug 22",
    desc: "The lion does not dim its light for anyone. An in-depth guide to the Leo personality — your warmth, your pride, your generosity, and the need to be seen that runs deeper than ego.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 6, name: "Virgo", price: 4.99, icon: "♍", tier: "Earth",
    dates: "Aug 23 – Sep 22",
    desc: "The maiden sees every flaw — especially her own. An in-depth guide to the Virgo personality — your precision, your devotion, your quiet service, and the inner critic you need to tame.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 7, name: "Libra", price: 4.99, icon: "♎", tier: "Air",
    dates: "Sep 23 – Oct 22",
    desc: "The scales seek balance in all things — and sometimes lose themselves in the search. An in-depth guide to the Libra personality — your grace, your indecision, and your deep hunger for harmony.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 8, name: "Scorpio", price: 4.99, icon: "♏", tier: "Water",
    dates: "Oct 23 – Nov 21",
    desc: "The scorpion transforms through fire and emerges reborn. An in-depth guide to the Scorpio personality — your intensity, your loyalty, your secrets, and the depth most people will never understand.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 9, name: "Sagittarius", price: 4.99, icon: "♐", tier: "Fire",
    dates: "Nov 22 – Dec 21",
    desc: "The archer aims at the horizon and runs toward it. An in-depth guide to the Sagittarius personality — your freedom, your honesty, your restless search for meaning and your fear of being caged.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 10, name: "Capricorn", price: 4.99, icon: "♑", tier: "Earth",
    dates: "Dec 22 – Jan 19",
    desc: "The sea-goat climbs the mountain no matter how long it takes. An in-depth guide to the Capricorn personality — your ambition, your discipline, your hidden tenderness, and the walls you build.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 11, name: "Aquarius", price: 4.99, icon: "♒", tier: "Air",
    dates: "Jan 20 – Feb 18",
    desc: "The water bearer pours for the collective, not the self. An in-depth guide to the Aquarius personality — your vision, your detachment, your quiet rebellion, and the loneliness of seeing what others don't.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
  {
    id: 12, name: "Pisces", price: 4.99, icon: "♓", tier: "Water",
    dates: "Feb 19 – Mar 20",
    desc: "The fish swims in two directions — one toward the world, one toward the dream. An in-depth guide to the Pisces personality — your empathy, your imagination, your boundaries (or lack of them), and the magic you carry without trying.",
    payhipId: "XXXXX", pages: "Coming soon",
  },
];

const TIER_COLORS = {
  "Fire": { color: "#d4844a", glow: "#d4844a18" },
  "Earth": { color: "#7a9f80", glow: "#7a9f8018" },
  "Air": { color: "#9a9db8", glow: "#9a9db818" },
  "Water": { color: "#6a9ab8", glow: "#6a9ab818" },
};

const TIERS = ["All", "Fire", "Earth", "Air", "Water"];

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
      background: "#080e10",
      color: "#c8c2b4",
      fontFamily: "'Cormorant Garamond', Georgia, serif",
      position: "relative",
      overflow: "hidden",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500&family=Cinzel:wght@400;500;600;700&family=Fira+Code:wght@300;400&display=swap" rel="stylesheet" />

      {/* Atmospheric background */}
      <div style={{
        position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 80% 50% at 50% 0%, #12282e44 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 20% 80%, #1a150e22 0%, transparent 50%),
          radial-gradient(ellipse 40% 30% at 80% 60%, #12282e18 0%, transparent 50%),
          linear-gradient(180deg, #080e10 0%, #0a1518 30%, #0d1215 70%, #080e10 100%)
        `,
      }} />

      {/* Toast */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%",
        transform: `translateX(-50%) translateY(${toast.show ? 0 : 16}px)`,
        background: "#c9a54e", color: "#080e10", padding: "10px 28px",
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
          padding: "20px 32px",
          borderBottom: "1px solid #1e2e3218",
          position: "sticky", top: 0, zIndex: 100,
          background: "#080e10dd",
          backdropFilter: "blur(12px)",
        }}>
          <div>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 20, fontWeight: 500,
              color: "#c9a54e", letterSpacing: 3, textTransform: "uppercase",
            }}>The Zodiac Library</div>
            <div style={{
              fontFamily: "'Fira Code', monospace", fontSize: 10,
              color: "#8a9f95", letterSpacing: 1.5, marginTop: 2,
              textTransform: "uppercase",
            }}>Star guides & astrology</div>
          </div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 10,
            color: "#7a9a90", display: "flex", alignItems: "center", gap: 6,
          }}>
            <span style={{
              width: 6, height: 6, borderRadius: "50%",
              background: payhipReady ? "#5a7a5e" : "#6a5a3a",
              display: "inline-block",
              boxShadow: payhipReady ? "0 0 6px #5a7a5e44" : "none",
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
            background: "linear-gradient(180deg, #080e10cc 0%, #080e10aa 30%, #080e10bb 60%, #080e10ff 100%)",
          }} />
          <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px", position: "relative", zIndex: 1 }}>
            <div style={{ textAlign: "center", padding: "72px 0 48px" }}>
              <div style={{
                fontSize: 11, color: "#7a9a90", letterSpacing: 8,
                fontFamily: "'Cinzel', serif", marginBottom: 28,
              }}>── ✦ ──</div>

              <h1 style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "clamp(28px, 4.5vw, 44px)",
                fontWeight: 400, color: "#c9a54e",
                letterSpacing: 4, textTransform: "uppercase",
                margin: 0, lineHeight: 1.4,
                textShadow: "0 0 40px #c9a54e12",
              }}>Guides Written<br />in the Stars</h1>

              <div style={{
                width: 60, height: 1,
                background: "linear-gradient(90deg, transparent, #c9a54e44, transparent)",
                margin: "28px auto",
              }} />

              <p style={{
                color: "#9fb8ad", maxWidth: 480, margin: "0 auto",
                fontSize: 18, lineHeight: 1.9,
                fontStyle: "italic", fontWeight: 300,
              }}>
                Twelve signs. Twelve worlds. Each guide goes deeper than a horoscope —
                into your strengths, your shadows, your relationships,
                and the patterns written in your chart.
              </p>

              <p style={{
                fontFamily: "'Fira Code', monospace",
                fontSize: 11, color: "#7a9a90", marginTop: 24,
                letterSpacing: 0.5,
              }}>Downloadable PDF guides · Instant delivery to your inbox</p>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 28px" }}>

          {/* Element Filters */}
          <div style={{
            display: "flex", gap: 6, flexWrap: "wrap",
            justifyContent: "center", marginBottom: 36,
            paddingBottom: 28, paddingTop: 28, borderBottom: "1px solid #1a2428",
          }}>
            {TIERS.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{
                fontFamily: "'Fira Code', monospace", fontSize: 10,
                padding: "6px 14px", borderRadius: 3, cursor: "pointer",
                letterSpacing: 1, textTransform: "uppercase",
                border: `1px solid ${filter === t ? "#c9a54e33" : "#1a2428"}`,
                background: filter === t ? "#c9a54e0a" : "transparent",
                color: filter === t ? "#c9a54e" : "#4a5a55",
                transition: "all 0.3s ease",
              }}>{t}</button>
            ))}
          </div>

          {/* Sign Grid */}
          <div style={{ display: "grid", gap: 1 }}>
            {filtered.map((sign) => {
              const isHovered = hoveredId === sign.id;
              const tc = TIER_COLORS[sign.tier] || { color: "#c9a54e", glow: "#c9a54e18" };
              const isPlaceholder = sign.payhipId === "XXXXX";

              return (
                <div key={sign.id}
                  onMouseEnter={() => setHoveredId(sign.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    padding: "28px 24px",
                    background: isHovered ? "#0e181b" : "transparent",
                    transition: "all 0.4s ease",
                    animation: "fadeIn 0.4s ease",
                    position: "relative",
                  }}>
                  <div style={{ display: "flex", gap: 18 }}>
                    <div style={{
                      width: 48, height: 48, display: "flex", alignItems: "center",
                      justifyContent: "center", borderRadius: 4,
                      border: `1px solid ${isHovered ? tc.color + "44" : "#1a2428"}`,
                      background: isHovered ? tc.glow : "transparent",
                      transition: "all 0.3s ease", fontSize: 24, flexShrink: 0,
                    }}>{sign.icon}</div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "baseline", flexWrap: "wrap", gap: 8,
                      }}>
                        <div>
                          <h3 style={{
                            fontFamily: "'Cinzel', serif",
                            margin: 0, fontSize: 18, fontWeight: 500,
                            color: isHovered ? "#c8c2b4" : "#8a8278",
                            letterSpacing: 2, textTransform: "uppercase",
                            transition: "color 0.3s ease",
                          }}>{sign.name}</h3>
                          <span style={{
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 10, color: tc.color, letterSpacing: 0.5,
                          }}>{sign.dates} · {sign.tier}</span>
                        </div>
                        <span style={{
                          fontFamily: "'Cinzel', serif",
                          fontSize: 18, fontWeight: 600,
                          color: "#c9a54e", letterSpacing: 1,
                        }}>${sign.price}</span>
                      </div>

                      <p style={{
                        margin: "12px 0 0", fontSize: 14,
                        color: "#85a095", lineHeight: 1.8,
                        fontStyle: "italic", fontWeight: 300,
                        display: isHovered ? "block" : "-webkit-box",
                        WebkitLineClamp: isHovered ? "unset" : 2,
                        WebkitBoxOrient: "vertical",
                        overflow: isHovered ? "visible" : "hidden",
                        transition: "all 0.3s ease",
                      }}>{sign.desc}</p>

                      <div style={{
                        display: "flex", justifyContent: "space-between",
                        alignItems: "center", marginTop: 14,
                      }}>
                        <span style={{
                          fontFamily: "'Fira Code', monospace",
                          fontSize: 10, color: "#7a9a90",
                          border: "1px solid #c9a54e22",
                          padding: "3px 10px", borderRadius: 3,
                        }}>{sign.pages}</span>

                        {isPlaceholder ? (
                          <span style={{
                            fontFamily: "'Fira Code', monospace",
                            fontSize: 11, color: "#4a5a55",
                            fontStyle: "italic",
                          }}>Coming soon</span>
                        ) : (
                          <a href={`https://payhip.com/b/${sign.payhipId}`}
                            className="buy-btn" data-product={sign.payhipId}
                            onClick={(e) => { handleBuy(sign); if (isPlaceholder) e.preventDefault(); }}
                            style={{
                              fontFamily: "'Fira Code', monospace", fontSize: 11,
                              padding: "8px 20px", borderRadius: 3, cursor: "pointer",
                              letterSpacing: 1, textTransform: "uppercase",
                              border: "1px solid #c9a54e44", background: "transparent",
                              color: "#c9a54e", textDecoration: "none", transition: "all 0.3s ease",
                            }}>Acquire</a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "64px 0", color: "#7a9a90" }}>
              <p style={{ fontSize: 18, fontWeight: 300, fontStyle: "italic" }}>
                No guides in this element yet. The stars are still aligning...
              </p>
            </div>
          )}

          {/* The Four Elements */}
          <div style={{
            margin: "24px 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#7a9a90", letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 12, textAlign: "center",
            }}>── The Four Elements ──</div>
            <p style={{
              fontFamily: "'Cinzel', serif", fontSize: 18, fontWeight: 500,
              color: "#8a8278", textAlign: "center", margin: "0 0 8px", letterSpacing: 1,
            }}>Every Sign Belongs to an Element</p>
            <p style={{
              fontSize: 15, color: "#92ada2", textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 1.8,
              maxWidth: 520, margin: "0 auto 28px",
            }}>Your element shapes how you feel, how you love, how you fight,
              and how you move through the world.</p>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 1, border: "1px solid #1a2428",
            }}>
              {[
                { item: "Fire", note: "Aries, Leo, Sagittarius — passion, courage, drive, impatience. The ones who burn bright.", icon: "🔥", color: "#d4844a" },
                { item: "Earth", note: "Taurus, Virgo, Capricorn — stability, patience, loyalty, stubbornness. The ones who build.", icon: "🌍", color: "#7a9f80" },
                { item: "Air", note: "Gemini, Libra, Aquarius — intellect, communication, freedom, detachment. The ones who think.", icon: "💨", color: "#9a9db8" },
                { item: "Water", note: "Cancer, Scorpio, Pisces — emotion, intuition, depth, sensitivity. The ones who feel.", icon: "🌊", color: "#6a9ab8" },
              ].map((t, i) => (
                <div key={i} style={{
                  padding: "20px 18px", background: "#0a131608",
                  borderBottom: "1px solid #1a2428",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                    <span style={{ fontSize: 18, opacity: 0.6 }}>{t.icon}</span>
                    <span style={{
                      fontFamily: "'Cinzel', serif", fontSize: 13,
                      fontWeight: 500, color: t.color, letterSpacing: 0.5,
                    }}>{t.item}</span>
                  </div>
                  <p style={{
                    fontFamily: "'Fira Code', monospace", fontSize: 10.5,
                    color: "#85a095", margin: 0, lineHeight: 1.7,
                  }}>{t.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* More Than a Horoscope */}
          <div style={{
            margin: "0 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#7a9a90", letterSpacing: 4, textTransform: "uppercase",
              marginBottom: 12, textAlign: "center",
            }}>── More Than a Horoscope ──</div>
            <p style={{
              fontSize: 16, color: "#92ada2", textAlign: "center",
              fontStyle: "italic", fontWeight: 300, lineHeight: 2,
              maxWidth: 520, margin: "0 auto",
            }}>
              A horoscope tells you what might happen on a Tuesday.
              These guides tell you who you are — your strengths, your shadows,
              your patterns in love and work and solitude.
              The parts of yourself you recognise immediately and the parts
              you have been avoiding. Beautifully designed. Honest.
              Written in the stars, translated for real life.
            </p>
          </div>

          {/* The Path */}
          <div style={{
            margin: "24px 0 48px", padding: "40px 32px",
            border: "1px solid #1a2428",
          }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#7a9a90", letterSpacing: 4, textTransform: "uppercase",
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
                { n: "III", title: "Receive", desc: "Your guide arrives as a PDF — instantly, to the email you provide. Print or keep digital." },
              ].map(s => (
                <div key={s.n} style={{ textAlign: "center" }}>
                  <span style={{
                    fontFamily: "'Cinzel', serif", fontSize: 28,
                    color: "#c9a54e", fontWeight: 600,
                    display: "block", marginBottom: 12,
                  }}>{s.n}</span>
                  <h4 style={{
                    fontFamily: "'Cinzel', serif",
                    margin: "0 0 8px", fontSize: 16, fontWeight: 500,
                    color: "#8a8278", letterSpacing: 2, textTransform: "uppercase",
                  }}>{s.title}</h4>
                  <p style={{
                    fontSize: 14, color: "#85a095",
                    margin: 0, lineHeight: 1.8,
                    fontStyle: "italic", fontWeight: 300,
                  }}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div style={{ margin: "0 0 64px", border: "1px solid #1a2428" }}>
            <div style={{
              fontFamily: "'Cinzel', serif", fontSize: 11,
              color: "#7a9a90", letterSpacing: 4, textTransform: "uppercase",
              padding: "20px 28px", borderBottom: "1px solid #1a2428",
              textAlign: "center",
            }}>Common Questions</div>
            {[
              { q: "What do I receive after purchase?", a: "A beautifully formatted PDF guide delivered instantly to your email. Print it, keep it on your device, or gift it to someone whose sign you've been researching." },
              { q: "How are these different from a horoscope?", a: "A horoscope predicts your week. These guides explain who you are — your personality, your patterns, your strengths and shadows, your relationships. They don't change with the calendar." },
              { q: "Is my payment secure?", a: "All payments are processed through Payhip's encrypted checkout. Your details never touch this site." },
              { q: "Can I get a refund?", a: "Due to the digital nature of these guides, all sales are final. Read the descriptions carefully — your sign knows what it wants." },
              { q: "I didn't receive my download?", a: "Check your spam folder first. If it's not there, reach out and we'll resolve it promptly." },
            ].map((item, i) => (
              <div key={i} style={{
                padding: "20px 28px",
                borderBottom: i < 4 ? "1px solid #1a2428" : "none",
              }}>
                <h4 style={{
                  fontFamily: "'Cinzel', serif",
                  margin: "0 0 8px", fontSize: 14, fontWeight: 500,
                  color: "#8a8278", letterSpacing: 0.5,
                }}>{item.q}</h4>
                <p style={{
                  fontFamily: "'Fira Code', monospace", fontSize: 12,
                  color: "#7a9a90", margin: 0, lineHeight: 1.8,
                }}>{item.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer style={{
          borderTop: "1px solid #1a2428",
          padding: "32px 28px", textAlign: "center",
        }}>
          <div style={{
            fontFamily: "'Cinzel', serif", fontSize: 14,
            color: "#c9a54e33", letterSpacing: 3, textTransform: "uppercase",
            marginBottom: 8,
          }}>The Zodiac Library</div>
          <div style={{
            fontFamily: "'Fira Code', monospace", fontSize: 10,
            color: "#6a8a80", marginBottom: 12,
          }}>© 2026 Clydie Cronje · Secure payments by Payhip</div>
          <a href="https://hollow-library.vercel.app" style={{
            fontFamily: "'Fira Code', monospace", fontSize: 10,
            color: "#4a5a55", textDecoration: "none",
          }}>From the creators of The Hollow Library — spells & guides for the solitary witch</a>
        </footer>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #c9a54e33; color: #c8c2b4; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #1a2428; border-radius: 2px; }
        ::-webkit-scrollbar-track { background: #080e10; }
        .buy-btn:hover {
          background: #c9a54e !important;
          color: #080e10 !important;
          border-color: #c9a54e !important;
        }
      `}</style>
    </div>
  );
}
