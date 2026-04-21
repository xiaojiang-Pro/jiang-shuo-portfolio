/**
 * Design: 潘多拉星球生物发光蓝色主题 - 联系我区域
 * 新增: 微信二维码展示
 * Layout: 联系信息卡片 + 微信二维码
 */

const WECHAT_QR = "/manus-storage/wechat-qr_acc07144.jpg";

const contactItems = [
  {
    icon: "📱",
    label: "电话",
    value: "17664042185",
    href: "tel:17664042185",
    color: "#00D4FF",
  },
  {
    icon: "📧",
    label: "邮箱",
    value: "2416808530@qq.com",
    href: "mailto:2416808530@qq.com",
    color: "#00FFCC",
  },
  {
    icon: "💬",
    label: "QQ",
    value: "2416808530",
    href: "#",
    color: "#B07BFF",
  },
];

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="py-20 relative overflow-hidden"
      style={{ background: "linear-gradient(180deg, #050A1A 0%, #060D22 50%, #050A1A 100%)" }}
    >
      {/* Ambient glow blobs */}
      <div
        className="absolute top-0 left-0 w-72 h-72 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #00D4FF, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full opacity-8 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #7B5EA7, transparent)" }}
      />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-14">
          <p className="text-sm font-medium tracking-widest uppercase mb-2" style={{ color: "#00D4FF" }}>
            04 / CONNECT
          </p>
          <h2
            className="text-3xl sm:text-4xl font-bold mb-4"
            style={{
              fontFamily: "'Noto Serif SC', serif",
              background: "linear-gradient(90deg, #00D4FF, #00FFCC)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            一起探索AI的无限可能 🌿
          </h2>
          <p className="max-w-lg mx-auto leading-relaxed" style={{ color: "rgba(160, 200, 240, 0.65)" }}>
            无论是AI评测合作、数据工程项目，还是想聊聊大模型的有趣话题，
            都欢迎随时联系我！每一次连接都是新故事的开始。
          </p>
          <div className="mt-4 flex justify-center">
            <div
              className="h-0.5 w-16 rounded-full"
              style={{ background: "linear-gradient(90deg, #00D4FF, #7B5EA7)", boxShadow: "0 0 8px rgba(0,212,255,0.4)" }}
            />
          </div>
        </div>

        {/* Main Content: Contact Cards + WeChat QR */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Left: Contact Info */}
          <div className="space-y-4">
            <h3
              className="text-base font-semibold mb-5"
              style={{ color: "rgba(200,230,255,0.85)", fontFamily: "'Noto Serif SC', serif" }}
            >
              📡 联系方式
            </h3>
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="group flex items-center gap-4 rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 block"
                style={{
                  background: `${item.color}07`,
                  border: `1px solid ${item.color}22`,
                  boxShadow: `0 0 16px ${item.color}06`,
                  textDecoration: "none",
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0"
                  style={{ background: `${item.color}15`, border: `1px solid ${item.color}30` }}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs mb-1" style={{ color: "rgba(160,200,240,0.5)" }}>
                    {item.label}
                  </p>
                  <p
                    className="text-sm font-semibold group-hover:underline"
                    style={{ color: item.color, textShadow: `0 0 10px ${item.color}50` }}
                  >
                    {item.value}
                  </p>
                </div>
              </a>
            ))}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href="mailto:2416808530@qq.com"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #0066CC)",
                  color: "#050A1A",
                  boxShadow: "0 0 20px rgba(0,212,255,0.35)",
                  textDecoration: "none",
                }}
              >
                📧 发送邮件
              </a>
              <a
                href="tel:17664042185"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:scale-105"
                style={{
                  background: "rgba(0, 212, 255, 0.1)",
                  border: "1.5px solid rgba(0, 212, 255, 0.4)",
                  color: "#00D4FF",
                  textDecoration: "none",
                }}
              >
                📱 拨打电话
              </a>
            </div>
          </div>

          {/* Right: WeChat QR Code */}
          <div className="flex flex-col items-center">
            <h3
              className="text-base font-semibold mb-5 self-start"
              style={{ color: "rgba(200,230,255,0.85)", fontFamily: "'Noto Serif SC', serif" }}
            >
              💬 微信扫码添加
            </h3>
            <div
              className="rounded-3xl p-5 flex flex-col items-center gap-4 w-full max-w-xs"
              style={{
                background: "rgba(0, 212, 255, 0.05)",
                border: "1px solid rgba(0, 212, 255, 0.2)",
                boxShadow: "0 0 40px rgba(0, 212, 255, 0.1)",
              }}
            >
              {/* QR Code Image */}
              <div
                className="rounded-2xl overflow-hidden"
                style={{
                  border: "2px solid rgba(0, 212, 255, 0.3)",
                  boxShadow: "0 0 20px rgba(0, 212, 255, 0.15)",
                  width: "220px",
                  height: "220px",
                }}
              >
                <img
                  src={WECHAT_QR}
                  alt="微信二维码 - 五十弦"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* WeChat info */}
              <div className="text-center">
                <p
                  className="text-sm font-semibold mb-1"
                  style={{ color: "#00D4FF", textShadow: "0 0 10px rgba(0,212,255,0.5)" }}
                >
                  微信：五十弦
                </p>
                <p className="text-xs" style={{ color: "rgba(160,200,240,0.55)" }}>
                  扫一扫上面的二维码，加我为朋友
                </p>
              </div>

              {/* Decorative dots */}
              <div className="flex gap-2">
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{
                      background: i === 0 ? "#00D4FF" : i === 1 ? "#00FFCC" : "#B07BFF",
                      animationDelay: `${i * 0.3}s`,
                      boxShadow: `0 0 6px ${i === 0 ? "#00D4FF" : i === 1 ? "#00FFCC" : "#B07BFF"}`,
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer note */}
        <p className="mt-12 text-center text-sm" style={{ color: "rgba(160,200,240,0.3)" }}>
          期待与你在星际相遇 🌿✨
        </p>
      </div>
    </section>
  );
}
