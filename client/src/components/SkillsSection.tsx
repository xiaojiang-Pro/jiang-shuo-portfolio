/**
 * Design: 潘多拉星球生物发光蓝色主题 - 技能专长区域
 * Style: 深蓝卡片 + 发光进度条 + 标签云
 */

const skillCategories = [
  {
    icon: "🔬",
    title: "AI评测能力",
    color: "#00D4FF",
    skills: [
      { name: "多模态大模型评测", level: 95 },
      { name: "I2V视频生成评测", level: 92 },
      { name: "VLM图片理解评测", level: 90 },
      { name: "评测体系设计", level: 88 },
    ],
  },
  {
    icon: "💻",
    title: "技术能力",
    color: "#00FFCC",
    skills: [
      { name: "Python自动化脚本", level: 82 },
      { name: "Prompt工程", level: 90 },
      { name: "多线程并发处理", level: 75 },
      { name: "数据分析与报告", level: 85 },
    ],
  },
  {
    icon: "🛠️",
    title: "工具平台",
    color: "#B07BFF",
    skills: [
      { name: "Dify平台", level: 85 },
      { name: "RAG知识库构建", level: 80 },
      { name: "Trae开发工具", level: 78 },
      { name: "大模型API调用", level: 88 },
    ],
  },
];

const toolTags = [
  { name: "Python", emoji: "🐍", color: "#00D4FF" },
  { name: "Prompt Engineering", emoji: "✍️", color: "#00FFCC" },
  { name: "Dify", emoji: "⚡", color: "#B07BFF" },
  { name: "RAG", emoji: "📚", color: "#00D4FF" },
  { name: "Trae", emoji: "🛠️", color: "#00FFCC" },
  { name: "多模态评测", emoji: "🔬", color: "#7B9FFF" },
  { name: "I2V评测", emoji: "🎬", color: "#00D4FF" },
  { name: "VLM评测", emoji: "👁️", color: "#00FFCC" },
  { name: "数据标注", emoji: "🏷️", color: "#B07BFF" },
  { name: "多线程并发", emoji: "⚡", color: "#00D4FF" },
  { name: "数据自动化", emoji: "🤖", color: "#00FFCC" },
  { name: "评测报告", emoji: "📊", color: "#7B9FFF" },
];

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #060D22 0%, #050A1A 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00FFCC, transparent)" }}
      />
      <div
        className="absolute top-0 right-1/4 w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7B5EA7, transparent)" }}
      />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#00D4FF" }}>
            03 / SKILLS
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
            技能专长 ✨
          </h2>
          <p style={{ color: "rgba(160, 200, 240, 0.6)" }}>在AI评测与数据工程领域持续深耕</p>
          <div className="mt-4 flex justify-center">
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, #00D4FF, #7B5EA7)", boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
            />
          </div>
        </div>

        {/* Skill Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1"
              style={{
                background: `${cat.color}06`,
                border: `1px solid ${cat.color}22`,
                boxShadow: `0 0 20px ${cat.color}06`,
              }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cat.color}18`, border: `1px solid ${cat.color}30` }}
                >
                  {cat.icon}
                </div>
                <h3
                  className="font-semibold"
                  style={{ color: cat.color, fontFamily: "'Noto Serif SC', serif" }}
                >
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm" style={{ color: "rgba(180,220,255,0.75)" }}>
                        {skill.name}
                      </span>
                      <span
                        className="text-xs font-semibold"
                        style={{ color: cat.color, textShadow: `0 0 8px ${cat.color}80` }}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <div
                      className="h-1.5 rounded-full overflow-hidden"
                      style={{ background: "rgba(255,255,255,0.06)" }}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}88)`,
                          boxShadow: `0 0 8px ${cat.color}60`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tool Tags */}
        <div
          className="rounded-2xl p-6"
          style={{
            background: "rgba(0, 212, 255, 0.04)",
            border: "1px solid rgba(0, 212, 255, 0.12)",
          }}
        >
          <h3
            className="text-base font-semibold mb-4 flex items-center gap-2"
            style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif" }}
          >
            🏷️ 技术标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {toolTags.map((tag) => (
              <span
                key={tag.name}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                style={{
                  background: `${tag.color}10`,
                  border: `1px solid ${tag.color}28`,
                  color: tag.color,
                  boxShadow: `0 0 8px ${tag.color}15`,
                }}
              >
                <span>{tag.emoji}</span>
                <span>{tag.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
