/**
 * Design: 潘多拉星球 - 图鲁克（大霸王翼兽/Great Leonopteryx）SVG图标
 * 外形特征：橙红色鳞甲+黑色条纹+蓝色头冠，六肢，嘴巴含密集尖牙
 * 交互：鼠标悬停时张嘴怒吼 + 发光增强 + 轻微震动
 */

import { useState } from "react";

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

      {/* SVG Icon */}
      <div
        style={{
          filter: hovered
            ? "drop-shadow(0 0 30px rgba(255,107,43,0.9)) drop-shadow(0 0 60px rgba(255,107,43,0.5))"
            : "drop-shadow(0 0 15px rgba(255,107,43,0.4)) drop-shadow(0 0 30px rgba(0,212,255,0.2))",
          transform: hovered ? "scale(1.08)" : "scale(1)",
          transition: "all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
          animation: hovered ? "leonopteryx-roar 0.4s ease-in-out" : "leonopteryx-float 4s ease-in-out infinite",
        }}
      >
        <svg
          width="220"
          height="200"
          viewBox="0 0 220 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* === WINGS === */}
          {/* Left wing - upper */}
          <path
            d="M110 90 C85 75, 55 60, 20 45 C35 65, 50 75, 70 85 C50 80, 25 78, 5 72 C20 88, 45 92, 70 90 C50 92, 30 98, 15 108 C35 108, 58 102, 75 96 Z"
            fill="#C84B0A"
            opacity="0.92"
          />
          <path
            d="M110 90 C85 75, 55 60, 20 45 C35 65, 50 75, 70 85"
            stroke="#1A0800"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Left wing stripes */}
          <path d="M90 82 C75 72, 55 62, 35 52" stroke="#1A0800" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M80 87 C65 80, 45 73, 28 68" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M70 91 C55 87, 38 83, 22 80" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

          {/* Right wing - upper */}
          <path
            d="M110 90 C135 75, 165 60, 200 45 C185 65, 170 75, 150 85 C170 80, 195 78, 215 72 C200 88, 175 92, 150 90 C170 92, 190 98, 205 108 C185 108, 162 102, 145 96 Z"
            fill="#C84B0A"
            opacity="0.92"
          />
          <path
            d="M110 90 C135 75, 165 60, 200 45 C185 65, 170 75, 150 85"
            stroke="#1A0800"
            strokeWidth="1.5"
            fill="none"
            opacity="0.6"
          />
          {/* Right wing stripes */}
          <path d="M130 82 C145 72, 165 62, 185 52" stroke="#1A0800" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M140 87 C155 80, 175 73, 192 68" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M150 91 C165 87, 182 83, 198 80" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

          {/* === BODY === */}
          <ellipse cx="110" cy="108" rx="28" ry="20" fill="#D4520F" />
          {/* Body stripes */}
          <path d="M88 100 C95 96, 105 95, 115 96" stroke="#1A0800" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
          <path d="M86 107 C94 103, 106 102, 118 103" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M88 114 C96 111, 108 110, 120 111" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

          {/* === NECK === */}
          <path
            d="M98 92 C100 78, 104 68, 108 60 C112 68, 116 78, 118 92 Z"
            fill="#D4520F"
          />
          <path d="M103 88 C104 78, 106 70, 108 62" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
          <path d="M113 88 C112 78, 110 70, 108 62" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />

          {/* === HEAD === */}
          {/* Head base */}
          <ellipse cx="108" cy="54" rx="22" ry="16" fill="#D4520F" />
          {/* Head stripes */}
          <path d="M90 50 C96 46, 104 44, 112 45" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" opacity="0.7" />
          <path d="M88 57 C95 54, 104 53, 114 54" stroke="#1A0800" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />

          {/* === BLUE CREST / 蓝色头冠 === */}
          <path
            d="M96 44 C98 32, 100 22, 102 14 C104 22, 105 30, 106 38"
            stroke="#0088CC"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          <path
            d="M102 42 C104 28, 106 16, 108 8 C110 16, 112 28, 113 40"
            stroke="#00AAEE"
            strokeWidth="4"
            strokeLinecap="round"
            fill="none"
            opacity="0.95"
          />
          <path
            d="M108 40 C110 26, 113 14, 116 6 C117 14, 117 26, 117 38"
            stroke="#0088CC"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            opacity="0.9"
          />
          {/* Crest glow tips */}
          <circle cx="102" cy="14" r="3" fill="#00D4FF" opacity="0.9" style={{ filter: "blur(1px)" }} />
          <circle cx="108" cy="8" r="4" fill="#00AAEE" opacity="0.95" style={{ filter: "blur(1px)" }} />
          <circle cx="116" cy="6" r="3" fill="#00D4FF" opacity="0.9" style={{ filter: "blur(1px)" }} />

          {/* === EYE === */}
          <ellipse cx="100" cy="50" rx="6" ry="5" fill="#FF8C00" />
          <ellipse cx="100" cy="50" rx="3.5" ry="4" fill="#CC4400" />
          <ellipse cx="100" cy="50" rx="2" ry="3" fill="#1A0000" />
          <circle cx="101" cy="49" r="1" fill="rgba(255,255,255,0.7)" />
          {/* Eye glow */}
          <ellipse cx="100" cy="50" rx="7" ry="6" fill="none" stroke="#FF6B00" strokeWidth="1" opacity="0.5" />

          {/* === MOUTH / 嘴巴 === */}
          {/* Upper jaw */}
          <path
            d="M86 60 C90 56, 96 54, 102 54 C108 54, 116 56, 122 60 C118 62, 112 63, 108 63 C104 63, 96 62, 86 60 Z"
            fill="#B83A08"
          />
          {/* Lower jaw - animated open/close */}
          <g
            style={{
              transformOrigin: "104px 64px",
              transform: hovered ? "rotate(22deg)" : "rotate(0deg)",
              transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <path
              d="M86 60 C90 64, 96 66, 104 66 C110 66, 116 64, 122 60 C118 65, 112 70, 104 72 C96 70, 90 65, 86 60 Z"
              fill="#8B2A04"
            />
            {/* Lower teeth */}
            {hovered && (
              <>
                <path d="M91 63 L90 69 L93 63" fill="#E8E0D0" opacity="0.95" />
                <path d="M96 65 L95 72 L98 65" fill="#E8E0D0" opacity="0.95" />
                <path d="M101 66 L100 74 L103 66" fill="#E8E0D0" opacity="0.95" />
                <path d="M106 66 L105 73 L108 66" fill="#E8E0D0" opacity="0.95" />
                <path d="M111 65 L110 71 L113 65" fill="#E8E0D0" opacity="0.95" />
                <path d="M116 63 L115 68 L118 63" fill="#E8E0D0" opacity="0.95" />
              </>
            )}
          </g>
          {/* Upper teeth */}
          {hovered && (
            <>
              <path d="M91 61 L90 55 L93 61" fill="#F0E8D8" opacity="0.95" />
              <path d="M96 60 L95 53 L98 60" fill="#F0E8D8" opacity="0.95" />
              <path d="M101 59 L100 52 L103 59" fill="#F0E8D8" opacity="0.95" />
              <path d="M106 59 L105 52 L108 59" fill="#F0E8D8" opacity="0.95" />
              <path d="M111 60 L110 53 L113 60" fill="#F0E8D8" opacity="0.95" />
              <path d="M116 61 L115 55 L118 61" fill="#F0E8D8" opacity="0.95" />
              {/* Inner mouth glow */}
              <ellipse cx="104" cy="64" rx="14" ry="6" fill="#FF4400" opacity="0.4" style={{ filter: "blur(3px)" }} />
            </>
          )}

          {/* === TAIL === */}
          <path
            d="M110 126 C112 138, 118 148, 128 158 C122 152, 120 144, 118 136 C122 144, 128 154, 136 162 C128 152, 124 140, 122 128"
            stroke="#C84B0A"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Tail tip */}
          <ellipse cx="136" cy="164" rx="5" ry="3" fill="#0088CC" transform="rotate(-30 136 164)" />

          {/* === FRONT LIMBS (小前肢) === */}
          <path d="M96 112 C88 118, 82 124, 78 130" stroke="#B83A08" strokeWidth="4" strokeLinecap="round" />
          <path d="M78 130 C75 133, 73 132, 74 128" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" />
          <path d="M78 130 C76 134, 74 134, 75 130" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" />

          <path d="M122 112 C130 118, 136 124, 140 130" stroke="#B83A08" strokeWidth="4" strokeLinecap="round" />
          <path d="M140 130 C143 133, 145 132, 144 128" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" />
          <path d="M140 130 C142 134, 144 134, 143 130" stroke="#1A0800" strokeWidth="2" strokeLinecap="round" />

          {/* === BIOLUMINESCENT GLOW ACCENTS === */}
          {/* Blue crest glow */}
          <path
            d="M102 14 C104 28, 108 8, 116 6"
            stroke="#00D4FF"
            strokeWidth="8"
            strokeLinecap="round"
            fill="none"
            opacity={hovered ? "0.35" : "0.15"}
            style={{ filter: "blur(4px)", transition: "opacity 0.3s" }}
          />
          {/* Eye glow */}
          <circle
            cx="100"
            cy="50"
            r="10"
            fill="#FF6B00"
            opacity={hovered ? "0.3" : "0.1"}
            style={{ filter: "blur(5px)", transition: "opacity 0.3s" }}
          />
          {/* Body outline glow */}
          <ellipse
            cx="110"
            cy="108"
            rx="30"
            ry="22"
            fill="none"
            stroke="#FF6B2B"
            strokeWidth="2"
            opacity={hovered ? "0.5" : "0.15"}
            style={{ filter: "blur(2px)", transition: "opacity 0.3s" }}
          />
        </svg>
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
