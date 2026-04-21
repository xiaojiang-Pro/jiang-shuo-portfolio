/**
 * Design: 潘多拉星球生物发光蓝色主题 - 导航栏
 * Style: 深色半透明毛玻璃 + 青蓝发光边框
 */
import { useState, useEffect } from "react";

const navLinks = [
  { label: "首页", href: "#home" },
  { label: "关于我", href: "#about" },
  { label: "工作经历", href: "#experience" },
  { label: "技能专长", href: "#skills" },
  { label: "联系我", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
      const sections = ["home", "about", "experience", "skills", "contact"];
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        background: scrolled
          ? "rgba(5, 10, 26, 0.88)"
          : "rgba(5, 10, 26, 0.35)",
        backdropFilter: "blur(18px)",
        borderBottom: scrolled
          ? "1px solid rgba(0, 212, 255, 0.22)"
          : "1px solid transparent",
        boxShadow: scrolled
          ? "0 4px 30px rgba(0, 212, 255, 0.08)"
          : "none",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group"
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center text-sm animate-pulse-glow"
              style={{
                background: "linear-gradient(135deg, #00D4FF, #7B5EA7)",
                boxShadow: "0 0 14px rgba(0, 212, 255, 0.55)",
              }}
            >
              🌿
            </div>
            <span
              className="font-bold text-base tracking-wide"
              style={{
                fontFamily: "'Noto Serif SC', serif",
                background: "linear-gradient(90deg, #00D4FF, #00FFCC)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              姜硕的空间
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <button
                  key={link.href}
                  onClick={() => scrollToSection(link.href)}
                  className="relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-200"
                  style={{
                    color: isActive ? "#00D4FF" : "rgba(160, 210, 255, 0.7)",
                    background: isActive ? "rgba(0, 212, 255, 0.12)" : "transparent",
                    textShadow: isActive ? "0 0 12px rgba(0, 212, 255, 0.6)" : "none",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                      style={{ background: "#00D4FF", boxShadow: "0 0 6px #00D4FF" }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* CTA Button */}
          <button
            onClick={() => scrollToSection("#contact")}
            className="hidden md:flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 hover:scale-105"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #0066CC)",
              color: "#050A1A",
              boxShadow: "0 0 20px rgba(0, 212, 255, 0.4)",
            }}
          >
            ✉ 联系我
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            style={{ color: "#00D4FF" }}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current mb-1" />
            <div className="w-5 h-0.5 bg-current" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          className="md:hidden px-4 pb-4 space-y-1"
          style={{
            background: "rgba(5, 10, 26, 0.97)",
            borderTop: "1px solid rgba(0, 212, 255, 0.15)",
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors"
              style={{ color: "rgba(160, 210, 255, 0.8)" }}
            >
              {link.label}
            </button>
          ))}
          <button
            onClick={() => scrollToSection("#contact")}
            className="w-full mt-2 py-2.5 rounded-full text-sm font-semibold"
            style={{
              background: "linear-gradient(135deg, #00D4FF, #0066CC)",
              color: "#050A1A",
            }}
          >
            ✉ 联系我
          </button>
        </div>
      )}
    </nav>
  );
}
