/**
 * Design: 温暖橘粉渐变风 - 联系我区域
 * Layout: 居中大字号CTA + 联系信息卡片
 * Colors: 粉色渐变背景 + 白色卡片
 */

const contactItems = [
  {
    icon: "📱",
    label: "电话",
    value: "17664042185",
    href: "tel:17664042185",
    color: "#C85C72",
  },
  {
    icon: "📧",
    label: "邮箱",
    value: "2416808530@qq.com",
    href: "mailto:2416808530@qq.com",
    color: "#F4956A",
  },
  {
    icon: "💬",
    label: "QQ",
    value: "2416808530",
    href: "#",
    color: "#9B7FBD",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #FDF0F3 0%, #FEF0E8 50%, #FDF0F3 100%)",
      }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 left-0 w-64 h-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4A7B9, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-15 blur-3xl"
        style={{ background: "radial-gradient(circle, #F4956A, transparent)" }}
      />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Section Header */}
        <p className="text-sm text-[#C85C72] font-medium tracking-widest uppercase mb-2">
          04 / CONNECT
        </p>
        <h2
          className="text-3xl sm:text-4xl font-bold text-[#3D2B2B] mb-4"
          style={{ fontFamily: "'Noto Serif SC', serif" }}
        >
          一起探索AI的无限可能 🌸
        </h2>
        <p className="text-[#4A3728]/70 max-w-lg mx-auto leading-relaxed mb-10">
          无论是AI评测合作、数据工程项目，还是想聊聊大模型的有趣话题，
          都欢迎随时联系我！每一次连接都是新故事的开始。
        </p>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-6 border border-rose-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 block"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3"
                style={{ background: `${item.color}15` }}
              >
                {item.icon}
              </div>
              <p className="text-xs text-[#4A3728]/50 mb-1">{item.label}</p>
              <p
                className="text-sm font-medium group-hover:underline transition-colors"
                style={{ color: item.color }}
              >
                {item.value}
              </p>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href="mailto:2416808530@qq.com"
            className="inline-flex items-center justify-center gap-2 bg-[#C85C72] hover:bg-[#B04A60] text-white rounded-full px-8 py-3 font-medium shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-0.5"
          >
            📧 发送邮件
          </a>
          <a
            href="tel:17664042185"
            className="inline-flex items-center justify-center gap-2 bg-white/80 hover:bg-white border-2 border-[#C85C72] text-[#C85C72] rounded-full px-8 py-3 font-medium transition-all duration-200 hover:-translate-y-0.5"
          >
            📱 拨打电话
          </a>
        </div>

        {/* Decorative text */}
        <p className="mt-10 text-[#4A3728]/30 text-sm">
          期待与你的相遇 ✨
        </p>
      </div>
    </section>
  );
}
