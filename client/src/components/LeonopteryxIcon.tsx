/**
 * Design: 潘多拉星球 - 图鲁克（大霸王翼兽/Great Leonopteryx）写实图片图标
 * 外形特征：橙黄底色+深蓝黑条纹+蓝色冠翼，六肢，锋利尖牙，写实质感
 * 交互：鼠标悬停时发光增强 + 轻微震动 + TORUK MAKTO 文字出现
 */

import { useState } from "react";

const LEONOPTERYX_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663574304740/nQvUHMbHVRipno43td8H67/leonopteryx-realistic-HTJCbdPZmd57PN7iHmEVDn.webp";

export default function LeonopteryxIcon() {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex flex-col items-center justify-center select-none"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Roar text */}
      <div
        style={{
          height: "32px",
          marginBottom: "8px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "scale(1) translateY(0)" : "scale(0.6) translateY(8px)",
          transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          color: "#FF6B2B",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 900,
          fontSize: "18px",
          letterSpacing: "6px",
          textShadow: "0 0 20px rgba(255,107,43,0.9), 0 0 40px rgba(255,107,43,0.5)",
          whiteSpace: "nowrap",
        }}
      >
        ✦ TORUK MAKTO ✦
      </div>

      {/* Image Icon */}
      <div
        style={{
          filter: hovered
            ? "drop-shadow(0 0 30px rgba(255,107,43,0.9)) drop-shadow(0 0 60px rgba(255,107,43,0.5)) brightness(1.1)"
            : "drop-shadow(0 0 15px rgba(255,107,43,0.4)) drop-shadow(0 0 30px rgba(0,212,255,0.2))",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: hovered ? "leonopteryx-roar 0.4s ease-in-out" : "leonopteryx-float 4s ease-in-out infinite",
          width: "220px",
          height: "220px",
        }}
      >
        <img
          src={LEONOPTERYX_IMG}
          alt="图鲁克 - 潘多拉最强飞行生物"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </div>

      {/* Label */}
      <div
        style={{
          marginTop: "10px",
          color: hovered ? "#FF8C40" : "rgba(255,140,64,0.5)",
          fontSize: "11px",
          letterSpacing: "4px",
          fontFamily: "'Playfair Display', serif",
          fontWeight: 600,
          textTransform: "uppercase",
          textShadow: hovered ? "0 0 12px rgba(255,107,43,0.8)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        图鲁克 · 潘多拉最强飞行生物
      </div>

      <style>{`
        @keyframes leonopteryx-float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          25% { transform: translateY(-6px) rotate(1deg); }
          75% { transform: translateY(-3px) rotate(-0.5deg); }
        }
        @keyframes leonopteryx-roar {
          0% { transform: scale(1.08) rotate(0deg); }
          20% { transform: scale(1.12) rotate(-2deg); }
          40% { transform: scale(1.10) rotate(2deg); }
          60% { transform: scale(1.09) rotate(-1deg); }
          80% { transform: scale(1.08) rotate(1deg); }
          100% { transform: scale(1.08) rotate(0deg); }
        }
      `}</style>
    </div>
  );
}
