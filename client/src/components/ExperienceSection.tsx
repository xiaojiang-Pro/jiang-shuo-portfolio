/**
 * Design: 温暖橘粉渐变风 - 工作经历区域
 * Layout: 时间轴形式，项目卡片展开
 * Colors: 粉色时间轴 + 白色卡片 + 玫瑰色左边框
 */
import { useState } from "react";

const experiences = [
  {
    company: "海氏海诺健康科技股份有限公司",
    period: "2025.08 — 2026.04",
    role: "AI评测组长",
    type: "正式工作",
    color: "#C85C72",
    projects: [
      {
        name: "I2V肢体遮挡与分离评测",
        role: "评测组长",
        bg: "聚焦国内顶尖大模型在图生视频中的人物肢体推演能力，通过拆解指令逻辑与肢体姿态，系统评估模型在复杂场景下的还原精度、结构可控性及常识合理性，为公司视频生成技术选型提供可量化决策依据。",
        works: [
          "主导测评方案设计、素材准备，严格控制变量，系统评估模型肢体动作还原精度及合理性",
          "统一整理评分数据、质检结果，对比分析与撰写评测报告，整理case，为视觉生成技术模型选型提供量化决策依据",
          "负责I2V持续评测，覆盖多个版本迭代周期，跟进模型能力",
        ],
        tags: ["I2V评测", "肢体推演", "模型选型", "评测报告"],
      },
      {
        name: "VLM图片理解评测",
        role: "评测组长",
        bg: "面向多模态大模型在视觉问答、内容理解等业务场景中的应用需求，构建系统化评测体系，对模型在复杂视觉场景下的理解能力进行量化评估，支撑模型选型与能力优化。",
        works: [
          "拆解视觉理解能力，设计涵盖完整性、内容准确性、丰富度和语言质量的多维评测体系",
          "构建高质量评测数据集，并制定标准化标注规范",
          "对比分析多模型表现，归因识别错误、动作描述错误与背景描述错误等典型问题",
          "输出结构化评测报告，为业务模型选型与应用落地提供数据支持",
        ],
        tags: ["VLM评测", "多维评测体系", "数据集构建", "多模型对比"],
      },
      {
        name: "I2V物理规律评测",
        role: "评测组长",
        bg: "聚焦国内顶尖大模型在图像生成视频中的物理推演能力，系统性评估其在复杂视觉场景下的还原精度、结构可控性与常识合理性，为公司视觉生成技术选型提供可量化参考。",
        works: [
          "主导I2V图生视频模型评测项目，从测评方案设计、素材准备到生成执行及评分",
          "统一控制测试变量与质量标准，系统评估模型物理合理性、结构可控性及视觉还原精度",
          "撰写完整评测报告与对比分析，整合模型信息、评分数据及视觉示例",
        ],
        tags: ["物理推演", "I2V评测", "质量控制", "评测报告"],
      },
      {
        name: "基于Vibe Coding的数据自动化生产",
        role: "自动化支援",
        bg: "算法团队在提升模型「情感表达」能力的微调阶段，面临高质量训练样本匮乏的问题。传统方式每人每天只能生产约100条数据，无法支撑大规模深度学习所需的万级数据量。",
        works: [
          "运用Trae开发Python自动化合成脚本，接入大模型API实现从「需求输入」到「文本生成」的全链路自动化",
          "设计并实现多线程并发处理机制，将数据生产时间大幅降低，极大提升单位时间内的数据生产量",
          "通过动态Prompt工程及多模型交叉生成策略，有效降低样本重复率，确保训练集具备丰富的情绪粒度和语态分布",
        ],
        tags: ["Vibe Coding", "Python自动化", "多线程并发", "Prompt工程"],
        highlight: "数据生产效率大幅提升",
      },
    ],
  },
  {
    company: "小红书",
    period: "2025.01 — 2025.03",
    role: "AI大模型数据标注",
    type: "实习经历",
    color: "#F4956A",
    projects: [
      {
        name: "AI大模型数据标注项目",
        role: "数据标注",
        bg: "针对旅游攻略场景中的数百条用户评论进行情感分类识别，人工提取高频关键词并撰写决策建议。初始CPH仅为2，面临评论篇幅长、统计维度多、人工阅读重复性强等瓶颈。",
        works: [
          "利用「Dify」平台构建AI工作流，编写结构化Prompt实现评论分类、高频词统计与内容摘要",
          "通过上传数据集构建RAG知识库，实现仅需输入Query，系统即可自动关联匹配上百条评论正文",
          "设计输出模板，使AI能够自动对景点、餐饮、设施、细节等维度进行提及次数统计及总结",
        ],
        tags: ["数据标注", "Dify平台", "RAG知识库", "Prompt工程"],
        highlight: "标注效率从CPH2提升至CPH6，产出效率提升200%",
      },
    ],
  },
];

export default function ExperienceSection() {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);

  const toggleProject = (key: string) => {
    setExpandedProject(expandedProject === key ? null : key);
  };

  return (
    <section
      id="experience"
      className="py-20"
      style={{ background: "linear-gradient(180deg, #FEF6F0 0%, #FDF0F3 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="text-sm text-[#C85C72] font-medium tracking-widest uppercase mb-2">
            02 / EXPERIENCE
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold text-[#3D2B2B]"
            style={{ fontFamily: "'Noto Serif SC', serif" }}
          >
            工作经历 💼
          </h2>
          <p className="mt-3 text-[#4A3728]/60 max-w-md mx-auto">
            每一段经历都是成长的印记
          </p>
          <div className="mt-4 flex justify-center">
            <div className="h-0.5 w-16 bg-gradient-to-r from-[#C85C72] to-[#F4956A] rounded-full" />
          </div>
        </div>

        {/* Timeline */}
        <div className="space-y-12">
          {experiences.map((exp, expIdx) => (
            <div key={exp.company} className="relative">
              {/* Company Header */}
              <div className="flex items-start gap-4 mb-6">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl font-bold shrink-0 shadow-md"
                  style={{ background: `linear-gradient(135deg, ${exp.color}, ${exp.color}99)` }}
                >
                  {expIdx === 0 ? "🏢" : "📱"}
                </div>
                <div>
                  <div className="flex items-center gap-3 flex-wrap">
                    <h3
                      className="text-xl font-bold text-[#3D2B2B]"
                      style={{ fontFamily: "'Noto Serif SC', serif" }}
                    >
                      {exp.company}
                    </h3>
                    <span
                      className="text-xs px-2.5 py-1 rounded-full font-medium"
                      style={{
                        background: `${exp.color}20`,
                        color: exp.color,
                      }}
                    >
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-sm text-[#4A3728]/60">{exp.role}</span>
                    <span className="text-xs text-[#C85C72] bg-rose-50 px-2 py-0.5 rounded-full">
                      {exp.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Projects */}
              <div className="ml-16 space-y-4">
                {exp.projects.map((proj, projIdx) => {
                  const key = `${expIdx}-${projIdx}`;
                  const isExpanded = expandedProject === key;

                  return (
                    <div
                      key={proj.name}
                      className="bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-md transition-all duration-200"
                      style={{ borderLeft: `3px solid ${exp.color}` }}
                    >
                      {/* Project Header - Clickable */}
                      <button
                        className="w-full text-left p-5 flex items-start justify-between gap-4"
                        onClick={() => toggleProject(key)}
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-semibold text-[#3D2B2B]">{proj.name}</h4>
                            <span
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: `${exp.color}15`,
                                color: exp.color,
                              }}
                            >
                              {proj.role}
                            </span>
                          </div>
                          {proj.highlight && (
                            <p className="text-xs text-[#C85C72] mt-1 font-medium">
                              🎯 {proj.highlight}
                            </p>
                          )}
                          {/* Tags */}
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            {proj.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-0.5 rounded-full bg-rose-50 text-[#4A3728]/70"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        <span
                          className={`text-[#C85C72] transition-transform duration-200 mt-1 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        >
                          ▼
                        </span>
                      </button>

                      {/* Expanded Content */}
                      {isExpanded && (
                        <div className="px-5 pb-5 border-t border-rose-50">
                          {/* Background */}
                          <div className="mt-4 p-3 rounded-xl bg-rose-50/50 text-sm text-[#4A3728]/70 leading-relaxed">
                            <span className="font-medium text-[#C85C72]">项目背景：</span>
                            {proj.bg}
                          </div>

                          {/* Work items */}
                          <div className="mt-4 space-y-2">
                            <p className="text-sm font-medium text-[#3D2B2B]">核心工作内容：</p>
                            {proj.works.map((work, i) => (
                              <div key={i} className="flex items-start gap-2 text-sm text-[#4A3728]/70">
                                <span
                                  className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs shrink-0 mt-0.5"
                                  style={{ background: exp.color }}
                                >
                                  {i + 1}
                                </span>
                                <span className="leading-relaxed">{work}</span>
                              </div>
                            ))}
                          </div>
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
