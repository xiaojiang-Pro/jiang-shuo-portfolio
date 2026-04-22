/**
 * Design: 潘多拉星球 - 图鲁克（大霸王翼兽/Great Leonopteryx）官方图片展示
 * 使用用户提供的三张官方图鲁克图片，分别放置在网站不同位置
 * 图1（头部特写艺术图）→ 底部装饰区
 * 图2（仰视飞翔全身）→ 中间区域
 * 图3（飞行仰视特写）→ 顶部区域
 */

import { useState } from "react";

// 用户提供的三张官方图鲁克图片
export const TORUK_IMG_1 = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663574304740/vhxdzQzSJhFneqFW.webp"; // 飞行仰视图（蓝天背景）
export const TORUK_IMG_2 = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663574304740/PMxEgaEDHtaGHJaF.jpg";  // 仰视飞翔全身（金黄翼膜）
export const TORUK_IMG_3 = "https://files.manuscdn.com/user_upload_by_module/session_file/310519663574304740/syvVMomHhGMRRorr.jpg";  // 头部特写艺术图（蓝色背景）

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

      {/* Image Icon - 使用第一张官方图（飞行仰视蓝天） */}
      <div
        style={{
          filter: hovered
            ? "drop-shadow(0 0 30px rgba(255,107,43,0.9)) drop-shadow(0 0 60px rgba(255,107,43,0.5)) brightness(1.1)"
            : "drop-shadow(0 0 15px rgba(255,107,43,0.4)) drop-shadow(0 0 30px rgba(0,212,255,0.2))",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: hovered ? "leonopteryx-roar 0.4s ease-in-out" : "leonopteryx-float 4s ease-in-out infinite",
          width: "380px",
          height: "240px",
        }}
      >
        <img
          src={TORUK_IMG_1}
          alt="图鲁克 - 潘多拉最强飞行生物"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            borderRadius: "12px",
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
