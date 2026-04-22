/**
 * Design: 潘多拉星球生物发光蓝色主题 - Hero区域
 * Background: 潘多拉森林全幅背景图 + 深蓝渐变遮罩
 * Layout: 左文字右头像，飘浮粒子动效，首页正中央图鲁克图标
 */
import LeonopteryxIcon, { TORUK_IMG_2 } from "./LeonopteryxIcon";

const PANDORA_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/pandora-hero-bg-AG8kWN8yY4rv4DesiF2sH8.webp";
const AVATAR_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/hero-avatar-male-v3-N2AogMkpjgmpeP62wYmVnr.webp";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  size: Math.random() * 4 + 2,
  left: Math.random() * 100,
  delay: Math.random() * 5,
  duration: Math.random() * 3 + 3,
}));

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Pandora Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PANDORA_BG})` }}
      />
      {/* Dark gradient overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(5,10,26,0.82) 0%, rgba(5,10,40,0.65) 50%, rgba(5,10,26,0.75) 100%)",
        }}
      />

      {/* Bioluminescent floating particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${p.size}px`,
            height: `${p.size}px`,
            left: `${p.left}%`,
            bottom: "10%",
            background:
              p.id % 3 === 0
                ? "rgba(0, 212, 255, 0.85)"
                : p.id % 3 === 1
                ? "rgba(0, 255, 200, 0.75)"
                : "rgba(123, 94, 167, 0.8)",
            boxShadow:
              p.id % 3 === 0
                ? "0 0 8px rgba(0, 212, 255, 0.9)"
                : p.id % 3 === 1
                ? "0 0 8px rgba(0, 255, 200, 0.9)"
                : "0 0 8px rgba(123, 94, 167, 0.9)",
            animation: `particle-drift ${p.duration}s ease-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div className="space-y-6">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium"
              style={{
                background: "rgba(0, 212, 255, 0.12)",
                border: "1px solid rgba(0, 212, 255, 0.3)",
                color: "#00D4FF",
                boxShadow: "0 0 16px rgba(0, 212, 255, 0.15)",
              }}
            >
              <span className="animate-pulse-glow">🌿</span>
              <span>欢迎来到我的星际空间</span>
            </div>

            {/* Heading */}
            <div>
              <h1
                className="text-4xl sm:text-5xl font-bold mb-2"
                style={{
                  fontFamily: "'Noto Serif SC', serif",
                  color: "rgba(220, 240, 255, 0.95)",
                }}
              >
                你好，我是
              </h1>
              <h1
                className="text-5xl sm:text-6xl font-extrabold italic"
                style={{
                  fontFamily: "'Playfair Display', serif",
                  background: "linear-gradient(90deg, #00D4FF, #00FFCC, #7B9FFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  textShadow: "none",
                  filter: "drop-shadow(0 0 20px rgba(0, 212, 255, 0.4))",
                }}
              >
                Jiang Shuo
              </h1>
              <div
                className="mt-2 h-0.5 w-32 rounded-full"
                style={{
                  background: "linear-gradient(90deg, #00D4FF, transparent)",
                  boxShadow: "0 0 8px rgba(0, 212, 255, 0.5)",
                }}
              />
            </div>

            {/* Subtitle */}
            <p
              className="text-xl font-medium"
              style={{ color: "rgba(180, 220, 255, 0.85)" }}
            >
              一位热爱探索的{" "}
              <span
                style={{
                  color: "#00FFCC",
                  textShadow: "0 0 12px rgba(0, 255, 200, 0.6)",
                }}
              >
                AI训练师
              </span>{" "}
              ✨
            </p>

            {/* Description */}
            <p
              className="text-base leading-relaxed max-w-md"
              style={{ color: "rgba(160, 200, 240, 0.75)" }}
            >
              专注于多模态大模型评测与数据工程，擅长将复杂的AI能力转化
              为可量化的评估体系。热爱用技术解决实际问题，相信每一行
              数据都有其独特的价值。
            </p>

            {/* Info Tags */}
            <div className="flex flex-wrap gap-2">
              {[
                { icon: "🎓", text: "山东外事职业大学" },
                { icon: "🤖", text: "AI训练师" },
                { icon: "📱", text: "17664042185" },
              ].map((tag) => (
                <span
                  key={tag.text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm"
                  style={{
                    background: "rgba(0, 212, 255, 0.08)",
                    border: "1px solid rgba(0, 212, 255, 0.2)",
                    color: "rgba(160, 210, 255, 0.85)",
                  }}
                >
                  <span>{tag.icon}</span>
                  <span>{tag.text}</span>
                </span>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={() => {
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #0066CC)",
                  color: "#050A1A",
                  boxShadow: "0 0 24px rgba(0, 212, 255, 0.4)",
                }}
              >
                了解我 →
              </button>
              <button
                onClick={() => {
                  document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1.5px solid rgba(0, 212, 255, 0.4)",
                  color: "#00D4FF",
                  boxShadow: "0 0 16px rgba(0, 212, 255, 0.15)",
                }}
              >
                联系我 💫
              </button>
            </div>
          </div>

          {/* Right: Avatar */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Outer glow ring */}
              <div
                className="absolute inset-0 rounded-full animate-pulse-glow"
                style={{
                  background: "transparent",
                  border: "2px solid rgba(0, 212, 255, 0.3)",
                  boxShadow: "0 0 40px rgba(0, 212, 255, 0.25), inset 0 0 40px rgba(0, 212, 255, 0.05)",
                  transform: "scale(1.08)",
                }}
              />
              {/* Avatar */}
              <div
                className="relative rounded-full overflow-hidden animate-float"
                style={{
                  width: "300px",
                  height: "300px",
                  border: "3px solid rgba(0, 212, 255, 0.4)",
                  boxShadow: "0 0 50px rgba(0, 212, 255, 0.3), 0 0 100px rgba(0, 212, 255, 0.1)",
                  background: "rgba(5, 10, 26, 0.5)",
                }}
              >
                <img
                  src={AVATAR_URL}
                  alt="姜硕的潘多拉卡通头像"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status badge */}
              <div
                className="absolute bottom-4 right-0 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium"
                style={{
                  background: "rgba(5, 10, 26, 0.85)",
                  border: "1px solid rgba(0, 212, 255, 0.35)",
                  color: "#00FFCC",
                  backdropFilter: "blur(8px)",
                  boxShadow: "0 0 16px rgba(0, 212, 255, 0.2)",
                }}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full animate-pulse"
                  style={{ background: "#00FFCC", boxShadow: "0 0 6px #00FFCC" }}
                />
                开放合作 ✨
              </div>

              {/* Bear decoration */}
              <div
                className="absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center text-lg animate-float-slow"
                style={{
                  background: "rgba(5, 10, 26, 0.8)",
                  border: "1px solid rgba(0, 212, 255, 0.3)",
                  boxShadow: "0 0 12px rgba(0, 212, 255, 0.2)",
                }}
              >
                🧸
              </div>
            </div>
          </div>
        </div>

        {/* Toruk Official Image - 顶部官方图鲁克图片（仰视飞翔全身，金黄翼膜） */}
        <div className="flex justify-center mt-10 mb-2 relative">
          <div
            style={{
              position: "relative",
              width: "100%",
              maxWidth: "700px",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 0 60px rgba(255,107,43,0.3), 0 0 120px rgba(0,212,255,0.15)",
              border: "1px solid rgba(255,107,43,0.25)",
            }}
          >
            <img
              src={TORUK_IMG_2}
              alt="图鲁克 - 阿凡达官方形象"
              style={{
                width: "100%",
                height: "320px",
                objectFit: "cover",
                objectPosition: "center top",
                display: "block",
              }}
            />
            {/* 渐隐遮罩 */}
            <div style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "80px",
              background: "linear-gradient(to bottom, transparent, rgba(5,10,26,0.9))",
            }} />
            {/* 标题 - 两行分开显示 */}
            <div style={{
              position: "absolute",
              bottom: "16px",
              left: "50%",
              transform: "translateX(-50%)",
              textAlign: "center",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "6px",
            }}>
              <div style={{
                color: "rgba(255,140,64,0.9)",
                fontSize: "13px",
                letterSpacing: "8px",
                fontFamily: "'Playfair Display', serif",
                fontWeight: 700,
                textShadow: "0 0 16px rgba(255,107,43,0.8)",
                whiteSpace: "nowrap",
              }}>
                ✦ TORUK MAKTO ✦
              </div>
              <div style={{
                color: "rgba(0,212,255,0.75)",
                fontSize: "11px",
                letterSpacing: "4px",
                fontFamily: "'Playfair Display', serif",
                textShadow: "0 0 12px rgba(0,212,255,0.5)",
                whiteSpace: "nowrap",
              }}>
                潘多拉最强飞行生物
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-xs tracking-widest" style={{ color: "rgba(0, 212, 255, 0.5)" }}>
            
          </span>
          <div
            className="w-0.5 h-8 rounded-full"
            style={{
              background: "linear-gradient(to bottom, rgba(0,212,255,0.6), transparent)",
              animation: "pulse-glow 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
