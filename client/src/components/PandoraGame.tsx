/**
 * Design: 潘多拉星球主题 - 纳威人对抗侵略者小游戏
 * Game: 纳威人（玩家）躲避并反击侵略者（RDA士兵/机甲）
 * Controls: 方向键/WASD移动，空格键射箭反击
 */
import { useEffect, useRef, useState, useCallback } from "react";

interface GameState {
  playerX: number;
  playerY: number;
  playerHP: number;
  score: number;
  level: number;
  gameOver: boolean;
  gameWon: boolean;
  running: boolean;
}

interface Enemy {
  id: number;
  x: number;
  y: number;
  hp: number;
  maxHp: number;
  type: "soldier" | "mech";
  dx: number;
  dy: number;
  shootTimer: number;
}

interface Bullet {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  fromPlayer: boolean;
}

interface Particle {
  id: number;
  x: number;
  y: number;
  life: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
}

const CANVAS_W = 700;
const CANVAS_H = 480;
const PLAYER_SIZE = 28;
const ENEMY_SIZE = 30;
const BULLET_SPEED = 7;
const PLAYER_SPEED = 4;
const PLAYER_MAX_HP = 5;

let nextId = 0;
const getId = () => ++nextId;

export default function PandoraGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<{
    player: { x: number; y: number; hp: number; invincible: number };
    enemies: Enemy[];
    playerBullets: Bullet[];
    enemyBullets: Bullet[];
    particles: Particle[];
    keys: Record<string, boolean>;
    score: number;
    level: number;
    gameOver: boolean;
    gameWon: boolean;
    running: boolean;
    shootCooldown: number;
    waveTimer: number;
    enemiesKilled: number;
    totalToKill: number;
  }>({
    player: { x: CANVAS_W / 2, y: CANVAS_H - 80, hp: PLAYER_MAX_HP, invincible: 0 },
    enemies: [],
    playerBullets: [],
    enemyBullets: [],
    particles: [],
    keys: {},
    score: 0,
    level: 1,
    gameOver: false,
    gameWon: false,
    running: false,
    shootCooldown: 0,
    waveTimer: 0,
    enemiesKilled: 0,
    totalToKill: 10,
  });

  const [displayState, setDisplayState] = useState<GameState>({
    playerX: CANVAS_W / 2,
    playerY: CANVAS_H - 80,
    playerHP: PLAYER_MAX_HP,
    score: 0,
    level: 1,
    gameOver: false,
    gameWon: false,
    running: false,
  });

  const animRef = useRef<number>(0);

  const spawnEnemy = useCallback((level: number) => {
    const isMech = level >= 2 && Math.random() < 0.3;
    const side = Math.floor(Math.random() * 3);
    let x = 0, y = 0;
    if (side === 0) { x = Math.random() * CANVAS_W; y = -40; }
    else if (side === 1) { x = -40; y = Math.random() * (CANVAS_H * 0.6); }
    else { x = CANVAS_W + 40; y = Math.random() * (CANVAS_H * 0.6); }

    const s = stateRef.current;
    const speed = 0.8 + level * 0.25;
    const dx = (s.player.x - x) / 200 * speed;
    const dy = (s.player.y - y) / 200 * speed;
    s.enemies.push({
      id: getId(),
      x, y,
      hp: isMech ? 4 : 2,
      maxHp: isMech ? 4 : 2,
      type: isMech ? "mech" : "soldier",
      dx: dx + (Math.random() - 0.5) * 0.5,
      dy: dy + (Math.random() - 0.5) * 0.5,
      shootTimer: Math.random() * 120,
    });
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8) => {
    const s = stateRef.current;
    for (let i = 0; i < count; i++) {
      s.particles.push({
        id: getId(),
        x, y,
        life: 30 + Math.random() * 20,
        color,
        size: 3 + Math.random() * 4,
        vx: (Math.random() - 0.5) * 5,
        vy: (Math.random() - 0.5) * 5,
      });
    }
  }, []);

  const startGame = useCallback(() => {
    const s = stateRef.current;
    s.player = { x: CANVAS_W / 2, y: CANVAS_H - 80, hp: PLAYER_MAX_HP, invincible: 0 };
    s.enemies = [];
    s.playerBullets = [];
    s.enemyBullets = [];
    s.particles = [];
    s.score = 0;
    s.level = 1;
    s.gameOver = false;
    s.gameWon = false;
    s.running = true;
    s.shootCooldown = 0;
    s.waveTimer = 0;
    s.enemiesKilled = 0;
    s.totalToKill = 10;
    setDisplayState(prev => ({ ...prev, running: true, gameOver: false, gameWon: false, score: 0, level: 1, playerHP: PLAYER_MAX_HP }));
  }, []);

  const gameLoop = useCallback(() => {
    const s = stateRef.current;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    if (!s.running) {
      animRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    // --- UPDATE ---
    const { keys, player } = s;

    // Player movement
    if ((keys["ArrowLeft"] || keys["a"] || keys["A"]) && player.x > PLAYER_SIZE) player.x -= PLAYER_SPEED;
    if ((keys["ArrowRight"] || keys["d"] || keys["D"]) && player.x < CANVAS_W - PLAYER_SIZE) player.x += PLAYER_SPEED;
    if ((keys["ArrowUp"] || keys["w"] || keys["W"]) && player.y > CANVAS_H / 2) player.y -= PLAYER_SPEED;
    if ((keys["ArrowDown"] || keys["s"] || keys["S"]) && player.y < CANVAS_H - PLAYER_SIZE) player.y += PLAYER_SPEED;

    // Player shoot
    if (s.shootCooldown > 0) s.shootCooldown--;
    if ((keys[" "] || keys["Space"]) && s.shootCooldown === 0) {
      s.playerBullets.push({ id: getId(), x: player.x, y: player.y - 20, dx: 0, dy: -BULLET_SPEED, fromPlayer: true });
      // Spread shots at higher levels
      if (s.level >= 2) {
        s.playerBullets.push({ id: getId(), x: player.x, y: player.y - 20, dx: -2, dy: -BULLET_SPEED + 1, fromPlayer: true });
        s.playerBullets.push({ id: getId(), x: player.x, y: player.y - 20, dx: 2, dy: -BULLET_SPEED + 1, fromPlayer: true });
      }
      s.shootCooldown = 12;
    }

    // Spawn enemies
    s.waveTimer++;
    const spawnInterval = Math.max(60, 120 - s.level * 15);
    if (s.waveTimer % spawnInterval === 0 && s.enemies.length < 8) {
      spawnEnemy(s.level);
    }

    // Update enemies
    s.enemies.forEach(e => {
      // Move toward player with slight randomness
      const angle = Math.atan2(player.y - e.y, player.x - e.x);
      const speed = (e.type === "mech" ? 0.6 : 1.0) + s.level * 0.1;
      e.dx = Math.cos(angle) * speed * 0.3 + e.dx * 0.7;
      e.dy = Math.sin(angle) * speed * 0.3 + e.dy * 0.7;
      e.x += e.dx;
      e.y += e.dy;

      // Enemy shoot
      e.shootTimer--;
      if (e.shootTimer <= 0) {
        const bAngle = Math.atan2(player.y - e.y, player.x - e.x);
        const bSpeed = 3.5 + s.level * 0.3;
        s.enemyBullets.push({
          id: getId(),
          x: e.x, y: e.y,
          dx: Math.cos(bAngle) * bSpeed,
          dy: Math.sin(bAngle) * bSpeed,
          fromPlayer: false,
        });
        e.shootTimer = (e.type === "mech" ? 80 : 120) - s.level * 8;
      }
    });

    // Update player bullets
    s.playerBullets.forEach(b => { b.x += b.dx; b.y += b.dy; });
    s.playerBullets = s.playerBullets.filter(b => b.x > 0 && b.x < CANVAS_W && b.y > 0 && b.y < CANVAS_H);

    // Update enemy bullets
    s.enemyBullets.forEach(b => { b.x += b.dx; b.y += b.dy; });
    s.enemyBullets = s.enemyBullets.filter(b => b.x > 0 && b.x < CANVAS_W && b.y > 0 && b.y < CANVAS_H);

    // Player bullet vs enemy collision
    s.playerBullets = s.playerBullets.filter(b => {
      let hit = false;
      s.enemies = s.enemies.filter(e => {
        const dist = Math.hypot(b.x - e.x, b.y - e.y);
        if (dist < ENEMY_SIZE) {
          e.hp--;
          hit = true;
          spawnParticles(e.x, e.y, "#00FFCC", 5);
          if (e.hp <= 0) {
            s.score += e.type === "mech" ? 30 : 10;
            s.enemiesKilled++;
            spawnParticles(e.x, e.y, "#FF6600", 12);
            return false;
          }
        }
        return true;
      });
      return !hit;
    });

    // Enemy bullet vs player collision
    if (player.invincible > 0) player.invincible--;
    s.enemyBullets = s.enemyBullets.filter(b => {
      const dist = Math.hypot(b.x - player.x, b.y - player.y);
      if (dist < PLAYER_SIZE && player.invincible === 0) {
        player.hp--;
        player.invincible = 60;
        spawnParticles(player.x, player.y, "#FF3366", 8);
        if (player.hp <= 0) {
          s.gameOver = true;
          s.running = false;
          setDisplayState(prev => ({ ...prev, gameOver: true, running: false, playerHP: 0 }));
        }
        return false;
      }
      return dist >= PLAYER_SIZE;
    });

    // Enemy vs player melee
    s.enemies.forEach(e => {
      const dist = Math.hypot(e.x - player.x, e.y - player.y);
      if (dist < PLAYER_SIZE + ENEMY_SIZE * 0.5 && player.invincible === 0) {
        player.hp--;
        player.invincible = 90;
        spawnParticles(player.x, player.y, "#FF3366", 6);
        if (player.hp <= 0) {
          s.gameOver = true;
          s.running = false;
          setDisplayState(prev => ({ ...prev, gameOver: true, running: false, playerHP: 0 }));
        }
      }
    });

    // Level up
    if (s.enemiesKilled >= s.totalToKill) {
      if (s.level >= 3) {
        s.gameWon = true;
        s.running = false;
        setDisplayState(prev => ({ ...prev, gameWon: true, running: false, score: s.score }));
      } else {
        s.level++;
        s.enemiesKilled = 0;
        s.totalToKill = 10 + s.level * 5;
        s.enemies = [];
        s.enemyBullets = [];
        setDisplayState(prev => ({ ...prev, level: s.level }));
      }
    }

    // Update particles
    s.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      p.vx *= 0.92;
      p.vy *= 0.92;
    });
    s.particles = s.particles.filter(p => p.life > 0);

    // Update display state (throttled)
    if (s.waveTimer % 6 === 0) {
      setDisplayState(prev => ({
        ...prev,
        playerX: player.x,
        playerY: player.y,
        playerHP: player.hp,
        score: s.score,
      }));
    }

    // --- DRAW ---
    // Background
    ctx.fillStyle = "#030810";
    ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Bioluminescent ground
    const groundGrad = ctx.createLinearGradient(0, CANVAS_H * 0.6, 0, CANVAS_H);
    groundGrad.addColorStop(0, "rgba(0,30,60,0)");
    groundGrad.addColorStop(1, "rgba(0,60,40,0.4)");
    ctx.fillStyle = groundGrad;
    ctx.fillRect(0, CANVAS_H * 0.6, CANVAS_W, CANVAS_H * 0.4);

    // Draw glowing plants (decorative)
    for (let i = 0; i < 8; i++) {
      const px = (i / 8) * CANVAS_W + 40;
      const py = CANVAS_H - 20;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.quadraticCurveTo(px + 10, py - 40, px + 5, py - 70);
      ctx.strokeStyle = `rgba(0, 255, 180, ${0.3 + Math.sin(Date.now() / 800 + i) * 0.15})`;
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Draw stars
    ctx.fillStyle = "rgba(200,230,255,0.6)";
    for (let i = 0; i < 30; i++) {
      const sx = ((i * 137.5) % CANVAS_W);
      const sy = ((i * 89.3) % (CANVAS_H * 0.5));
      const sr = 0.5 + (i % 3) * 0.5;
      ctx.beginPath();
      ctx.arc(sx, sy, sr, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw particles
    s.particles.forEach(p => {
      ctx.globalAlpha = p.life / 50;
      ctx.fillStyle = p.color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * (p.life / 50), 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;

    // Draw enemy bullets
    s.enemyBullets.forEach(b => {
      ctx.beginPath();
      ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
      ctx.fillStyle = "#FF4400";
      ctx.shadowColor = "#FF4400";
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    });

    // Draw player bullets (arrows)
    s.playerBullets.forEach(b => {
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(Math.atan2(b.dy, b.dx) + Math.PI / 2);
      ctx.fillStyle = "#00FFCC";
      ctx.shadowColor = "#00FFCC";
      ctx.shadowBlur = 10;
      ctx.fillRect(-1.5, -8, 3, 16);
      ctx.beginPath();
      ctx.moveTo(0, -12);
      ctx.lineTo(-4, -6);
      ctx.lineTo(4, -6);
      ctx.closePath();
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.restore();
    });

    // Draw enemies
    s.enemies.forEach(e => {
      ctx.save();
      ctx.translate(e.x, e.y);

      if (e.type === "mech") {
        // Mech (AMP suit style)
        ctx.fillStyle = "#556677";
        ctx.fillRect(-18, -22, 36, 44);
        ctx.fillStyle = "#FF4400";
        ctx.shadowColor = "#FF4400";
        ctx.shadowBlur = 8;
        ctx.fillRect(-6, -10, 12, 8); // cockpit
        ctx.shadowBlur = 0;
        // Legs
        ctx.fillStyle = "#445566";
        ctx.fillRect(-16, 18, 10, 14);
        ctx.fillRect(6, 18, 10, 14);
        // Arms/guns
        ctx.fillStyle = "#667788";
        ctx.fillRect(-26, -8, 10, 6);
        ctx.fillRect(16, -8, 10, 6);
      } else {
        // Soldier (RDA)
        ctx.fillStyle = "#445566";
        // Body
        ctx.fillRect(-10, -14, 20, 28);
        // Head
        ctx.fillStyle = "#556677";
        ctx.beginPath();
        ctx.arc(0, -18, 10, 0, Math.PI * 2);
        ctx.fill();
        // Visor
        ctx.fillStyle = "#FF6600";
        ctx.shadowColor = "#FF6600";
        ctx.shadowBlur = 6;
        ctx.fillRect(-6, -22, 12, 6);
        ctx.shadowBlur = 0;
        // Gun
        ctx.fillStyle = "#334455";
        ctx.fillRect(10, -8, 14, 4);
      }

      // HP bar
      const barW = e.type === "mech" ? 40 : 28;
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      const barY = e.type === "mech" ? -32 : -26;
      ctx.fillRect(-barW / 2, barY, barW, 4);
      ctx.fillStyle = e.hp / e.maxHp > 0.5 ? "#00FF88" : "#FF4400";
      ctx.fillRect(-barW / 2, barY, barW * (e.hp / e.maxHp), 4);

      ctx.restore();
    });

    // Draw player (Na'vi warrior)
    const p = player;
    ctx.save();
    ctx.translate(p.x, p.y);

    if (player.invincible > 0 && Math.floor(player.invincible / 5) % 2 === 0) {
      ctx.globalAlpha = 0.4;
    }

    // Glow
    ctx.shadowColor = "#00D4FF";
    ctx.shadowBlur = 16;

    // Body (blue Na'vi)
    ctx.fillStyle = "#1A6B9A";
    ctx.fillRect(-10, -12, 20, 26);

    // Head
    ctx.fillStyle = "#1E7DB0";
    ctx.beginPath();
    ctx.arc(0, -18, 11, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (yellow)
    ctx.fillStyle = "#FFDD00";
    ctx.shadowColor = "#FFDD00";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.arc(-4, -19, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(4, -19, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Bioluminescent markings
    ctx.strokeStyle = "rgba(0, 255, 200, 0.7)";
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-8, -8);
    ctx.lineTo(-8, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(8, -8);
    ctx.lineTo(8, 8);
    ctx.stroke();

    // Bow
    ctx.strokeStyle = "#8B6914";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(14, -5, 14, -Math.PI * 0.6, Math.PI * 0.6);
    ctx.stroke();
    ctx.strokeStyle = "rgba(0,255,200,0.5)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(14, -5 - 14 * Math.sin(Math.PI * 0.6));
    ctx.lineTo(14, -5 + 14 * Math.sin(Math.PI * 0.6));
    ctx.stroke();

    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();

    // Progress bar (enemies killed)
    const progress = Math.min(s.enemiesKilled / s.totalToKill, 1);
    ctx.fillStyle = "rgba(0,0,0,0.4)";
    ctx.fillRect(10, 10, 200, 8);
    const progGrad = ctx.createLinearGradient(10, 0, 210, 0);
    progGrad.addColorStop(0, "#00D4FF");
    progGrad.addColorStop(1, "#00FFCC");
    ctx.fillStyle = progGrad;
    ctx.fillRect(10, 10, 200 * progress, 8);
    ctx.fillStyle = "rgba(0,212,255,0.8)";
    ctx.font = "11px 'Noto Sans SC', sans-serif";
    ctx.fillText(`击败 ${s.enemiesKilled}/${s.totalToKill}`, 10, 32);

    animRef.current = requestAnimationFrame(gameLoop);
  }, [spawnEnemy, spawnParticles]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      stateRef.current.keys[e.key] = e.type === "keydown";
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("keyup", handleKey);
    animRef.current = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("keyup", handleKey);
      cancelAnimationFrame(animRef.current);
    };
  }, [gameLoop]);

  const handleCanvasTouch = useCallback((e: React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const touch = e.touches[0];
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const tx = (touch.clientX - rect.left) * (CANVAS_W / rect.width);
    const ty = (touch.clientY - rect.top) * (CANVAS_H / rect.height);
    const s = stateRef.current;
    const dx = tx - s.player.x;
    const dy = ty - s.player.y;
    if (Math.abs(dx) > 10) s.player.x += Math.sign(dx) * PLAYER_SPEED;
    if (Math.abs(dy) > 10) s.player.y += Math.sign(dy) * PLAYER_SPEED;
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: "rgba(0,5,15,0.92)", backdropFilter: "blur(8px)" }}
    >
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: "2px solid rgba(0,212,255,0.4)",
          boxShadow: "0 0 60px rgba(0,212,255,0.2)",
          maxWidth: "min(700px, 96vw)",
          width: "100%",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-5 py-3"
          style={{ background: "rgba(5,10,26,0.95)", borderBottom: "1px solid rgba(0,212,255,0.2)" }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">🏹</span>
            <div>
              <h3 className="font-bold text-sm" style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif" }}>
                潘多拉保卫战
              </h3>
              <p className="text-xs" style={{ color: "rgba(160,200,240,0.55)" }}>
                作为纳威人，保卫潘多拉！
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs" style={{ color: "rgba(160,200,240,0.55)" }}>得分</p>
              <p className="font-bold text-sm" style={{ color: "#00FFCC" }}>{displayState.score}</p>
            </div>
            <div className="text-right">
              <p className="text-xs" style={{ color: "rgba(160,200,240,0.55)" }}>关卡</p>
              <p className="font-bold text-sm" style={{ color: "#B07BFF" }}>Lv.{displayState.level}/3</p>
            </div>
            {/* HP */}
            <div className="flex gap-1">
              {Array.from({ length: PLAYER_MAX_HP }).map((_, i) => (
                <span key={i} className="text-base" style={{ opacity: i < displayState.playerHP ? 1 : 0.2 }}>
                  💙
                </span>
              ))}
            </div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105"
              style={{
                background: "rgba(255,60,60,0.15)",
                border: "1px solid rgba(255,60,60,0.35)",
                color: "#FF6B6B",
              }}
            >
              退出游戏
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas
            ref={canvasRef}
            width={CANVAS_W}
            height={CANVAS_H}
            className="block w-full"
            style={{ imageRendering: "pixelated" }}
            onTouchMove={handleCanvasTouch}
          />

          {/* Start Screen */}
          {!displayState.running && !displayState.gameOver && !displayState.gameWon && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-6"
              style={{ background: "rgba(3,8,20,0.85)" }}
            >
              <div className="text-center">
                <div className="text-5xl mb-3">🏹</div>
                <h2
                  className="text-2xl font-bold mb-2"
                  style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(0,212,255,0.5)" }}
                >
                  潘多拉保卫战
                </h2>
                <p className="text-sm mb-1" style={{ color: "rgba(160,200,240,0.75)" }}>
                  作为纳威人战士，击退RDA侵略者！
                </p>
                <p className="text-xs" style={{ color: "rgba(160,200,240,0.5)" }}>
                  共3关 · 每关消灭指定数量敌人过关
                </p>
              </div>
              <div
                className="text-xs space-y-1 px-5 py-3 rounded-xl text-center"
                style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "rgba(160,200,240,0.7)" }}
              >
                <p>⌨️ <strong style={{ color: "#00D4FF" }}>WASD / 方向键</strong> 移动</p>
                <p>🏹 <strong style={{ color: "#00FFCC" }}>空格键</strong> 射箭攻击</p>
                <p>📱 <strong style={{ color: "#B07BFF" }}>触屏</strong> 点击移动</p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, #00D4FF, #0066CC)",
                  color: "#050A1A",
                  boxShadow: "0 0 24px rgba(0,212,255,0.4)",
                }}
              >
                🌿 开始游戏
              </button>
            </div>
          )}

          {/* Game Over */}
          {displayState.gameOver && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
              style={{ background: "rgba(3,8,20,0.88)" }}
            >
              <div className="text-5xl">💔</div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "#FF6B6B", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(255,60,60,0.5)" }}
              >
                纳威人倒下了...
              </h2>
              <p className="text-sm" style={{ color: "rgba(160,200,240,0.7)" }}>
                最终得分：<span style={{ color: "#00FFCC", fontWeight: "bold" }}>{displayState.score}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #00D4FF, #0066CC)", color: "#050A1A", boxShadow: "0 0 20px rgba(0,212,255,0.35)" }}
                >
                  🔄 再战一次
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.35)", color: "#FF6B6B" }}
                >
                  退出
                </button>
              </div>
            </div>
          )}

          {/* Victory */}
          {displayState.gameWon && (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center gap-5"
              style={{ background: "rgba(3,8,20,0.88)" }}
            >
              <div className="text-5xl animate-bounce">🏆</div>
              <h2
                className="text-2xl font-bold"
                style={{ color: "#00FFCC", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(0,255,200,0.5)" }}
              >
                潘多拉得救了！
              </h2>
              <p className="text-sm" style={{ color: "rgba(160,200,240,0.8)" }}>
                Eywa ngahu！最终得分：<span style={{ color: "#00D4FF", fontWeight: "bold" }}>{displayState.score}</span>
              </p>
              <div className="flex gap-3">
                <button
                  onClick={startGame}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "linear-gradient(135deg, #00FFCC, #00A080)", color: "#050A1A", boxShadow: "0 0 20px rgba(0,255,200,0.35)" }}
                >
                  🔄 再玩一次
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105"
                  style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}
                >
                  返回
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
