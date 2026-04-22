/**
 * Design: 潘多拉星球生物发光蓝色主题 - 页脚
 * 底部展示官方图鲁克头部特写艺术图
 */
import { TORUK_IMG_3 } from "./LeonopteryxIcon";

export default function Footer() {
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
        style={{
          position: "relative",
          width: "100%",
          overflow: "hidden",
          height: "320px",
        }}
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
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
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
              marginTop: "8px",
              fontFamily: "'Playfair Display', serif",
              textShadow: "0 0 16px rgba(0,212,255,0.5)",
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
