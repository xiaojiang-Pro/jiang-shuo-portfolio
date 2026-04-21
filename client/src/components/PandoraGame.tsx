/**
 * 潘多拉保卫战 - 马里奥风格横版平台跳跃游戏
 * 操作: 左右方向键/AD移动, 空格/W/上键跳跃, F/J射击
 * 特性: 地形平台, 道具(能量果/弓箭升级/护盾), 敌人(士兵/机甲), 3关卡, Boss战
 */
import { useEffect, useRef, useState, useCallback } from "react";

// ─── Constants ────────────────────────────────────────────────────────────────
const W = 800;
const H = 420;
const GRAVITY = 0.55;
const JUMP_FORCE = -12.5;
const PLAYER_SPEED = 3.8;
const GROUND_Y = H - 60;

// ─── Types ────────────────────────────────────────────────────────────────────
interface Rect { x: number; y: number; w: number; h: number; }
interface Platform extends Rect { type: "ground" | "platform" | "moving"; dx?: number; range?: number; ox?: number; }
interface Enemy { id: number; x: number; y: number; w: number; h: number; type: "soldier" | "mech" | "boss"; vx: number; vy: number; hp: number; maxHp: number; onGround: boolean; shootTimer: number; dir: number; dead: boolean; deathTimer: number; }
interface Bullet { id: number; x: number; y: number; vx: number; vy: number; fromPlayer: boolean; }
interface Item { id: number; x: number; y: number; type: "fruit" | "arrow" | "shield"; collected: boolean; }
interface Particle { id: number; x: number; y: number; vx: number; vy: number; life: number; maxLife: number; color: string; size: number; }
interface Player { x: number; y: number; w: number; h: number; vx: number; vy: number; onGround: boolean; hp: number; maxHp: number; shield: boolean; shieldTimer: number; arrowLevel: number; shootCooldown: number; dir: number; animFrame: number; animTimer: number; dead: boolean; deathTimer: number; }

// ─── Level Definitions ────────────────────────────────────────────────────────
function buildLevel(lvl: number): { platforms: Platform[]; enemies: Enemy[]; items: Item[]; goalX: number } {
  let id = 1000;
  const getId = () => id++;

  if (lvl === 1) {
    return {
      platforms: [
        // Ground
        { x: 0, y: GROUND_Y, w: 3200, h: 60, type: "ground" },
        // Platforms
        { x: 280, y: GROUND_Y - 90, w: 120, h: 16, type: "platform" },
        { x: 480, y: GROUND_Y - 150, w: 100, h: 16, type: "platform" },
        { x: 650, y: GROUND_Y - 90, w: 120, h: 16, type: "platform" },
        { x: 900, y: GROUND_Y - 120, w: 140, h: 16, type: "platform" },
        { x: 1100, y: GROUND_Y - 80, w: 100, h: 16, type: "platform" },
        { x: 1280, y: GROUND_Y - 160, w: 120, h: 16, type: "platform" },
        { x: 1450, y: GROUND_Y - 100, w: 100, h: 16, type: "platform" },
        { x: 1650, y: GROUND_Y - 140, w: 140, h: 16, type: "platform" },
        { x: 1850, y: GROUND_Y - 90, w: 120, h: 16, type: "platform" },
        { x: 2050, y: GROUND_Y - 160, w: 100, h: 16, type: "platform" },
        { x: 2250, y: GROUND_Y - 110, w: 140, h: 16, type: "platform" },
        // Moving platform
        { x: 750, y: GROUND_Y - 200, w: 100, h: 16, type: "moving", dx: 1.5, range: 120, ox: 750 },
        { x: 1600, y: GROUND_Y - 200, w: 100, h: 16, type: "moving", dx: 1.2, range: 100, ox: 1600 },
      ],
      enemies: [
        { id: getId(), x: 400, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1, vy: 0, hp: 2, maxHp: 2, onGround: true, shootTimer: 120, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 700, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: 1, vy: 0, hp: 2, maxHp: 2, onGround: true, shootTimer: 100, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1000, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: -0.7, vy: 0, hp: 5, maxHp: 5, onGround: true, shootTimer: 80, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1300, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: 1, vy: 0, hp: 2, maxHp: 2, onGround: true, shootTimer: 110, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1600, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1, vy: 0, hp: 2, maxHp: 2, onGround: true, shootTimer: 95, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1900, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.7, vy: 0, hp: 5, maxHp: 5, onGround: true, shootTimer: 75, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 2200, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1, vy: 0, hp: 2, maxHp: 2, onGround: true, shootTimer: 115, dir: -1, dead: false, deathTimer: 0 },
      ],
      items: [
        { id: getId(), x: 300, y: GROUND_Y - 110, type: "fruit", collected: false },
        { id: getId(), x: 500, y: GROUND_Y - 170, type: "arrow", collected: false },
        { id: getId(), x: 900, y: GROUND_Y - 140, type: "fruit", collected: false },
        { id: getId(), x: 1100, y: GROUND_Y - 100, type: "shield", collected: false },
        { id: getId(), x: 1290, y: GROUND_Y - 180, type: "fruit", collected: false },
        { id: getId(), x: 1660, y: GROUND_Y - 160, type: "arrow", collected: false },
        { id: getId(), x: 2060, y: GROUND_Y - 180, type: "fruit", collected: false },
      ],
      goalX: 2700,
    };
  }

  if (lvl === 2) {
    return {
      platforms: [
        { x: 0, y: GROUND_Y, w: 3600, h: 60, type: "ground" },
        { x: 200, y: GROUND_Y - 100, w: 100, h: 16, type: "platform" },
        { x: 380, y: GROUND_Y - 170, w: 90, h: 16, type: "platform" },
        { x: 550, y: GROUND_Y - 120, w: 110, h: 16, type: "platform" },
        { x: 750, y: GROUND_Y - 200, w: 90, h: 16, type: "platform" },
        { x: 950, y: GROUND_Y - 140, w: 120, h: 16, type: "platform" },
        { x: 1150, y: GROUND_Y - 90, w: 100, h: 16, type: "platform" },
        { x: 1350, y: GROUND_Y - 180, w: 110, h: 16, type: "platform" },
        { x: 1550, y: GROUND_Y - 120, w: 100, h: 16, type: "platform" },
        { x: 1750, y: GROUND_Y - 200, w: 120, h: 16, type: "platform" },
        { x: 2000, y: GROUND_Y - 150, w: 100, h: 16, type: "platform" },
        { x: 2200, y: GROUND_Y - 100, w: 120, h: 16, type: "platform" },
        { x: 2400, y: GROUND_Y - 180, w: 100, h: 16, type: "platform" },
        { x: 2600, y: GROUND_Y - 130, w: 140, h: 16, type: "platform" },
        { x: 2850, y: GROUND_Y - 180, w: 100, h: 16, type: "platform" },
        { x: 500, y: GROUND_Y - 240, w: 90, h: 16, type: "moving", dx: 1.8, range: 130, ox: 500 },
        { x: 1200, y: GROUND_Y - 250, w: 90, h: 16, type: "moving", dx: -1.5, range: 110, ox: 1200 },
        { x: 2100, y: GROUND_Y - 240, w: 90, h: 16, type: "moving", dx: 1.6, range: 120, ox: 2100 },
      ],
      enemies: [
        { id: getId(), x: 350, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.2, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 100, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 600, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.8, vy: 0, hp: 6, maxHp: 6, onGround: true, shootTimer: 70, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 900, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.2, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 90, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1200, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.8, vy: 0, hp: 6, maxHp: 6, onGround: true, shootTimer: 65, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1500, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.2, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 85, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 1800, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.8, vy: 0, hp: 6, maxHp: 6, onGround: true, shootTimer: 60, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 2100, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.2, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 95, dir: -1, dead: false, deathTimer: 0 },
        { id: getId(), x: 2400, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.8, vy: 0, hp: 6, maxHp: 6, onGround: true, shootTimer: 55, dir: 1, dead: false, deathTimer: 0 },
        { id: getId(), x: 2700, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.2, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 80, dir: -1, dead: false, deathTimer: 0 },
      ],
      items: [
        { id: getId(), x: 210, y: GROUND_Y - 120, type: "fruit", collected: false },
        { id: getId(), x: 390, y: GROUND_Y - 190, type: "arrow", collected: false },
        { id: getId(), x: 760, y: GROUND_Y - 220, type: "fruit", collected: false },
        { id: getId(), x: 960, y: GROUND_Y - 160, type: "shield", collected: false },
        { id: getId(), x: 1360, y: GROUND_Y - 200, type: "fruit", collected: false },
        { id: getId(), x: 1760, y: GROUND_Y - 220, type: "arrow", collected: false },
        { id: getId(), x: 2010, y: GROUND_Y - 170, type: "fruit", collected: false },
        { id: getId(), x: 2410, y: GROUND_Y - 200, type: "shield", collected: false },
        { id: getId(), x: 2860, y: GROUND_Y - 200, type: "fruit", collected: false },
      ],
      goalX: 3200,
    };
  }

  // Level 3 - Boss level
  return {
    platforms: [
      { x: 0, y: GROUND_Y, w: 2400, h: 60, type: "ground" },
      { x: 200, y: GROUND_Y - 110, w: 100, h: 16, type: "platform" },
      { x: 400, y: GROUND_Y - 180, w: 90, h: 16, type: "platform" },
      { x: 600, y: GROUND_Y - 130, w: 110, h: 16, type: "platform" },
      { x: 800, y: GROUND_Y - 200, w: 90, h: 16, type: "platform" },
      { x: 1050, y: GROUND_Y - 140, w: 120, h: 16, type: "platform" },
      { x: 1280, y: GROUND_Y - 200, w: 90, h: 16, type: "platform" },
      { x: 1500, y: GROUND_Y - 140, w: 110, h: 16, type: "platform" },
      { x: 400, y: GROUND_Y - 260, w: 90, h: 16, type: "moving", dx: 2, range: 150, ox: 400 },
      { x: 900, y: GROUND_Y - 260, w: 90, h: 16, type: "moving", dx: -1.8, range: 130, ox: 900 },
      { x: 1300, y: GROUND_Y - 270, w: 90, h: 16, type: "moving", dx: 1.6, range: 120, ox: 1300 },
    ],
    enemies: [
      { id: getId(), x: 350, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.4, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 80, dir: -1, dead: false, deathTimer: 0 },
      { id: getId(), x: 650, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.9, vy: 0, hp: 7, maxHp: 7, onGround: true, shootTimer: 60, dir: 1, dead: false, deathTimer: 0 },
      { id: getId(), x: 950, y: GROUND_Y - 40, w: 28, h: 40, type: "soldier", vx: -1.4, vy: 0, hp: 3, maxHp: 3, onGround: true, shootTimer: 75, dir: -1, dead: false, deathTimer: 0 },
      { id: getId(), x: 1200, y: GROUND_Y - 40, w: 36, h: 50, type: "mech", vx: 0.9, vy: 0, hp: 7, maxHp: 7, onGround: true, shootTimer: 55, dir: 1, dead: false, deathTimer: 0 },
      // Boss
      { id: getId(), x: 1700, y: GROUND_Y - 80, w: 70, h: 80, type: "boss", vx: -1, vy: 0, hp: 30, maxHp: 30, onGround: true, shootTimer: 40, dir: -1, dead: false, deathTimer: 0 },
    ],
    items: [
      { id: getId(), x: 210, y: GROUND_Y - 130, type: "fruit", collected: false },
      { id: getId(), x: 410, y: GROUND_Y - 200, type: "arrow", collected: false },
      { id: getId(), x: 610, y: GROUND_Y - 150, type: "shield", collected: false },
      { id: getId(), x: 810, y: GROUND_Y - 220, type: "fruit", collected: false },
      { id: getId(), x: 1060, y: GROUND_Y - 160, type: "fruit", collected: false },
      { id: getId(), x: 1290, y: GROUND_Y - 220, type: "arrow", collected: false },
      { id: getId(), x: 1510, y: GROUND_Y - 160, type: "shield", collected: false },
    ],
    goalX: 2100,
  };
}

// ─── Collision ────────────────────────────────────────────────────────────────
function rectOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

/**
 * Robust AABB physics step:
 * 1. Apply horizontal velocity → resolve X overlaps
 * 2. Apply vertical velocity  → resolve Y overlaps
 * Only land on TOP of a platform (one-way from above), never clip through sides.
 */
function physicsStep(
  entity: { x: number; y: number; w: number; h: number; vx: number; vy: number; onGround: boolean },
  platforms: Platform[]
) {
  // ── X axis: only push against non-ground platforms ──
  entity.x += entity.vx;
  for (const p of platforms) {
    // Ground tiles are infinite floors – skip horizontal resolution to avoid edge sticking
    if (p.type === "ground") continue;
    if (!rectOverlap(entity.x, entity.y, entity.w, entity.h, p.x, p.y, p.w, p.h)) continue;
    // Only push horizontally if the entity is NOT mostly above the platform
    // (i.e. don't push sideways when we're just landing on top)
    const overlapTop = entity.y + entity.h - p.y;
    if (overlapTop < 8) continue; // very shallow top-overlap → let Y-pass handle it
    const overlapLeft  = entity.x + entity.w - p.x;
    const overlapRight = p.x + p.w - entity.x;
    if (overlapLeft < overlapRight) {
      entity.x = p.x - entity.w;
      if (entity.vx > 0) entity.vx = 0;
    } else {
      entity.x = p.x + p.w;
      if (entity.vx < 0) entity.vx = 0;
    }
  }

  // ── Y axis ──
  entity.onGround = false;
  entity.y += entity.vy;
  for (const p of platforms) {
    if (!rectOverlap(entity.x, entity.y, entity.w, entity.h, p.x, p.y, p.w, p.h)) continue;
    const overlapTop    = entity.y + entity.h - p.y;
    const overlapBottom = p.y + p.h - entity.y;
    if (overlapTop < overlapBottom) {
      // Landed on top – only if falling (vy >= 0) or very small upward speed
      if (entity.vy >= -1) {
        entity.y = p.y - entity.h;
        entity.vy = 0;
        entity.onGround = true;
      }
    } else {
      // Hit ceiling from below
      entity.y = p.y + p.h;
      if (entity.vy < 0) entity.vy = 0;
    }
  }
}

/** Check if entity has solid ground just below its feet (for edge detection) */
function hasGroundBelow(
  entity: { x: number; y: number; w: number; h: number },
  platforms: Platform[],
  dir: number
): boolean {
  // Check a point 1px below the leading foot
  const footX = dir > 0 ? entity.x + entity.w + 1 : entity.x - 1;
  const footY = entity.y + entity.h + 1;
  return platforms.some(p =>
    footX >= p.x && footX <= p.x + p.w &&
    footY >= p.y && footY <= p.y + p.h
  );
}
// ─── Web Audio Sound Engine ─────────────────────────────────────────────────────────
let _audioCtx: AudioContext | null = null;
function getAudioCtx(): AudioContext {
  if (!_audioCtx) _audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
  return _audioCtx;
}

function playTone(
  type: OscillatorType,
  freq: number,
  duration: number,
  volume = 0.18,
  freqEnd?: number,
  delay = 0
) {
  try {
    const ctx = getAudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
    if (freqEnd !== undefined) {
      osc.frequency.linearRampToValueAtTime(freqEnd, ctx.currentTime + delay + duration);
    }
    gain.gain.setValueAtTime(volume, ctx.currentTime + delay);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + duration);
    osc.start(ctx.currentTime + delay);
    osc.stop(ctx.currentTime + delay + duration);
  } catch (_) { /* ignore audio errors */ }
}

const SFX = {
  jump: () => {
    playTone("sine", 280, 0.12, 0.14, 520);
  },
  shoot: () => {
    playTone("sawtooth", 600, 0.06, 0.10, 200);
    playTone("sine", 900, 0.04, 0.06, 400, 0.02);
  },
  hit: () => {
    // Player takes damage - low thud
    playTone("square", 120, 0.15, 0.18, 60);
    playTone("sawtooth", 80, 0.12, 0.1, 40, 0.05);
  },
  enemyDie: () => {
    playTone("sawtooth", 300, 0.08, 0.12, 80);
    playTone("sine", 200, 0.1, 0.08, 50, 0.04);
  },
  collectFruit: () => {
    playTone("sine", 660, 0.08, 0.14, 880);
    playTone("sine", 880, 0.06, 0.08, 1100, 0.06);
  },
  collectArrow: () => {
    playTone("triangle", 440, 0.06, 0.12, 660);
    playTone("triangle", 660, 0.06, 0.06, 880, 0.06);
    playTone("triangle", 880, 0.06, 0.06, 1100, 0.12);
  },
  collectShield: () => {
    playTone("sine", 520, 0.08, 0.12, 780);
    playTone("sine", 780, 0.06, 0.1, 1040, 0.08);
  },
  levelClear: () => {
    // Ascending fanfare
    [0, 0.1, 0.2, 0.35].forEach((d, i) => {
      const freqs = [523, 659, 784, 1047];
      playTone("sine", freqs[i], 0.25, 0.18, freqs[i] * 1.02, d);
    });
  },
  gameOver: () => {
    playTone("sawtooth", 220, 0.3, 0.2, 110);
    playTone("sawtooth", 180, 0.25, 0.3, 80, 0.2);
    playTone("sawtooth", 140, 0.2, 0.4, 60, 0.4);
  },
  victory: () => {
    // Victory fanfare
    const melody = [523, 659, 784, 659, 784, 1047];
    const delays = [0, 0.12, 0.24, 0.4, 0.52, 0.64];
    melody.forEach((f, i) => playTone("sine", f, 0.22, 0.2, f * 1.01, delays[i]));
  },
  bossDie: () => {
    // Epic boss death
    [0, 0.1, 0.2, 0.3, 0.4].forEach((d, i) => {
      playTone("sawtooth", 400 - i * 60, 0.2, 0.22, 100, d);
    });
    playTone("sine", 1047, 0.3, 0.5, 200, 0.3);
  },
  newHighScore: () => {
    // Special new record jingle
    [0, 0.15, 0.3, 0.45, 0.6].forEach((d, i) => {
      const freqs = [523, 659, 784, 1047, 1319];
      playTone("sine", freqs[i], 0.3, 0.22, freqs[i] * 1.02, d);
    });
  },
};

// ─── Local High Score ─────────────────────────────────────────────────────────
const HS_KEY = "pandora_high_score";
function loadHighScore(): number {
  try { return parseInt(localStorage.getItem(HS_KEY) || "0", 10) || 0; } catch { return 0; }
}
function saveHighScore(score: number): boolean {
  const prev = loadHighScore();
  if (score > prev) {
    try { localStorage.setItem(HS_KEY, String(score)); } catch { /* ignore */ }
    return true; // new record
  }
  return false;
}

// ─── Main Component ────────────────────────────────────────────────────────────────
let _nextId = 0;
const nextId = () => ++_nextId;

export default function PandoraGame({ onClose }: { onClose: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const keys = useRef<Record<string, boolean>>({});
  const animRef = useRef<number>(0);
  const gameRef = useRef({
    player: null as unknown as Player,
    platforms: [] as Platform[],
    enemies: [] as Enemy[],
    items: [] as Item[],
    bullets: [] as Bullet[],
    particles: [] as Particle[],
    camera: { x: 0 },
    goalX: 2700,
    level: 1,
    score: 0,
    running: false,
    gameOver: false,
    gameWon: false,
    levelComplete: false,
    tick: 0,
  });

  const [ui, setUi] = useState({ running: false, gameOver: false, gameWon: false, levelComplete: false, level: 1, score: 0, hp: 5, maxHp: 5, shield: false, arrowLevel: 1 });
  const [highScore, setHighScore] = useState(() => loadHighScore());
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [muted, setMuted] = useState(false);
  const mutedRef = useRef(false);

  // Keep mutedRef in sync with muted state for use inside gameLoop
  const sfx = useCallback((fn: () => void) => {
    if (!mutedRef.current) fn();
  }, []);

  const spawnParticles = useCallback((x: number, y: number, color: string, count = 8, speed = 4) => {
    const g = gameRef.current;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count + Math.random() * 0.5;
      g.particles.push({ id: nextId(), x, y, vx: Math.cos(angle) * speed * Math.random(), vy: Math.sin(angle) * speed * Math.random() - 2, life: 30 + Math.random() * 20, maxLife: 50, color, size: 3 + Math.random() * 4 });
    }
  }, []);

  const initLevel = useCallback((lvl: number) => {
    const g = gameRef.current;
    const { platforms, enemies, items, goalX } = buildLevel(lvl);
    g.platforms = platforms;
    g.enemies = enemies;
    g.items = items;
    g.goalX = goalX;
    g.bullets = [];
    g.particles = [];
    g.camera = { x: 0 };
    g.level = lvl;
    g.levelComplete = false;
    g.player = {
      x: 80, y: GROUND_Y - 50, w: 24, h: 44, vx: 0, vy: 0,
      onGround: false, hp: 5, maxHp: 5,
      shield: false, shieldTimer: 0,
      arrowLevel: 1, shootCooldown: 0,
      dir: 1, animFrame: 0, animTimer: 0,
      dead: false, deathTimer: 0,
    };
  }, []);

  const startGame = useCallback(() => {
    const g = gameRef.current;
    g.score = 0;
    g.gameOver = false;
    g.gameWon = false;
    g.running = true;
    // Initialize AudioContext on user gesture (required by browsers)
    try { getAudioCtx(); } catch (_) { /* ignore */ }
    initLevel(1);
    setIsNewRecord(false);
    setUi({ running: true, gameOver: false, gameWon: false, levelComplete: false, level: 1, score: 0, hp: 5, maxHp: 5, shield: false, arrowLevel: 1 });
  }, [initLevel]);

  const gameLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) { animRef.current = requestAnimationFrame(gameLoop); return; }
    const ctx = canvas.getContext("2d");
    if (!ctx) { animRef.current = requestAnimationFrame(gameLoop); return; }
    const g = gameRef.current;
    const k = keys.current;

    if (!g.running) {
      // Draw idle background
      drawBackground(ctx, 0, g.level);
      animRef.current = requestAnimationFrame(gameLoop);
      return;
    }

    g.tick++;
    const p = g.player;

    // ── Moving platforms (update first so carry uses latest position) ──
    for (const plat of g.platforms) {
      if (plat.type === "moving" && plat.dx !== undefined && plat.range !== undefined && plat.ox !== undefined) {
        plat.x += plat.dx;
        if (plat.x > plat.ox + plat.range || plat.x < plat.ox - plat.range) plat.dx *= -1;
      }
    }

    // ── Player update ──
    if (!p.dead) {
      // Horizontal
      if (k["ArrowLeft"] || k["a"] || k["A"]) { p.vx = -PLAYER_SPEED; p.dir = -1; }
      else if (k["ArrowRight"] || k["d"] || k["D"]) { p.vx = PLAYER_SPEED; p.dir = 1; }
      else p.vx *= 0.7;

      // Jump
      if ((k["ArrowUp"] || k[" "] || k["w"] || k["W"]) && p.onGround) {
        p.vy = JUMP_FORCE;
        p.onGround = false;
        sfx(SFX.jump);
      }

      // Shoot
      if (p.shootCooldown > 0) p.shootCooldown--;
      if ((k["f"] || k["F"] || k["j"] || k["J"]) && p.shootCooldown === 0) {
        const bvx = p.dir * 9;
        g.bullets.push({ id: nextId(), x: p.x + (p.dir > 0 ? p.w : 0), y: p.y + p.h / 2, vx: bvx, vy: 0, fromPlayer: true });
        if (p.arrowLevel >= 2) {
          g.bullets.push({ id: nextId(), x: p.x + (p.dir > 0 ? p.w : 0), y: p.y + p.h / 2, vx: bvx, vy: -2, fromPlayer: true });
          g.bullets.push({ id: nextId(), x: p.x + (p.dir > 0 ? p.w : 0), y: p.y + p.h / 2, vx: bvx, vy: 2, fromPlayer: true });
        }
        p.shootCooldown = p.arrowLevel >= 2 ? 14 : 20;
        sfx(SFX.shoot);
      }

      // Physics - use robust two-pass AABB
      p.vy += GRAVITY;
      physicsStep(p, g.platforms);

      // Moving platform carry: if player is standing on a moving platform, move with it
      if (p.onGround) {
        for (const plat of g.platforms) {
          if (plat.type === "moving" && plat.dx !== undefined) {
            if (
              p.x + p.w > plat.x && p.x < plat.x + plat.w &&
              Math.abs(p.y + p.h - plat.y) < 4
            ) {
              p.x += plat.dx;
            }
          }
        }
      }

      // Clamp
      if (p.x < 0) p.x = 0;
      if (p.y > H + 100) { p.hp = 0; }

      // Shield/invincibility timer
      // p.shield = true means shield item is active (blocks damage)
      // p.shieldTimer > 0 means either shield item OR invincibility frames are active
      if (p.shieldTimer > 0) {
        p.shieldTimer--;
        // Only clear shield item when its own timer runs out (shield item gives 300 ticks)
        // Invincibility frames (60 ticks from melee hit) don't have p.shield=true
        if (p.shieldTimer === 0 && p.shield) p.shield = false;
      }

      // Anim
      p.animTimer++;
      if (p.animTimer > 8) { p.animTimer = 0; p.animFrame = (p.animFrame + 1) % 4; }

      // Death
      if (p.hp <= 0 && !p.dead) {
        p.dead = true;
        p.deathTimer = 90;
        spawnParticles(p.x + p.w / 2, p.y + p.h / 2, "#00D4FF", 16, 6);
      }
    } else {
      p.deathTimer--;
      if (p.deathTimer <= 0) {
        g.running = false;
        g.gameOver = true;
        sfx(SFX.gameOver);
        // Save high score on game over too
        const isRec = saveHighScore(g.score);
        if (isRec) { setHighScore(g.score); setIsNewRecord(true); }
        setUi(prev => ({ ...prev, running: false, gameOver: true }));
      }
    }

    // ── Enemies update ──
    for (const e of g.enemies) {
      if (e.dead) {
        e.deathTimer--;
        continue;
      }
      // Move - use robust two-pass AABB
      e.vy += GRAVITY;
      physicsStep(e, g.platforms);

      // Reverse at edges using hasGroundBelow helper
      if (e.onGround && e.type !== "boss") {
        if (!hasGroundBelow(e, g.platforms, e.vx > 0 ? 1 : -1)) {
          e.vx *= -1;
          e.dir *= -1;
        }
      }

      // Clamp speed
      const maxSpd = e.type === "boss" ? 2 : e.type === "mech" ? 1.2 : 1.8;
      if (Math.abs(e.vx) > maxSpd) e.vx = Math.sign(e.vx) * maxSpd;

      // Face player
      if (e.type !== "boss") {
        if (p.x > e.x + e.w / 2) { e.dir = 1; } else { e.dir = -1; }
      } else {
        // Boss moves toward player
        const dx = p.x - e.x;
        e.vx += Math.sign(dx) * 0.08;
        e.dir = dx > 0 ? 1 : -1;
        // Boss jump
        if (e.onGround && Math.random() < 0.008) e.vy = JUMP_FORCE * 0.85;
      }

      // Enemy shoot
      e.shootTimer--;
      if (e.shootTimer <= 0) {
        const dist = Math.hypot(p.x - e.x, p.y - e.y);
        if (dist < 500) {
          const bvx = e.dir * (e.type === "boss" ? 7 : 5);
          g.bullets.push({ id: nextId(), x: e.x + e.w / 2, y: e.y + e.h / 2, vx: bvx, vy: e.type === "boss" ? -1.5 : 0, fromPlayer: false });
          if (e.type === "boss") {
            g.bullets.push({ id: nextId(), x: e.x + e.w / 2, y: e.y + e.h / 2, vx: bvx * 0.7, vy: -3, fromPlayer: false });
            g.bullets.push({ id: nextId(), x: e.x + e.w / 2, y: e.y + e.h / 2, vx: bvx * 0.7, vy: 1.5, fromPlayer: false });
          }
        }
        e.shootTimer = e.type === "boss" ? 35 : e.type === "mech" ? 60 : 90;
      }

      // Melee damage
      // Skip if in invincibility frames (!p.shield && shieldTimer>0) or if shield item active
      const inIframes = p.shieldTimer > 0 && !p.shield;
      if (!p.dead && !inIframes && rectOverlap(p.x, p.y, p.w, p.h, e.x, e.y, e.w, e.h)) {
        if (!p.shield) {
          p.hp--;
          // Grant brief invincibility frames (60 ticks) after melee hit
          p.shieldTimer = 60;
          spawnParticles(p.x + p.w / 2, p.y, "#FF4444", 6, 3);
          sfx(SFX.hit);
        } else {
          // Shield item absorbs the hit
          p.shield = false; p.shieldTimer = 0;
          spawnParticles(p.x + p.w / 2, p.y, "#00FFCC", 8, 4);
          sfx(SFX.hit);
        }
        // Knockback away from enemy
        const kbDir = p.x > e.x ? 1 : -1;
        p.vy = -7; p.vx = kbDir * 5;
      }
    }
    g.enemies = g.enemies.filter(e => !e.dead || e.deathTimer > 0);

    // ── Bullets update ──
    for (const b of g.bullets) {
      b.vy += b.fromPlayer ? 0 : 0.12;
      b.x += b.vx;
      b.y += b.vy;
    }
    // Remove OOB
    g.bullets = g.bullets.filter(b => b.x > g.camera.x - 50 && b.x < g.camera.x + W + 50 && b.y > -100 && b.y < H + 50);

    // Player bullet vs enemy
    g.bullets = g.bullets.filter(b => {
      if (!b.fromPlayer) return true;
      let hit = false;
      for (const e of g.enemies) {
        if (!e.dead && rectOverlap(b.x - 4, b.y - 4, 8, 8, e.x, e.y, e.w, e.h)) {
          e.hp--;
          spawnParticles(b.x, b.y, "#00FFCC", 5, 3);
          if (e.hp <= 0) {
            e.dead = true;
            e.deathTimer = 40;
            g.score += e.type === "boss" ? 500 : e.type === "mech" ? 100 : 30;
            spawnParticles(e.x + e.w / 2, e.y + e.h / 2, e.type === "boss" ? "#FFD700" : "#FF6600", 14, 5);
            sfx(e.type === "boss" ? SFX.bossDie : SFX.enemyDie);
          }
          hit = true;
          break;
        }
      }
      return !hit;
    });

    // Enemy bullet vs player
    if (!p.dead) {
      g.bullets = g.bullets.filter(b => {
        if (b.fromPlayer) return true;
        if (rectOverlap(b.x - 5, b.y - 5, 10, 10, p.x, p.y, p.w, p.h)) {
          if (!p.shield) {
            p.hp--;
            spawnParticles(p.x + p.w / 2, p.y + p.h / 2, "#FF4444", 6, 3);
            sfx(SFX.hit);
          } else {
            p.shield = false; p.shieldTimer = 0;
            spawnParticles(p.x + p.w / 2, p.y, "#00FFCC", 8, 4);
            sfx(SFX.hit);
          }
          return false;
        }
        return true;
      });
    }

    // ── Items ──
    for (const item of g.items) {
      if (!item.collected && rectOverlap(p.x, p.y, p.w, p.h, item.x - 12, item.y - 12, 24, 24)) {
        item.collected = true;
        if (item.type === "fruit") { p.hp = Math.min(p.hp + 1, p.maxHp); spawnParticles(item.x, item.y, "#00FF88", 8, 3); g.score += 20; sfx(SFX.collectFruit); }
        else if (item.type === "arrow") { p.arrowLevel = 2; spawnParticles(item.x, item.y, "#00D4FF", 8, 3); g.score += 50; sfx(SFX.collectArrow); }
        else if (item.type === "shield") { p.shield = true; p.shieldTimer = 300; spawnParticles(item.x, item.y, "#B07BFF", 8, 3); g.score += 30; sfx(SFX.collectShield); }
      }
    }

    // ── Goal ──
    if (!p.dead && p.x + p.w > g.goalX && !g.levelComplete) {
      g.levelComplete = true;
      g.score += 200;
      if (g.level < 3) {
        sfx(SFX.levelClear);
        setTimeout(() => {
          initLevel(g.level + 1);
          setUi(prev => ({ ...prev, level: g.level, levelComplete: false }));
        }, 1500);
        setUi(prev => ({ ...prev, levelComplete: true, score: g.score }));
      } else {
        g.running = false;
        g.gameWon = true;
        // Save high score and check for new record
        const isRecord = saveHighScore(g.score);
        if (isRecord) {
          sfx(SFX.newHighScore);
          setHighScore(g.score);
          setIsNewRecord(true);
        } else {
          sfx(SFX.victory);
        }
        setUi(prev => ({ ...prev, running: false, gameWon: true, score: g.score }));
      }
    }

    // ── Particles ──
    for (const pt of g.particles) {
      pt.x += pt.vx; pt.y += pt.vy; pt.vy += 0.15; pt.life--;
    }
    g.particles = g.particles.filter(pt => pt.life > 0);

    // ── Camera ──
    const targetCamX = p.x - W * 0.35;
    g.camera.x += (targetCamX - g.camera.x) * 0.1;
    g.camera.x = Math.max(0, g.camera.x);

    // Update UI (throttled)
    if (g.tick % 5 === 0) {
      setUi(prev => ({ ...prev, hp: p.hp, maxHp: p.maxHp, shield: p.shield, arrowLevel: p.arrowLevel, score: g.score }));
    }

    // ── Draw ──
    drawBackground(ctx, g.camera.x, g.level);

    ctx.save();
    ctx.translate(-g.camera.x, 0);

    // Draw platforms
    for (const plat of g.platforms) {
      drawPlatform(ctx, plat, g.tick);
    }

    // Draw goal flag
    drawGoal(ctx, g.goalX, GROUND_Y, g.tick);

    // Draw items
    for (const item of g.items) {
      if (!item.collected) drawItem(ctx, item, g.tick);
    }

    // Draw particles
    for (const pt of g.particles) {
      ctx.globalAlpha = pt.life / pt.maxLife;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.x, pt.y, pt.size * (pt.life / pt.maxLife), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // Draw enemies
    for (const e of g.enemies) {
      drawEnemy(ctx, e, g.tick);
    }

    // Draw bullets
    for (const b of g.bullets) {
      drawBullet(ctx, b);
    }

    // Draw player (flash during invincibility frames)
    const inIframesDraw = p.shieldTimer > 0 && !p.shield;
    const shouldDrawPlayer = !p.dead || Math.floor(p.deathTimer / 5) % 2 === 0;
    if (shouldDrawPlayer) {
      // Flicker every 4 ticks during invincibility frames
      if (!inIframesDraw || Math.floor(g.tick / 4) % 2 === 0) {
        drawPlayer(ctx, p, g.tick);
      }
    }

    ctx.restore();

    // HUD overlays
    if (g.levelComplete && g.level < 3) {
      ctx.fillStyle = "rgba(0,212,255,0.18)";
      ctx.fillRect(0, 0, W, H);
      ctx.fillStyle = "#00FFCC";
      ctx.font = "bold 32px 'Noto Serif SC', serif";
      ctx.textAlign = "center";
      ctx.shadowColor = "#00FFCC";
      ctx.shadowBlur = 20;
      ctx.fillText(`第 ${g.level} 关通过！🌿`, W / 2, H / 2);
      ctx.shadowBlur = 0;
      ctx.font = "16px sans-serif";
      ctx.fillStyle = "rgba(200,230,255,0.8)";
      ctx.fillText("准备进入下一关...", W / 2, H / 2 + 40);
      ctx.textAlign = "left";
    }

    animRef.current = requestAnimationFrame(gameLoop);
  }, [initLevel, spawnParticles]);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      keys.current[e.key] = true;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) e.preventDefault();
    };
    const up = (e: KeyboardEvent) => { keys.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    animRef.current = requestAnimationFrame(gameLoop);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      cancelAnimationFrame(animRef.current);
    };
  }, [gameLoop]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,5,15,0.93)", backdropFilter: "blur(8px)" }}>
      <div className="relative rounded-2xl overflow-hidden" style={{ border: "2px solid rgba(0,212,255,0.4)", boxShadow: "0 0 60px rgba(0,212,255,0.2)", maxWidth: "min(820px, 98vw)", width: "100%" }}>

        {/* Header HUD */}
        <div className="flex items-center justify-between px-4 py-2.5" style={{ background: "rgba(5,10,26,0.97)", borderBottom: "1px solid rgba(0,212,255,0.2)" }}>
          <div className="flex items-center gap-3">
            <span className="text-lg">🏹</span>
            <span className="font-bold text-sm" style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif" }}>潘多拉保卫战</span>
            <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(176,123,255,0.15)", color: "#B07BFF", border: "1px solid rgba(176,123,255,0.3)" }}>Lv.{ui.level}/3</span>
            {/* High Score */}
            <div className="text-xs" style={{ color: "rgba(255,215,0,0.8)" }}>
              🏆 {highScore > 0 ? highScore : "--"}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* HP */}
            <div className="flex items-center gap-1">
              {Array.from({ length: ui.maxHp }).map((_, i) => (
                <span key={i} style={{ opacity: i < ui.hp ? 1 : 0.2, fontSize: "14px" }}>💙</span>
              ))}
            </div>
            {/* Shield */}
            {ui.shield && <span className="text-xs px-2 py-0.5 rounded-full animate-pulse" style={{ background: "rgba(176,123,255,0.2)", color: "#B07BFF", border: "1px solid rgba(176,123,255,0.4)" }}>🛡️ 护盾</span>}
            {/* Arrow level */}
            {ui.arrowLevel >= 2 && <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(0,212,255,0.15)", color: "#00D4FF", border: "1px solid rgba(0,212,255,0.3)" }}>🏹 三连箭</span>}
            {/* Score */}
            <div className="text-right">
              <p className="text-xs" style={{ color: "rgba(160,200,240,0.5)" }}>得分</p>
              <p className="font-bold text-sm" style={{ color: "#00FFCC" }}>{ui.score}</p>
            </div>
            {/* Mute button */}
            <button
              onClick={() => {
                const next = !muted;
                setMuted(next);
                mutedRef.current = next;
              }}
              className="px-2 py-1.5 rounded-lg text-sm transition-all hover:scale-110"
              style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: muted ? "rgba(160,200,240,0.4)" : "#00D4FF" }}
              title={muted ? "开启音效" : "静音"}
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <button onClick={onClose} className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:scale-105" style={{ background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.35)", color: "#FF6B6B" }}>退出</button>
          </div>
        </div>

        {/* Canvas */}
        <div className="relative">
          <canvas ref={canvasRef} width={W} height={H} className="block w-full" />

          {/* Start Screen */}
          {!ui.running && !ui.gameOver && !ui.gameWon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" style={{ background: "rgba(3,8,20,0.88)" }}>
              <div className="text-center">
                <div className="text-5xl mb-3">🌿</div>
                <h2 className="text-2xl font-bold mb-2" style={{ color: "#00D4FF", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(0,212,255,0.5)" }}>潘多拉保卫战</h2>
                <p className="text-sm mb-1" style={{ color: "rgba(160,200,240,0.8)" }}>作为纳威人战士，穿越潘多拉丛林，击退RDA侵略者！</p>
                <p className="text-xs" style={{ color: "rgba(160,200,240,0.5)" }}>共3关 · 第3关有Boss战 · 到达终点旗帜过关</p>
              </div>
              <div className="grid grid-cols-2 gap-3 text-xs px-4 py-3 rounded-xl" style={{ background: "rgba(0,212,255,0.07)", border: "1px solid rgba(0,212,255,0.2)", color: "rgba(160,200,240,0.75)" }}>
                <p>⬅️➡️ / <strong style={{ color: "#00D4FF" }}>AD</strong> 移动</p>
                <p>⬆️ / <strong style={{ color: "#00FFCC" }}>空格/W</strong> 跳跃</p>
                <p>🏹 <strong style={{ color: "#B07BFF" }}>F / J</strong> 射箭</p>
                <p>🍎 拾取道具回血/升级</p>
              </div>
              <div className="flex gap-3 text-xs" style={{ color: "rgba(160,200,240,0.6)" }}>
                <span>🍎 能量果 = 回血</span>
                <span>🏹 弓箭升级 = 三连射</span>
                <span>🛡️ 护盾 = 免伤</span>
              </div>
              {highScore > 0 && (
                <div className="text-xs px-3 py-1.5 rounded-full" style={{ background: "rgba(255,215,0,0.1)", border: "1px solid rgba(255,215,0,0.3)", color: "rgba(255,215,0,0.9)" }}>
                  🏆 历史最高分：{highScore}
                </div>
              )}
              <button onClick={startGame} className="px-8 py-3 rounded-full font-bold text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00D4FF, #0066CC)", color: "#050A1A", boxShadow: "0 0 24px rgba(0,212,255,0.4)" }}>
                🌿 开始游戏
              </button>
            </div>
          )}

          {/* Game Over */}
          {ui.gameOver && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" style={{ background: "rgba(3,8,20,0.9)" }}>
              <div className="text-5xl">💔</div>
              <h2 className="text-2xl font-bold" style={{ color: "#FF6B6B", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(255,60,60,0.5)" }}>纳威人倒下了...</h2>
              <p className="text-sm" style={{ color: "rgba(160,200,240,0.7)" }}>最终得分：<span style={{ color: "#00FFCC", fontWeight: "bold" }}>{ui.score}</span></p>
              {isNewRecord && (
                <div className="text-sm px-4 py-2 rounded-full animate-pulse" style={{ background: "rgba(255,215,0,0.15)", border: "1px solid rgba(255,215,0,0.5)", color: "#FFD700" }}>
                  ✨ 新纪录！超越了历史最高分！
                </div>
              )}
              <p className="text-xs" style={{ color: "rgba(255,215,0,0.7)" }}>🏆 历史最高：{highScore}</p>
              <div className="flex gap-3">
                <button onClick={startGame} className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00D4FF, #0066CC)", color: "#050A1A", boxShadow: "0 0 20px rgba(0,212,255,0.35)" }}>🔄 再战一次</button>
                <button onClick={onClose} className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: "rgba(255,60,60,0.15)", border: "1px solid rgba(255,60,60,0.35)", color: "#FF6B6B" }}>退出</button>
              </div>
            </div>
          )}

          {/* Victory */}
          {ui.gameWon && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-5" style={{ background: "rgba(3,8,20,0.9)" }}>
              <div className="text-5xl animate-bounce">🏆</div>
              <h2 className="text-2xl font-bold" style={{ color: "#00FFCC", fontFamily: "'Noto Serif SC', serif", textShadow: "0 0 20px rgba(0,255,200,0.5)" }}>潘多拉得救了！</h2>
              <p className="text-sm" style={{ color: "rgba(160,200,240,0.8)" }}>Eywa ngahu！最终得分：<span style={{ color: "#FFD700", fontWeight: "bold" }}>{ui.score}</span></p>
              {isNewRecord ? (
                <div className="text-sm px-4 py-2 rounded-full animate-bounce" style={{ background: "rgba(255,215,0,0.2)", border: "2px solid rgba(255,215,0,0.6)", color: "#FFD700" }}>
                  🌟 新纪录！历史最高分被打破！
                </div>
              ) : (
                <p className="text-xs" style={{ color: "rgba(255,215,0,0.7)" }}>🏆 历史最高：{highScore}</p>
              )}
              <div className="flex gap-3">
                <button onClick={startGame} className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: "linear-gradient(135deg, #00FFCC, #00A080)", color: "#050A1A", boxShadow: "0 0 20px rgba(0,255,200,0.35)" }}>🔄 再玩一次</button>
                <button onClick={onClose} className="px-6 py-2.5 rounded-full font-semibold text-sm transition-all hover:scale-105" style={{ background: "rgba(0,212,255,0.1)", border: "1px solid rgba(0,212,255,0.3)", color: "#00D4FF" }}>返回</button>
              </div>
            </div>
          )}
        </div>

        {/* Controls reminder */}
        <div className="flex items-center justify-center gap-6 px-4 py-2 text-xs" style={{ background: "rgba(5,10,26,0.97)", borderTop: "1px solid rgba(0,212,255,0.15)", color: "rgba(160,200,240,0.5)" }}>
          <span>⬅️➡️/AD 移动</span>
          <span>⬆️/空格/W 跳跃</span>
          <span>F/J 射箭</span>
          <span>🍎 回血 &nbsp;🏹 三连射 &nbsp;🛡️ 护盾</span>
        </div>
      </div>
    </div>
  );
}

// ─── Drawing Helpers ──────────────────────────────────────────────────────────
function drawBackground(ctx: CanvasRenderingContext2D, camX: number, level: number) {
  // Sky gradient
  const skyColors = [
    ["#020814", "#041428", "#061830"],
    ["#030A1A", "#051525", "#071E35"],
    ["#050310", "#0A0520", "#0F0830"],
  ];
  const [c1, c2, c3] = skyColors[Math.min(level - 1, 2)];
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, c1);
  sky.addColorStop(0.5, c2);
  sky.addColorStop(1, c3);
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, W, H);

  // Stars (parallax)
  ctx.fillStyle = "rgba(200,230,255,0.7)";
  for (let i = 0; i < 60; i++) {
    const sx = ((i * 137.5 - camX * 0.05) % W + W) % W;
    const sy = (i * 89.3) % (H * 0.55);
    const sr = 0.5 + (i % 3) * 0.4;
    ctx.beginPath();
    ctx.arc(sx, sy, sr, 0, Math.PI * 2);
    ctx.fill();
  }

  // Moons
  const moonX = (W * 0.75 - camX * 0.02 + W) % W;
  ctx.beginPath();
  ctx.arc(moonX, 55, 28, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(180,210,255,0.18)";
  ctx.fill();
  ctx.beginPath();
  ctx.arc(moonX, 55, 22, 0, Math.PI * 2);
  ctx.fillStyle = "rgba(200,220,255,0.25)";
  ctx.fill();

  // Floating mountains (parallax)
  ctx.fillStyle = "rgba(10,30,60,0.6)";
  for (let i = 0; i < 5; i++) {
    const mx = ((i * 300 - camX * 0.15 + 3000) % (W + 200)) - 100;
    const mh = 80 + (i % 3) * 40;
    ctx.beginPath();
    ctx.moveTo(mx, H * 0.5);
    ctx.lineTo(mx + 80, H * 0.5 - mh);
    ctx.lineTo(mx + 160, H * 0.5);
    ctx.closePath();
    ctx.fill();
  }

  // Bioluminescent ground glow
  const gGrad = ctx.createLinearGradient(0, GROUND_Y - 20, 0, H);
  gGrad.addColorStop(0, "rgba(0,60,40,0.3)");
  gGrad.addColorStop(1, "rgba(0,30,20,0.5)");
  ctx.fillStyle = gGrad;
  ctx.fillRect(0, GROUND_Y - 20, W, H - GROUND_Y + 20);

  // Glowing plants (parallax)
  const t = Date.now() / 1000;
  for (let i = 0; i < 12; i++) {
    const px = ((i * 85 - camX * 0.3 + 2000) % (W + 60)) - 30;
    const py = GROUND_Y;
    const sway = Math.sin(t * 1.2 + i) * 4;
    ctx.strokeStyle = `rgba(0, 255, 160, ${0.25 + Math.sin(t + i) * 0.1})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00FF80";
    ctx.shadowBlur = 6;
    ctx.beginPath();
    ctx.moveTo(px, py);
    ctx.quadraticCurveTo(px + sway + 8, py - 30, px + sway + 4, py - 55);
    ctx.stroke();
    ctx.shadowBlur = 0;
  }
}

function drawPlatform(ctx: CanvasRenderingContext2D, p: Platform, tick: number) {
  if (p.type === "ground") {
    // Ground surface
    const g = ctx.createLinearGradient(0, p.y, 0, p.y + p.h);
    g.addColorStop(0, "#1A4A2A");
    g.addColorStop(0.3, "#0D2E1A");
    g.addColorStop(1, "#050F08");
    ctx.fillStyle = g;
    ctx.fillRect(p.x, p.y, p.w, p.h);
    // Glowing top edge
    ctx.strokeStyle = `rgba(0, 255, 130, ${0.4 + Math.sin(tick / 30) * 0.1})`;
    ctx.lineWidth = 2;
    ctx.shadowColor = "#00FF80";
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.moveTo(p.x, p.y + 1);
    ctx.lineTo(p.x + p.w, p.y + 1);
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Bioluminescent dots
    for (let i = 0; i < p.w; i += 60) {
      ctx.fillStyle = `rgba(0, 255, 160, ${0.3 + Math.sin(tick / 20 + i) * 0.15})`;
      ctx.beginPath();
      ctx.arc(p.x + i + 20, p.y + 8, 3, 0, Math.PI * 2);
      ctx.fill();
    }
  } else {
    // Floating platform
    const isMoving = p.type === "moving";
    const g = ctx.createLinearGradient(p.x, p.y, p.x, p.y + p.h);
    g.addColorStop(0, isMoving ? "#1A3A5A" : "#1A3040");
    g.addColorStop(1, isMoving ? "#0A1A30" : "#0A1820");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.roundRect(p.x, p.y, p.w, p.h, 4);
    ctx.fill();
    // Glow edge
    ctx.strokeStyle = isMoving ? `rgba(0, 212, 255, ${0.5 + Math.sin(tick / 20) * 0.2})` : "rgba(0, 200, 120, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.shadowColor = isMoving ? "#00D4FF" : "#00C878";
    ctx.shadowBlur = 6;
    ctx.stroke();
    ctx.shadowBlur = 0;
    // Roots/vines hanging
    if (!isMoving) {
      for (let i = 10; i < p.w - 10; i += 20) {
        ctx.strokeStyle = "rgba(0, 180, 80, 0.3)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(p.x + i, p.y + p.h);
        ctx.lineTo(p.x + i + Math.sin(tick / 30 + i) * 3, p.y + p.h + 12);
        ctx.stroke();
      }
    }
  }
}

function drawGoal(ctx: CanvasRenderingContext2D, x: number, groundY: number, tick: number) {
  // Pole
  ctx.strokeStyle = "rgba(255, 215, 0, 0.8)";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#FFD700";
  ctx.shadowBlur = 12;
  ctx.beginPath();
  ctx.moveTo(x, groundY);
  ctx.lineTo(x, groundY - 120);
  ctx.stroke();
  ctx.shadowBlur = 0;
  // Flag
  const wave = Math.sin(tick / 15) * 8;
  ctx.fillStyle = "#00FFCC";
  ctx.shadowColor = "#00FFCC";
  ctx.shadowBlur = 10;
  ctx.beginPath();
  ctx.moveTo(x, groundY - 120);
  ctx.lineTo(x + 40 + wave, groundY - 100);
  ctx.lineTo(x, groundY - 80);
  ctx.closePath();
  ctx.fill();
  ctx.shadowBlur = 0;
  // Eywa symbol on flag
  ctx.fillStyle = "#050A1A";
  ctx.font = "bold 14px sans-serif";
  ctx.fillText("🌿", x + 8, groundY - 96);
  // Glow ring at base
  ctx.beginPath();
  ctx.arc(x, groundY, 16, 0, Math.PI * 2);
  ctx.strokeStyle = `rgba(255, 215, 0, ${0.3 + Math.sin(tick / 20) * 0.2})`;
  ctx.lineWidth = 2;
  ctx.stroke();
}

function drawItem(ctx: CanvasRenderingContext2D, item: Item, tick: number) {
  const bob = Math.sin(tick / 20 + item.id) * 4;
  ctx.save();
  ctx.translate(item.x, item.y + bob);

  // Glow
  const colors: Record<string, string> = { fruit: "#00FF88", arrow: "#00D4FF", shield: "#B07BFF" };
  const emojis: Record<string, string> = { fruit: "🍎", arrow: "🏹", shield: "🛡️" };
  ctx.shadowColor = colors[item.type];
  ctx.shadowBlur = 14;

  // Background circle
  ctx.beginPath();
  ctx.arc(0, 0, 14, 0, Math.PI * 2);
  ctx.fillStyle = `${colors[item.type]}20`;
  ctx.fill();
  ctx.strokeStyle = `${colors[item.type]}60`;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.font = "16px sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(emojis[item.type], 0, 0);
  ctx.restore();
}

function drawEnemy(ctx: CanvasRenderingContext2D, e: Enemy, tick: number) {
  ctx.save();
  ctx.translate(e.x + e.w / 2, e.y + e.h / 2);
  if (e.dir < 0) ctx.scale(-1, 1);

  const alpha = e.dead ? e.deathTimer / 40 : 1;
  ctx.globalAlpha = alpha;

  if (e.type === "boss") {
    // Giant AMP suit / Quaritch mech
    // Body
    ctx.fillStyle = "#445566";
    ctx.fillRect(-32, -36, 64, 72);
    // Cockpit
    ctx.fillStyle = "#FF4400";
    ctx.shadowColor = "#FF4400";
    ctx.shadowBlur = 10;
    ctx.fillRect(-14, -24, 28, 20);
    ctx.shadowBlur = 0;
    // Visor glow
    ctx.fillStyle = "rgba(255,100,0,0.7)";
    ctx.fillRect(-10, -20, 20, 12);
    // Arms
    ctx.fillStyle = "#556677";
    ctx.fillRect(28, -20, 18, 10);
    ctx.fillRect(-46, -20, 18, 10);
    // Legs
    ctx.fillStyle = "#445566";
    ctx.fillRect(-28, 32, 20, 20);
    ctx.fillRect(8, 32, 20, 20);
    // HP bar
    const bw = 70;
    ctx.fillStyle = "rgba(0,0,0,0.6)";
    ctx.fillRect(-bw / 2, -50, bw, 7);
    ctx.fillStyle = e.hp / e.maxHp > 0.5 ? "#00FF88" : e.hp / e.maxHp > 0.25 ? "#FFAA00" : "#FF3300";
    ctx.fillRect(-bw / 2, -50, bw * (e.hp / e.maxHp), 7);
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 9px sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("BOSS", 0, -55);
  } else if (e.type === "mech") {
    // AMP suit (smaller)
    ctx.fillStyle = "#556677";
    ctx.fillRect(-16, -22, 32, 44);
    ctx.fillStyle = "#FF4400";
    ctx.shadowColor = "#FF4400";
    ctx.shadowBlur = 6;
    ctx.fillRect(-8, -14, 16, 10);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#445566";
    ctx.fillRect(-22, -10, 10, 6);
    ctx.fillRect(12, -10, 10, 6);
    ctx.fillRect(-14, 18, 10, 12);
    ctx.fillRect(4, 18, 10, 12);
    // HP bar
    const bw = 36;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(-bw / 2, -30, bw, 5);
    ctx.fillStyle = e.hp / e.maxHp > 0.5 ? "#00FF88" : "#FF3300";
    ctx.fillRect(-bw / 2, -30, bw * (e.hp / e.maxHp), 5);
  } else {
    // Soldier
    ctx.fillStyle = "#445566";
    ctx.fillRect(-10, -12, 20, 24);
    ctx.fillStyle = "#556677";
    ctx.beginPath();
    ctx.arc(0, -18, 9, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#FF6600";
    ctx.shadowColor = "#FF6600";
    ctx.shadowBlur = 5;
    ctx.fillRect(-5, -22, 10, 5);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#334455";
    ctx.fillRect(10, -6, 12, 4);
    // HP bar
    const bw = 28;
    ctx.fillStyle = "rgba(0,0,0,0.5)";
    ctx.fillRect(-bw / 2, -30, bw, 4);
    ctx.fillStyle = e.hp / e.maxHp > 0.5 ? "#00FF88" : "#FF3300";
    ctx.fillRect(-bw / 2, -30, bw * (e.hp / e.maxHp), 4);
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawBullet(ctx: CanvasRenderingContext2D, b: Bullet) {
  ctx.save();
  if (b.fromPlayer) {
    // Arrow
    ctx.translate(b.x, b.y);
    ctx.rotate(Math.atan2(b.vy, b.vx));
    ctx.fillStyle = "#00FFCC";
    ctx.shadowColor = "#00FFCC";
    ctx.shadowBlur = 8;
    ctx.fillRect(-10, -1.5, 20, 3);
    ctx.beginPath();
    ctx.moveTo(10, 0);
    ctx.lineTo(4, -4);
    ctx.lineTo(4, 4);
    ctx.closePath();
    ctx.fill();
    ctx.shadowBlur = 0;
  } else {
    // Enemy plasma
    ctx.beginPath();
    ctx.arc(b.x, b.y, 5, 0, Math.PI * 2);
    ctx.fillStyle = "#FF4400";
    ctx.shadowColor = "#FF4400";
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
  ctx.restore();
}

function drawPlayer(ctx: CanvasRenderingContext2D, p: Player, tick: number) {
  ctx.save();
  ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
  if (p.dir < 0) ctx.scale(-1, 1);

  // Shield aura
  if (p.shield) {
    ctx.beginPath();
    ctx.arc(0, 0, 22, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(176, 123, 255, ${0.5 + Math.sin(tick / 10) * 0.3})`;
    ctx.lineWidth = 3;
    ctx.shadowColor = "#B07BFF";
    ctx.shadowBlur = 15;
    ctx.stroke();
    ctx.shadowBlur = 0;
  }

  // Glow
  ctx.shadowColor = "#00D4FF";
  ctx.shadowBlur = 12;

  // Body (Na'vi blue)
  ctx.fillStyle = "#1A6B9A";
  ctx.fillRect(-10, -12, 20, 24);

  // Head
  ctx.fillStyle = "#1E7DB0";
  ctx.beginPath();
  ctx.arc(0, -18, 10, 0, Math.PI * 2);
  ctx.fill();

  // Eyes
  ctx.fillStyle = "#FFDD00";
  ctx.shadowColor = "#FFDD00";
  ctx.shadowBlur = 6;
  ctx.beginPath();
  ctx.arc(-3.5, -19, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(3.5, -19, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.shadowBlur = 0;

  // Bioluminescent stripes
  ctx.strokeStyle = `rgba(0, 255, 200, ${0.6 + Math.sin(tick / 15) * 0.2})`;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(-7, -8);
  ctx.lineTo(-7, 8);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(7, -8);
  ctx.lineTo(7, 8);
  ctx.stroke();

  // Legs (running animation)
  const legSwing = p.onGround ? Math.sin(tick / 8) * 6 : 0;
  ctx.fillStyle = "#155A80";
  ctx.fillRect(-9, 12, 8, 14 + legSwing);
  ctx.fillRect(1, 12, 8, 14 - legSwing);

  // Bow
  ctx.strokeStyle = "#8B6914";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.arc(14, -4, 13, -Math.PI * 0.55, Math.PI * 0.55);
  ctx.stroke();
  ctx.strokeStyle = "rgba(0,255,200,0.5)";
  ctx.lineWidth = 1;
  const bowTop = { x: 14 + 13 * Math.cos(-Math.PI * 0.55), y: -4 + 13 * Math.sin(-Math.PI * 0.55) };
  const bowBot = { x: 14 + 13 * Math.cos(Math.PI * 0.55), y: -4 + 13 * Math.sin(Math.PI * 0.55) };
  ctx.beginPath();
  ctx.moveTo(bowTop.x, bowTop.y);
  ctx.lineTo(bowBot.x, bowBot.y);
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.restore();
}
