/**
 * Design: 温暖橘粉渐变风 - 关于我区域
 * Layout: 左右两栏，左边个人信息，右边AI插画
 * Colors: 白色卡片 + 粉色边框强调
 */

const AI_ILLUSTRATION_URL = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/ai-work-illustration-i28BhddcqegkH7Suesum6J.webp";

const personalInfo = [
  { label: "姓名", value: "姜硕", icon: "👤" },
  { label: "年龄", value: "24岁", icon: "🎂" },
  { label: "学历", value: "全日制本科", icon: "🎓" },
  { label: "院校", value: "山东外事职业大学", icon: "🏫" },
  { label: "求职意向", value: "AI训练师", icon: "🤖" },
  { label: "邮箱", value: "2416808530@qq.com", icon: "📧" },
  { label: "电话", value: "17664042185", icon: "📱" },
];

const advantages = [
  {
    icon: "🔬",
    title: "多模态评测经验",
    desc: "具备多模态大模型评测经验，能从空间理解、物理推演等维度设计评测体系并输出结构化结论",
  },
  {
    icon: "💻",
    title: "Vibe Coding能力",
    desc: "掌握Vibe Coding，能通过Python脚本自动化完成数据生成、模型调用，显著提升评测效率",
  },
  {
    icon: "✍️",
    title: "Prompt工程优化",
    desc: "PE迭代优化能力，通过Prompt工程多轮迭代，提升模型生成效果",
  },
  {
    icon: "📊",
    title: "逻辑拆解能力",
    desc: "逻辑拆解能力强，擅长将复杂模型能力转化为可量化评测指标",
  },
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-[#C85C72] font-medium tracking-widest uppercase mb-2">
            01 / ABOUT
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#3D2B2B]"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            关于我 🌸
          </h2>
          <p className="mt-3 text-[#4A3728]/60 max-w-md mx-auto">
            一个热爱AI、热爱探索的年轻人
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#C85C72] to-[#F4956A] rounded-full" />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Personal Info */}
          <div className="space-y-6">
            <div
              className="rounded-2xl p-6 border border-rose-100 shadow-sm"
              style={{ background: "linear-gradient(135deg, #FEF6F0, #FDF0F3)" }}
            >
              <h3
                className="text-lg font-semibold text-[#3D2B2B] mb-4"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                个人信息
              </h3>
              <div className="space-y-3">
                {personalInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <span className="text-base w-6">{item.icon}</span>
                    <span className="text-sm text-[#4A3728]/60 w-20 shrink-0">{item.label}</span>
                    <span className="text-sm text-[#3D2B2B] font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="rounded-2xl p-6 bg-white border border-rose-100 shadow-sm">
              <h3
                className="text-lg font-semibold text-[#3D2B2B] mb-4"
                style={{ fontFamily: "'Noto Serif SC', serif" }}
              >
                🎓 教育背景
              </h3>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-lg shrink-0">
                  🏫
                </div>
                <div>
                  <p className="font-semibold text-[#3D2B2B]">山东外事职业大学</p>
                  <p className="text-sm text-[#4A3728]/70 mt-0.5">全日制本科</p>
                  <p className="text-xs text-[#C85C72] mt-1 bg-rose-50 inline-block px-2 py-0.5 rounded-full">
                    2023.09 — 2025.06
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Advantages + Illustration */}
          <div className="space-y-6">
            {/* AI Illustration */}
            <div className="flex justify-center">
              <div
                className="rounded-3xl overflow-hidden shadow-lg animate-float"
                style={{
                  width: "260px",
                  height: "260px",
                  background: "linear-gradient(135deg, #FDF0F3, #FEF0E8)",
                  padding: "16px",
                }}
              >
                <img
                  src={AI_ILLUSTRATION_URL}
                  alt="AI工作插画"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            {/* Advantages Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {advantages.map((adv) => (
                <div
                  key={adv.title}
                  className="rounded-xl p-4 bg-white border border-rose-100 hover:border-rose-300 hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group"
                >
                  <div className="text-2xl mb-2">{adv.icon}</div>
                  <h4 className="text-sm font-semibold text-[#3D2B2B] mb-1 group-hover:text-[#C85C72] transition-colors">
                    {adv.title}
                  </h4>
                  <p className="text-xs text-[#4A3728]/60 leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
