/**
 * Design: 潘多拉星球生物发光蓝色主题 - 工作经历区域
 * Layout: 时间轴 + 可展开项目卡片
 */
import { useState } from "react";

const experiences = [
  {
    company: "海氏海诺健康科技股份有限公司",
    type: "正式工作",
    role: "AI评测组长",
    period: "2025.08 — 2026.04",
    color: "#00D4FF",
    icon: "🏢",
    projects: [
      {
        title: "I2V肢体遮挡与分离评测",
        role: "评测组长",
        tags: ["I2V评测", "肢体推演", "模型选型", "评测报告"],
        detail:
          "负责I2V视频生成中肢体遮挡与分离场景的系统性评测，设计多维度评估框架，对比多款主流模型在肢体推演方面的表现，输出结构化评测报告，为模型选型提供数据支撑。",
      },
      {
        title: "VLM图片理解评测",
        role: "评测组长",
        tags: ["VLM评测", "多维评测体系", "数据集构建", "多模型对比"],
        detail:
          "主导VLM（视觉语言模型）图片理解能力评测项目，构建涵盖空间关系、物体识别、场景理解等维度的评测体系，建立专项数据集，完成多款主流VLM模型横向对比分析。",
      },
      {
        title: "I2V物理规律评测",
        role: "评测组长",
        tags: ["物理推演", "I2V评测", "质量控制", "评测报告"],
        detail:
          "专项负责I2V视频生成中物理规律遵循性评测，包括重力、碰撞、流体等物理现象的生成质量评估，建立物理合理性评分标准，输出系统性评测报告。",
      },
      {
        title: "基于Vibe Coding的数据自动化生产",
        role: "自动化支援",
        achievement: "🎯 数据生产效率大幅提升",
        tags: ["Vibe Coding", "Python自动化", "多线程并发", "Prompt工程"],
        detail:
          "运用Vibe Coding方法，通过Python脚本实现数据生产流程自动化，结合多线程并发处理与Prompt工程优化，显著提升团队数据生产效率，减少人工重复操作。",
      },
    ],
  },
  {
    company: "小红书",
    type: "实习经历",
    role: "AI大模型数据标注",
    period: "2025.01 — 2025.03",
    color: "#FF6B9D",
    icon: "📱",
    projects: [
      {
        title: "AI大模型数据标注项目",
        role: "数据标注",
        achievement: "🎯 标注效率从CPH2提升至CPH6，产出效率提升200%",
        tags: ["数据标注", "Dify平台", "RAG知识库", "Prompt工程"],
        detail:
          "参与小红书AI大模型数据标注项目，通过搭建Dify平台工作流、构建RAG知识库、优化Prompt工程等方式，将个人标注效率从CPH2大幅提升至CPH6，产出效率提升200%。",
      },
    ],
  },
];

export default function ExperienceSection() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setExpanded((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <section
      id="experience"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050A1A 0%, #060D22 100%)" }}
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#00D4FF" }}>
            02 / EXPERIENCE
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
            工作经历 💼
          </h2>
          <p style={{ color: "rgba(160, 200, 240, 0.6)" }}>每一段经历都是成长的印记</p>
          <div className="mt-4 flex justify-center">
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, #00D4FF, #7B5EA7)", boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
            />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-10">
          {experiences.map((exp) => (
            <div key={exp.company} className="relative">
              {/* Company Header */}
              <div
                className="rounded-2xl p-5 mb-4"
                style={{
                  background: `${exp.color}08`,
                  border: `1px solid ${exp.color}25`,
                  boxShadow: `0 0 20px ${exp.color}08`,
                }}
              >
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                    style={{ background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
                  >
                    {exp.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3
                        className="font-bold text-base"
                        style={{ color: "rgba(210,235,255,0.95)", fontFamily: "'Noto Serif SC', serif" }}
                      >
                        {exp.company}
                      </h3>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full font-medium"
                        style={{ background: `${exp.color}18`, color: exp.color, border: `1px solid ${exp.color}35` }}
                      >
                        {exp.type}
                      </span>
                    </div>
                    <p className="text-sm" style={{ color: exp.color }}>
                      {exp.role}
                      <span className="ml-3 text-xs" style={{ color: "rgba(160,200,240,0.5)" }}>
                        {exp.period}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="space-y-3 pl-4">
                {exp.projects.map((proj, pi) => {
                  const key = `${exp.company}-${pi}`;
                  const isOpen = expanded[key];
                  return (
                    <div
                      key={proj.title}
                      className="rounded-xl overflow-hidden transition-all duration-200"
                      style={{
                        background: "rgba(0, 212, 255, 0.04)",
                        border: "1px solid rgba(0, 212, 255, 0.12)",
                      }}
                    >
                      <button
                        className="w-full text-left px-5 py-4"
                        onClick={() => toggle(key)}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-2">
                              <span
                                className="font-semibold text-sm"
                                style={{ color: "rgba(200,230,255,0.9)" }}
                              >
                                {proj.title}
                              </span>
                              <span
                                className="text-xs px-2 py-0.5 rounded-full"
                                style={{
                                  background: "rgba(0,212,255,0.1)",
                                  color: "#00D4FF",
                                  border: "1px solid rgba(0,212,255,0.2)",
                                }}
                              >
                                {proj.role}
                              </span>
                            </div>
                            {proj.achievement && (
                              <p
                                className="text-xs mb-2 font-medium"
                                style={{ color: "#00FFCC", textShadow: "0 0 8px rgba(0,255,200,0.3)" }}
                              >
                                {proj.achievement}
                              </p>
                            )}
                            <div className="flex flex-wrap gap-1.5">
                              {proj.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className="text-xs px-2 py-0.5 rounded-full"
                                  style={{
                                    background: "rgba(123,94,167,0.12)",
                                    color: "rgba(180,150,255,0.8)",
                                    border: "1px solid rgba(123,94,167,0.2)",
                                  }}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <span
                            className="text-xs mt-1 shrink-0 transition-transform duration-200"
                            style={{
                              color: "#00D4FF",
                              transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                          >
                            ▼
                          </span>
                        </div>
                      </button>

                      {isOpen && (
                        <div
                          className="px-5 pb-4"
                          style={{ borderTop: "1px solid rgba(0,212,255,0.08)" }}
                        >
                          <p
                            className="text-sm leading-relaxed pt-3"
                            style={{ color: "rgba(160,200,240,0.7)" }}
                          >
                            {proj.detail}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
