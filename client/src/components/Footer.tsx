/**
 * Design: 潘多拉星球生物发光蓝色主题 - 页脚
 * 底部展示官方图鲁克头部特写艺术图
 */
import { TORUK_IMG_3 } from "./LeonopteryxIcon";

interface FooterProps {
  onOpenLightbox: (index: number) => void;
}

export default function Footer({ onOpenLightbox }: FooterProps) {
  return (
    <footer
      className="relative"
      style={{
        background: "#050A1A",
        borderTop: "1px solid rgba(0, 212, 255, 0.12)",
      }}
    >
      {/* Toruk Official Image - 底部官方图鲁克图片（头部特写艺术图） */}
      <div
        onClick={() => onOpenLightbox(2)}
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          height: "320px",
          cursor: "pointer",
          transition: "filter 0.25s ease",
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = "brightness(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.filter = "brightness(1)")}
      >
        <img
          src={TORUK_IMG_3}
          alt="图鲁克头部特写 - 阿凡达官方形象"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center top",
            display: "block",
            filter: "brightness(0.85)",
          }}
        />
        {/* 顶部渐隐遮罩 */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "60px",
            background: "linear-gradient(to bottom, #050A1A, transparent)",
          }}
        />
        {/* 底部渐隐遮罩 */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "linear-gradient(to bottom, transparent, #050A1A)",
          }}
        />
        {/* 中心标题 */}
        <div
          style={{
            position: "absolute",
            bottom: "110px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "10px",
          }}
        >
          <div
            style={{
              color: "rgba(255,140,64,0.95)",
              fontSize: "14px",
              letterSpacing: "8px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 900,
              textShadow: "0 0 30px rgba(255,107,43,0.9), 0 2px 20px rgba(0,0,0,0.8)",
              whiteSpace: "nowrap",
            }}
          >
            ✦ TORUK MAKTO ✦
          </div>
          <div
            style={{
              color: "rgba(0,212,255,0.7)",
              fontSize: "11px",
              letterSpacing: "4px",
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 0 16px rgba(0,212,255,0.5)",
              whiteSpace: "nowrap",
            }}
          >
            潘多拉最强飞行生物
          </div>
        </div>
      </div>

      {/* Footer text */}
      <div className="py-6">
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
      </div>
    </footer>
  );
}
