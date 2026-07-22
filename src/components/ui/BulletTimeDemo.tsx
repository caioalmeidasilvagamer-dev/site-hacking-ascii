import { useState, useEffect, useRef } from "react";
import wireframeJumpRotation from "../../assets/images/optimized/wireframe-jump-rotation.webp";

/**
 * BulletTimeDemo — Interactive 180° Freeze Technology demo.
 * Rotates an original 3D geometric wireframe figure frame-by-frame.
 * Purely original geometric wireframe art — no copyrighted film assets.
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
}

// Simple original geometric wireframe figure (humanoid/pose silhouette points & lines)
const BASE_VERTICES: Point3D[] = [
  // Head
  { x: 0, y: -70, z: 0 },
  // Neck / Torso spine
  { x: 0, y: -45, z: 0 },
  { x: 0, y: 0, z: 0 },
  { x: 0, y: 35, z: 0 },
  // Shoulders & Chest
  { x: -30, y: -40, z: 0 },
  { x: 30, y: -40, z: 0 },
  { x: 0, y: -20, z: 15 },
  // Left arm (reaching back)
  { x: -55, y: -20, z: -25 },
  { x: -75, y: 10, z: -40 },
  // Right arm (extended back dodge pose)
  { x: 55, y: -25, z: -20 },
  { x: 80, y: -10, z: -35 },
  // Hips
  { x: -20, y: 35, z: 0 },
  { x: 20, y: 35, z: 0 },
  // Left leg (bent back)
  { x: -35, y: 70, z: -15 },
  { x: -45, y: 100, z: -30 },
  // Right leg (stretched front)
  { x: 30, y: 75, z: 25 },
  { x: 45, y: 110, z: 40 },
];

const EDGES: [number, number][] = [
  [0, 1], // Head to Neck
  [1, 2], [2, 3], // Spine
  [1, 4], [1, 5], // Shoulders
  [4, 6], [5, 6], [2, 6], // Chest core
  [4, 7], [7, 8], // Left arm
  [5, 9], [9, 10], // Right arm
  [3, 11], [3, 12], [11, 12], // Hips
  [11, 13], [13, 14], // Left leg
  [12, 15], [15, 16], // Right leg
];

const NUM_CAMERAS = 18;

export function BulletTimeDemo() {
  const [angle, setAngle] = useState(0);
  const [autoRotate, setAutoRotate] = useState(false);
  const [showStaticImg, setShowStaticImg] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Auto rotation effect
  useEffect(() => {
    if (!autoRotate) return;
    const interval = setInterval(() => {
      setAngle((prev) => (prev + 3) % 360);
    }, 40);
    return () => clearInterval(interval);
  }, [autoRotate]);

  // Render canvas frame when angle changes
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const rad = (angle * Math.PI) / 180;
    const cos = Math.cos(rad);
    const sin = Math.sin(rad);

    const cx = width / 2;
    const cy = height / 2 - 10;

    // Project points
    const projected = BASE_VERTICES.map((pt) => {
      // Rotate around Y axis
      const rx = pt.x * cos - pt.z * sin;
      const rz = pt.x * sin + pt.z * cos;
      // Perspective
      const fov = 300;
      const scale = fov / (fov + rz + 100);
      return {
        x: cx + rx * scale,
        y: cy + pt.y * scale,
        z: rz,
      };
    });

    // Draw grid floor lines
    ctx.strokeStyle = "rgba(0, 255, 102, 0.15)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    for (let i = -120; i <= 120; i += 30) {
      const p1x = i * cos - (-100) * sin;
      const p1z = i * sin + (-100) * cos;
      const p2x = i * cos - (100) * sin;
      const p2z = i * sin + (100) * cos;
      const s1 = 300 / (300 + p1z + 100);
      const s2 = 300 / (300 + p2z + 100);
      ctx.moveTo(cx + p1x * s1, cy + 120 * s1);
      ctx.lineTo(cx + p2x * s2, cy + 120 * s2);
    }
    ctx.stroke();

    // Draw camera array ring on ground
    const ringRadius = 140;
    for (let i = 0; i < NUM_CAMERAS; i++) {
      const camDeg = (i * (360 / NUM_CAMERAS));
      const camRad = (camDeg * Math.PI) / 180;
      const crx = Math.cos(camRad) * ringRadius;
      const crz = Math.sin(camRad) * ringRadius;

      // Rotate camera with view
      const prx = crx * cos - crz * sin;
      const prz = crx * sin + crz * cos;
      const scale = 300 / (300 + prz + 100);
      const px = cx + prx * scale;
      const py = cy + 115 * scale;

      const isActive = Math.abs((camDeg - angle + 360) % 360) < (360 / NUM_CAMERAS / 2);

      ctx.fillStyle = isActive ? "#00ff66" : "rgba(0, 255, 102, 0.3)";
      ctx.beginPath();
      ctx.arc(px, py, isActive ? 4 : 2, 0, Math.PI * 2);
      ctx.fill();

      if (isActive) {
        ctx.strokeStyle = "rgba(0, 255, 102, 0.5)";
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(cx, cy);
        ctx.stroke();
      }
    }

    // Draw 3D wireframe edges
    ctx.strokeStyle = "#00ff66";
    ctx.lineWidth = 2;
    EDGES.forEach(([i1, i2]) => {
      const p1 = projected[i1];
      const p2 = projected[i2];
      ctx.beginPath();
      ctx.moveTo(p1.x, p1.y);
      ctx.lineTo(p2.x, p2.y);
      ctx.stroke();
    });

    // Draw joints / nodes
    projected.forEach((p, idx) => {
      ctx.fillStyle = idx === 0 ? "#00ff66" : "#182218";
      ctx.strokeStyle = "#00ff66";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, idx === 0 ? 5 : 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
  }, [angle]);

  return (
    <div className="bevel-raised bg-surface w-full overflow-hidden font-mono">
      {/* Title bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-outline-variant bg-surface-container select-none">
        <span className="font-headline text-xs font-bold tracking-widest text-signal uppercase">
          180° FREEZE TECHNOLOGY (ORIGINAL DEMO) // CAMERA MATRIX ROTATION
        </span>
        <div className="flex items-center gap-1.5 font-mono text-xs text-on-surface-variant/60">
          <span>[ − ]</span><span>[ # ]</span><span>[ × ]</span>
        </div>
      </div>

      {/* Main interactive area */}
      <div className="p-4 flex flex-col items-center gap-4 bg-void">
        {/* Container displaying 3D wireframe or static preview */}
        <div className="bevel-lowered relative w-full max-w-[440px] h-[260px] flex items-center justify-center bg-surface-container-lowest overflow-hidden">
          {showStaticImg ? (
            <img
              src={wireframeJumpRotation}
              alt="abstract wireframe jump rotation freeze technology demonstration"
              className="w-full h-full object-cover"
            />
          ) : (
            <canvas
              ref={canvasRef}
              width={440}
              height={260}
              className="w-full h-full object-contain"
            />
          )}

          {/* Overlay info badge */}
          <div className="absolute top-2 left-2 bevel-lowered px-2 py-1 bg-surface/90 text-[10px] text-signal font-mono">
            CAM_ANGLE: {Math.round(angle)}° / 360°
          </div>
          <div className="absolute top-2 right-2 bevel-lowered px-2 py-1 bg-surface/90 text-[9px] text-on-surface-variant/70 font-mono">
            NODES: {NUM_CAMERAS} CAMERAS
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-[440px] flex flex-col gap-2">
          {/* Slider */}
          <div className="flex items-center gap-3">
            <span className="font-label text-[10px] text-on-surface-variant/60 uppercase">0°</span>
            <input
              type="range"
              min="0"
              max="360"
              value={angle}
              onChange={(e) => setAngle(Number(e.target.value))}
              className="flex-1 accent-signal bg-surface-container h-2 cursor-pointer"
            />
            <span className="font-label text-[10px] text-on-surface-variant/60 uppercase">360°</span>
          </div>

          {/* Buttons row */}
          <div className="flex items-center justify-between gap-2 pt-1">
            <div className="flex gap-1.5">
              {[0, 90, 180, 270].map((deg) => (
                <button
                  key={deg}
                  onClick={() => setAngle(deg)}
                  className={`bevel-button text-[10px] px-2 py-0.5 cursor-pointer ${
                    angle === deg ? "text-signal font-bold" : "text-on-surface-variant"
                  }`}
                >
                  {deg}°
                </button>
              ))}
            </div>

            <div className="flex gap-1.5">
              <button
                onClick={() => setShowStaticImg((prev) => !prev)}
                className={`bevel-button text-[10px] px-2 py-0.5 font-bold cursor-pointer uppercase ${
                  showStaticImg ? "text-signal border-signal" : "text-on-surface-variant"
                }`}
              >
                {showStaticImg ? "[ 🌐 3D MODEL ]" : "[ 📷 STATIC RENDER ]"}
              </button>
              <button
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`bevel-button text-[10px] px-3 py-0.5 font-bold cursor-pointer uppercase ${
                  autoRotate ? "text-signal border-signal" : "text-on-surface-variant"
                }`}
              >
                {autoRotate ? "[ ⏸ PAUSE ]" : "[ ▶ AUTO ROTATE ]"}
              </button>
            </div>
          </div>
        </div>

        <p className="font-mono text-[9px] text-on-surface-variant/50 text-center max-w-sm">
          ORIGINAL GENERATIVE HOMAGE // Interactive 360° wireframe camera array preview.
        </p>
      </div>
    </div>
  );
}
