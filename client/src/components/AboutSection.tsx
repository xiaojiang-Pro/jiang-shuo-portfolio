/**
 * Design: 潘多拉星球生物发光蓝色主题 - 关于我区域
 * Background: 潘多拉森林背景图（含迪雷马、锤头兽、狼）+ 深蓝遮罩
 */

const PANDORA_ABOUT_BG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/pandora-about-bg-iHXzZJMKMkoBH3WsFy6dpX.webp";

const personalInfo = [
  { icon: "👤", label: "姓名", value: "姜硕" },
  { icon: "🎂", label: "年龄", value: "24岁" },
  { icon: "🎓", label: "学历", value: "全日制本科" },
  { icon: "🏫", label: "院校", value: "山东外事职业大学" },
  { icon: "🤖", label: "求职意向", value: "AI训练师" },
  { icon: "📧", label: "邮箱", value: "2416808530@qq.com" },
  { icon: "📱", label: "电话", value: "17664042185" },
];

const advantages = [
  {
    icon: "🔬",
    title: "多模态评测经验",
    desc: "具备多模态大模型评测经验，能从空间理解、物理推演等维度设计评测体系并输出结构化结论",
    color: "#00D4FF",
  },
  {
    icon: "💻",
    title: "Vibe Coding能力",
    desc: "掌握Vibe Coding，能通过Python脚本自动化完成数据生成、模型调用，显著提升评测效率",
    color: "#00FFCC",
  },
  {
    icon: "✍️",
    title: "Prompt工程优化",
    desc: "PE迭代优化能力，通过Prompt工程多轮迭代，提升模型生成效果",
    color: "#7B9FFF",
  },
  {
    icon: "📊",
    title: "逻辑拆解能力",
    desc: "逻辑拆解能力强，擅长将复杂模型能力转化为可量化评测指标",
    color: "#B07BFF",
  },
];

export default function AboutSection() {
  return (
    <section
      id="about"
      className="py-20 relative overflow-hidden"
    >
      {/* Pandora Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${PANDORA_ABOUT_BG})` }}
      />
      {/* Dark overlay for readability */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, rgba(5,10,26,0.88) 0%, rgba(5,10,26,0.75) 40%, rgba(5,10,26,0.85) 100%)",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#00D4FF" }}>
            01 / ABOUT
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-3"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              background: "linear-gradient(90deg, #00D4FF, #00FFCC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            关于我 🌿
          </h2>
          <p style={{ color: "rgba(160, 200, 240, 0.7)" }}>一个热爱AI、热爱探索的年轻人</p>
          <div className="mt-4 flex justify-center">
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, #00D4FF, #7B5EA7)", boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Left: Personal Info + Education */}
          <div className="space-y-6">
            {/* Personal Info Card */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(5,10,26,0.7)",
                border: "1px solid rgba(0, 212, 255, 0.22)",
                boxShadow: "0 0 30px rgba(0, 212, 255, 0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                className="text-base font-semibold mb-4 flex items-center gap-2"
                style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif" }}
              >
                <span>🌟</span> 个人信息
              </h3>
              <div className="grid grid-cols-1 gap-3">
                {personalInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-base w-6 text-center">{item.icon}</span>
                    <span className="text-sm w-20 shrink-0" style={{ color: "rgba(160,200,240,0.55)" }}>
                      {item.label}
                    </span>
                    <span className="text-sm font-medium" style={{ color: "rgba(200, 230, 255, 0.9)" }}>
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "rgba(5,10,26,0.7)",
                border: "1px solid rgba(123, 94, 167, 0.28)",
                backdropFilter: "blur(12px)",
              }}
            >
              <h3
                className="text-base font-semibold mb-4 flex items-center gap-2"
                style={{ color: "#B07BFF", fontFamily: "'Noto Serif SC', serif" }}
              >
                <span>🎓</span> 教育背景
              </h3>
              <div className="flex items-start gap-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                  style={{ background: "rgba(123, 94, 167, 0.2)", border: "1px solid rgba(123,94,167,0.3)" }}
                >
                  🏫
                </div>
                <div>
                  <p className="font-semibold" style={{ color: "rgba(200,230,255,0.9)", fontFamily: "'Noto Serif SC', serif" }}>
                    山东外事职业大学
                  </p>
                  <p className="text-sm mt-0.5" style={{ color: "rgba(160,200,240,0.6)" }}>全日制本科</p>
                  <p
                    className="text-xs mt-1 font-medium"
                    style={{ color: "#00FFCC", textShadow: "0 0 8px rgba(0,255,200,0.4)" }}
                  >
                    2023.09 — 2025.06
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Advantages Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 content-start">
            {advantages.map((adv) => (
              <div
                key={adv.title}
                className="rounded-xl p-5 transition-all duration-200 hover:-translate-y-1"
                style={{
                  background: "rgba(5,10,26,0.72)",
                  border: `1px solid ${adv.color}28`,
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="w-9 h-9 rounded-lg flex items-center justify-center text-lg"
                    style={{ background: `${adv.color}18` }}
                  >
                    {adv.icon}
                  </span>
                  <h4 className="text-sm font-semibold" style={{ color: adv.color }}>
                    {adv.title}
                  </h4>
                </div>
                <p className="text-xs leading-relaxed" style={{ color: "rgba(160,200,240,0.7)" }}>
                  {adv.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
