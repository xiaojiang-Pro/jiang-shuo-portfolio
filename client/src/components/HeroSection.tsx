/**
 * Design: 温暖橘粉渐变风 - Hero区域
 * Layout: 左文字右插画，不对称布局
 * Colors: 暖米白背景 + 粉色渐变光晕
 * Animation: 元素从下方淡入
 */
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

const AVATAR_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/hero-avatar-GjCgZjYaY9DtUScYJo68nb.webp";
const HERO_BG_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/hero-bg-jmDJZpeU6WkTNj66C3CxnQ.webp";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FEF6F0 0%, #FDF0F3 50%, #FEF0E8 100%)",
      }}
    >
      {/* Background watercolor image */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url(${HERO_BG_URL})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Decorative blobs */}
      <div
        className="absolute top-20 right-10 w-72 h-72 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4A7B9, #E8748A)" }}
      />
      <div
        className="absolute bottom-20 left-10 w-56 h-56 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4956A, #F4A7B9)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text Content */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-rose-200 rounded-full px-4 py-1.5 text-sm text-[#C85C72]">
              <span>🌸</span>
              <span>欢迎来到我的小天地</span>
            </div>

            {/* Main heading */}
            <div>
              <h1
                className="text-4xl sm:text-5xl font-bold text-[#3D2B2B] leading-tight mb-2"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                你好，我是
              </h1>
              <h1
                className="text-4xl sm:text-5xl font-bold leading-tight"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  color: "#C85C72",
                  fontStyle: "italic",
                }}
              >
                Jiang Shuo
              </h1>
              <div className="mt-2 h-0.5 w-32 bg-gradient-to-r from-[#C85C72] to-[#F4956A] rounded-full" />
            </div>

            {/* Subtitle */}
            <p className="text-lg text-[#4A3728]/80 font-light">
              一位热爱探索的{" "}
              <span className="text-[#C85C72] font-medium">AI训练师</span>
              {" "}✨
            </p>

            {/* Description */}
            <p className="text-[#4A3728]/70 leading-relaxed max-w-md">
              专注于多模态大模型评测与数据工程，擅长将复杂的AI能力转化为可量化的评估体系。
              热爱用技术解决实际问题，相信每一行数据都有其独特的价值。
            </p>

            {/* Info chips */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "🎓", text: "山东外事职业大学" },
                { icon: "📍", text: "AI训练师" },
                { icon: "📱", text: "17664042185" },
              ].map((chip) => (
                <span
                  key={chip.text}
                  className="inline-flex items-center gap-1.5 bg-white/60 backdrop-blur-sm border border-rose-100 rounded-full px-3 py-1 text-xs text-[#4A3728]/80"
                >
                  <span>{chip.icon}</span>
                  <span>{chip.text}</span>
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                onClick={() => scrollToSection("about")}
                className="bg-[#C85C72] hover:bg-[#B04A60] text-white rounded-full px-6 py-2.5 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
              >
                了解我 →
              </Button>
              <Button
                onClick={() => scrollToSection("contact")}
                variant="outline"
                className="border-2 border-[#C85C72] text-[#C85C72] hover:bg-rose-50 rounded-full px-6 py-2.5 font-medium transition-all duration-200 hover:-translate-y-0.5 bg-white/60"
              >
                联系我 💌
              </Button>
            </div>
          </div>

          {/* Right: Avatar illustration */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Floating avatar card */}
              <div
                className="relative rounded-full overflow-hidden shadow-2xl animate-float border-4 border-white"
                style={{
                  background: "linear-gradient(135deg, #FDF0F3, #FEF0E8)",
                  width: "320px",
                  height: "320px",
                }}
              >
                <img
                  src={AVATAR_URL}
                  alt="姜硕的卡通头像"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status badge */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg flex items-center gap-1.5 text-xs font-medium text-[#4A3728]">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                开放合作 ✨
              </div>

              {/* Decorative bear */}
              <div className="absolute -top-3 -right-3 text-2xl animate-float" style={{ animationDelay: "0.5s" }}>
                🧸
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-[#4A3728]/40 text-xs">
          <span>SCROLL</span>
          <div className="w-0.5 h-6 bg-gradient-to-b from-[#C85C72]/40 to-transparent rounded-full" />
        </div>
      </div>
    </section>
  );
}
