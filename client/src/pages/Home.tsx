/**
 * Design: 潘多拉星球生物发光蓝色主题 - 主页面
 * 整合所有区域组件，添加悬浮游戏按钮
 */
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ExperienceSection from "@/components/ExperienceSection";
import SkillsSection from "@/components/SkillsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import PandoraGame from "@/components/PandoraGame";

export default function Home() {
  const [showGame, setShowGame] = useState(false);

  useEffect(() => {
    // Scroll reveal animation
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    const revealElements = document.querySelectorAll(".reveal");
    revealElements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ExperienceSection />
      <SkillsSection />
      <ContactSection />
      <Footer />

      {/* Floating Game Button */}
      <button
        onClick={() => setShowGame(true)}
        className="fixed bottom-6 left-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300 hover:scale-110 group"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.15), rgba(123,94,167,0.15))",
          border: "1.5px solid rgba(0,212,255,0.4)",
          color: "#00D4FF",
          backdropFilter: "blur(12px)",
          boxShadow: "0 0 20px rgba(0,212,255,0.2), 0 4px 20px rgba(0,0,0,0.4)",
        }}
        title="玩纳威人小游戏"
      >
        <span className="text-lg group-hover:animate-bounce">🏹</span>
        <span>潘多拉保卫战</span>
        <span
          className="w-2 h-2 rounded-full animate-pulse"
          style={{ background: "#00FFCC", boxShadow: "0 0 6px #00FFCC" }}
        />
      </button>

      {/* Game Modal */}
      {showGame && (
        <PandoraGame onClose={() => setShowGame(false)} />
      )}
    </div>
  );
}
