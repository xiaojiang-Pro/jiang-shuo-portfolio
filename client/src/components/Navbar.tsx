/**
 * Design: 温暖橘粉渐变风 - 顶部固定导航栏
 * Colors: 背景暖米白 + 粉色主色 + 深棕文字
 * Style: 毛玻璃效果，滚动后背景加深
 */
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

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
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    setMobileOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm border-b border-rose-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("#home")}
            className="flex items-center gap-2 group"
          >
            <span className="text-lg">🌸</span>
            <span
              className="font-semibold text-[#C85C72] tracking-wide"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              姜硕的空间
            </span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="px-4 py-2 text-sm text-[#4A3728]/80 hover:text-[#C85C72] transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-[#C85C72] group-hover:w-4/5 transition-all duration-300 rounded-full" />
              </button>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button
              onClick={() => scrollToSection("#contact")}
              className="bg-[#C85C72] hover:bg-[#B04A60] text-white rounded-full px-5 py-2 text-sm font-medium shadow-sm hover:shadow-md transition-all duration-200"
            >
              ✉ 联系我
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-[#4A3728]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current mb-1 transition-all" />
            <div className="w-5 h-0.5 bg-current transition-all" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-rose-100 px-4 py-4">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="block w-full text-left px-3 py-3 text-sm text-[#4A3728] hover:text-[#C85C72] hover:bg-rose-50 rounded-lg transition-colors"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection("#contact")}
            className="w-full mt-3 bg-[#C85C72] hover:bg-[#B04A60] text-white rounded-full"
          >
            ✉ 联系我
          </Button>
        </div>
      )}
    </nav>
  );
}
