/**
 * Design: 温暖橘粉渐变风 - 技能专长区域
 * Layout: 技能卡片 + 工具标签云
 * Colors: 白色背景 + 粉色渐变标签
 */

const SKILLS_DECO_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/skills-decoration-PTKqcRugGuPnsaeyWzrDEt.webp";

const skillCategories = [
  {
    icon: "🔬",
    title: "AI评测能力",
    color: "#C85C72",
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
    color: "#F4956A",
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
    color: "#9B7FBD",
    skills: [
      { name: "Dify平台", level: 85 },
      { name: "RAG知识库构建", level: 80 },
      { name: "Trae开发工具", level: 78 },
      { name: "大模型API调用", level: 88 },
    ],
  },
];

const toolTags = [
  { name: "Python", emoji: "🐍" },
  { name: "Prompt Engineering", emoji: "✍️" },
  { name: "Dify", emoji: "⚡" },
  { name: "RAG", emoji: "📚" },
  { name: "Trae", emoji: "🛠️" },
  { name: "多模态评测", emoji: "🔬" },
  { name: "I2V评测", emoji: "🎬" },
  { name: "VLM评测", emoji: "👁️" },
  { name: "数据标注", emoji: "🏷️" },
  { name: "多线程并发", emoji: "⚡" },
  { name: "数据自动化", emoji: "🤖" },
  { name: "评测报告", emoji: "📊" },
];

export default function SkillsSection() {
  return (
    <section id="skills" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-[#C85C72] font-medium tracking-widest uppercase mb-2">
            03 / SKILLS
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#3D2B2B]"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            技能专长 ✨
          </h2>
          <p className="mt-3 text-[#4A3728]/60 max-w-md mx-auto">
            在AI评测与数据工程领域持续深耕
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#C85C72] to-[#F4956A] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {skillCategories.map((cat) => (
            <div
              key={cat.title}
              className="rounded-2xl p-6 border border-rose-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              style={{ background: "linear-gradient(135deg, #FEF6F0, #FFFFFF)" }}
            >
              <div className="flex items-center gap-3 mb-5">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-xl"
                  style={{ background: `${cat.color}20` }}
                >
                  {cat.icon}
                </div>
                <h3
                  className="font-semibold text-[#3D2B2B]"
                  style={{ fontFamily: "'Noto Serif SC', serif" }}
                >
                  {cat.title}
                </h3>
              </div>

              <div className="space-y-4">
                {cat.skills.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-1.5">
                      <span className="text-sm text-[#4A3728]/80">{skill.name}</span>
                      <span className="text-xs font-medium" style={{ color: cat.color }}>
                        {skill.level}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-rose-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{
                          width: `${skill.level}%`,
                          background: `linear-gradient(90deg, ${cat.color}, ${cat.color}99)`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tool Tags + Illustration */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
          <div className="lg:col-span-2">
            <h3
              className="text-lg font-semibold text-[#3D2B2B] mb-4"
              style={{ fontFamily: "'Noto Serif SC', serif" }}
            >
              🏷️ 技术标签
            </h3>
            <div className="flex flex-wrap gap-2">
              {toolTags.map((tag, i) => (
                <span
                  key={tag.name}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium border transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm cursor-default"
                  style={{
                    background: i % 3 === 0
                      ? "#FEF0F3"
                      : i % 3 === 1
                      ? "#FEF4EE"
                      : "#F5F0FE",
                    borderColor: i % 3 === 0
                      ? "#F4A7B9"
                      : i % 3 === 1
                      ? "#F4C5A7"
                      : "#C4B0E8",
                    color: i % 3 === 0
                      ? "#C85C72"
                      : i % 3 === 1
                      ? "#C87040"
                      : "#7B5EA7",
                  }}
                >
                  <span>{tag.emoji}</span>
                  <span>{tag.name}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="flex justify-center">
            <div
              className="rounded-3xl overflow-hidden shadow-lg animate-float"
              style={{ width: "220px", height: "220px" }}
            >
              <img
                src={SKILLS_DECO_URL}
                alt="技能装饰插画"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
