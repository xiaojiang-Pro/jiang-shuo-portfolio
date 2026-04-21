/**
 * Design: 潘多拉星球生物发光蓝色主题 - 页脚
 */

export default function Footer() {
  return (
    <footer
      className="py-6 relative"
      style={{
        background: "#050A1A",
        borderTop: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm">
          <p style={{ color: "rgba(160, 200, 240, 0.4)" }}>
            © 2026 姜硕 · Made with 💙
          </p>
          <p
            className="flex items-center gap-1"
            style={{ color: "rgba(160, 200, 240, 0.4)" }}
          >
            <span style={{ color: "#00D4FF" }}>🌿</span>
            <span>AI训练师 · 探索无限可能</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
