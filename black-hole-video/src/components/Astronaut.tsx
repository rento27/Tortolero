import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const Astronaut: React.FC<{
  enterAt?: number;
  x?: number;
  y?: number;
  scale?: number;
}> = ({ enterAt = 0, x = 300, y = 500, scale = 1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - enterAt;
  if (relativeFrame < 0) return null;

  const appear = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 60, stiffness: 50, mass: 1.5 },
  });

  // Floating animation
  const floatY = Math.sin(relativeFrame * 0.04) * 12;
  const floatRotation = Math.sin(relativeFrame * 0.025) * 5;

  const s = scale * appear;

  return (
    <g
      transform={`translate(${x}, ${y + floatY}) rotate(${floatRotation}) scale(${s})`}
    >
      {/* Helmet */}
      <ellipse cx={0} cy={-45} rx={28} ry={30} fill="#e0e0e0" stroke="#999" strokeWidth={2} />
      {/* Visor */}
      <ellipse cx={0} cy={-45} rx={20} ry={18} fill="#1a1a3a" opacity={0.9} />
      {/* Visor reflection */}
      <ellipse cx={-6} cy={-50} rx={6} ry={4} fill="rgba(255,255,255,0.3)" />

      {/* Body/suit */}
      <rect x={-22} y={-18} width={44} height={50} rx={12} fill="#f0f0f0" stroke="#ccc" strokeWidth={1.5} />

      {/* Backpack */}
      <rect x={-26} y={-12} width={8} height={35} rx={3} fill="#d0d0d0" stroke="#aaa" strokeWidth={1} />

      {/* Chest panel */}
      <rect x={-10} y={-8} width={20} height={14} rx={3} fill="#333" />
      <rect x={-7} y={-5} width={5} height={3} rx={1} fill="#00ff88" opacity={0.8} />
      <rect x={1} y={-5} width={5} height={3} rx={1} fill="#ff4444" opacity={0.8} />
      <rect x={-7} y={0} width={5} height={3} rx={1} fill="#4488ff" opacity={0.8} />

      {/* Arms */}
      <rect x={-35} y={-12} width={14} height={35} rx={7} fill="#f0f0f0" stroke="#ccc" strokeWidth={1.5} />
      <rect x={21} y={-12} width={14} height={35} rx={7} fill="#f0f0f0" stroke="#ccc" strokeWidth={1.5} />

      {/* Gloves */}
      <ellipse cx={-28} cy={26} rx={8} ry={6} fill="#ccc" />
      <ellipse cx={28} cy={26} rx={8} ry={6} fill="#ccc" />

      {/* Legs */}
      <rect x={-18} y={30} width={14} height={30} rx={6} fill="#f0f0f0" stroke="#ccc" strokeWidth={1.5} />
      <rect x={4} y={30} width={14} height={30} rx={6} fill="#f0f0f0" stroke="#ccc" strokeWidth={1.5} />

      {/* Boots */}
      <rect x={-20} y={55} width={18} height={10} rx={4} fill="#888" />
      <rect x={2} y={55} width={18} height={10} rx={4} fill="#888" />
    </g>
  );
};
