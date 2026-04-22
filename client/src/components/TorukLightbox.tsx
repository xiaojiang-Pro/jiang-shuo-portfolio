/**
 * Design: 潘多拉星球生物发光蓝色主题 - 图鲁克图片灯箱组件
 * 全屏展示图鲁克官方图片，支持ESC关闭、点击背景关闭、键盘左右切换
 */
import { useEffect, useCallback } from "react";

interface TorukLightboxProps {
  images: { src: string; alt: string; title: string; subtitle: string }[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function TorukLightbox({ images, currentIndex, onClose, onNavigate }: TorukLightboxProps) {
  const current = images[currentIndex];

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0) onNavigate(currentIndex - 1);
      if (e.key === "ArrowRight" && currentIndex < images.length - 1) onNavigate(currentIndex + 1);
    },
    [onClose, onNavigate, currentIndex, images.length]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "rgba(0, 0, 0, 0.92)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        animation: "lightbox-fade-in 0.25s ease",
        backdropFilter: "blur(8px)",
      }}
    >
      <style>{`
        @keyframes lightbox-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes lightbox-img-in {
          from { opacity: 0; transform: scale(0.93); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>

      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: "absolute",
          top: "20px",
          right: "24px",
          background: "rgba(255,255,255,0.1)",
          border: "1px solid rgba(255,255,255,0.2)",
          borderRadius: "50%",
          width: "44px",
          height: "44px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          color: "white",
          fontSize: "20px",
          transition: "background 0.2s",
          zIndex: 10000,
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,0.2)")}
        onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,0.1)")}
      >
        ✕
      </button>

      {/* Prev button */}
      {currentIndex > 0 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          style={{
            position: "absolute",
            left: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "50%",
            width: "52px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#00D4FF",
            fontSize: "22px",
            transition: "background 0.2s",
            zIndex: 10000,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,212,255,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
        >
          ‹
        </button>
      )}

      {/* Next button */}
      {currentIndex < images.length - 1 && (
        <button
          onClick={e => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          style={{
            position: "absolute",
            right: "20px",
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,212,255,0.12)",
            border: "1px solid rgba(0,212,255,0.3)",
            borderRadius: "50%",
            width: "52px",
            height: "52px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "#00D4FF",
            fontSize: "22px",
            transition: "background 0.2s",
            zIndex: 10000,
          }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(0,212,255,0.25)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(0,212,255,0.12)")}
        >
          ›
        </button>
      )}

      {/* Image container */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "90vw",
          maxHeight: "90vh",
          animation: "lightbox-img-in 0.3s ease",
        }}
      >
        <img
          src={current.src}
          alt={current.alt}
          style={{
            maxWidth: "100%",
            maxHeight: "78vh",
            objectFit: "contain",
            borderRadius: "12px",
            boxShadow: "0 0 80px rgba(255,107,43,0.25), 0 0 160px rgba(0,0,0,0.6)",
            border: "1px solid rgba(255,140,64,0.2)",
          }}
        />

        {/* Caption */}
        <div style={{ marginTop: "20px", textAlign: "center" }}>
          <div
            style={{
              color: "rgba(255,140,64,0.95)",
              fontSize: "15px",
              letterSpacing: "6px",
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              textShadow: "0 0 20px rgba(255,107,43,0.7)",
            }}
          >
            {current.title}
          </div>
          <div
            style={{
              color: "rgba(0,212,255,0.7)",
              fontSize: "12px",
              letterSpacing: "3px",
              marginTop: "6px",
              fontFamily: "'Playfair Display', serif",
            }}
          >
            {current.subtitle}
          </div>
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: "8px", marginTop: "16px" }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={e => { e.stopPropagation(); onNavigate(i); }}
              style={{
                width: i === currentIndex ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                background: i === currentIndex ? "#FF8C40" : "rgba(255,255,255,0.25)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                padding: 0,
              }}
            />
          ))}
        </div>

        {/* ESC hint */}
        <div
          style={{
            marginTop: "12px",
            color: "rgba(255,255,255,0.3)",
            fontSize: "11px",
            letterSpacing: "2px",
          }}
        >
          ESC 关闭 · ← → 切换
        </div>
      </div>
    </div>
  );
}
