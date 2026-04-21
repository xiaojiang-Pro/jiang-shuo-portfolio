/**
 * Design: 温暖橘粉渐变风 - 页脚
 * Style: 简洁底部版权信息
 */

export default function Footer() {
  return (
    <footer className="py-6 bg-white border-t border-rose-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-[#4A3728]/50">
          <p>© 2026 姜硕 · Made with 💗</p>
          <p className="flex items-center gap-1">
            <span>🌸</span>
            <span>AI训练师 · 热爱探索</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
