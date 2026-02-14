import React from "react";
import { useCurrentFrame, interpolate, spring, useVideoConfig } from "remotion";

export const BlackHole: React.FC<{
  scale?: number;
  centerX?: number;
  centerY?: number;
}> = ({ scale = 1, centerX = 960, centerY = 540 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Black hole appears with a spring animation
  const appearScale = spring({
    frame,
    fps,
    config: { damping: 80, stiffness: 40, mass: 2 },
  });

  const currentScale = scale * appearScale;

  // Rotation for accretion disk
  const rotation = frame * 0.8;

  // Pulsating glow
  const glowIntensity = interpolate(
    Math.sin(frame * 0.05),
    [-1, 1],
    [0.6, 1.0]
  );

  // Gravitational lensing ring distortion
  const lensDistort = interpolate(
    Math.sin(frame * 0.03),
    [-1, 1],
    [0.95, 1.05]
  );

  const bhRadius = 120 * currentScale;
  const accretionInner = 150 * currentScale;
  const accretionOuter = 320 * currentScale;
  const photonRing = 140 * currentScale;

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      <defs>
        {/* Accretion disk gradient */}
        <radialGradient id="accretionGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ff6600" stopOpacity={0.0} />
          <stop offset="30%" stopColor="#ff8800" stopOpacity={glowIntensity * 0.9} />
          <stop offset="50%" stopColor="#ffaa00" stopOpacity={glowIntensity * 0.7} />
          <stop offset="70%" stopColor="#ff4400" stopOpacity={glowIntensity * 0.5} />
          <stop offset="90%" stopColor="#cc2200" stopOpacity={glowIntensity * 0.2} />
          <stop offset="100%" stopColor="#660000" stopOpacity={0} />
        </radialGradient>

        {/* Photon ring gradient */}
        <radialGradient id="photonRing" cx="50%" cy="50%" r="50%">
          <stop offset="85%" stopColor="transparent" />
          <stop offset="92%" stopColor="#ffcc44" stopOpacity={glowIntensity * 0.8} />
          <stop offset="96%" stopColor="#ffaa22" stopOpacity={glowIntensity * 0.6} />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Event horizon gradient */}
        <radialGradient id="eventHorizon" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#000000" />
          <stop offset="70%" stopColor="#000000" />
          <stop offset="85%" stopColor="#110500" />
          <stop offset="100%" stopColor="#331100" stopOpacity={0.5} />
        </radialGradient>

        {/* Outer glow */}
        <radialGradient id="outerGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="transparent" />
          <stop offset="60%" stopColor="transparent" />
          <stop offset="80%" stopColor="#ff660033" />
          <stop offset="100%" stopColor="transparent" />
        </radialGradient>

        {/* Gravitational lensing filter */}
        <filter id="lensing">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
        </filter>
      </defs>

      {/* Outer ambient glow */}
      <ellipse
        cx={centerX}
        cy={centerY}
        rx={accretionOuter * 1.5}
        ry={accretionOuter * 1.5 * 0.3}
        fill="url(#outerGlow)"
        transform={`rotate(${rotation * 0.1}, ${centerX}, ${centerY})`}
        opacity={glowIntensity * 0.5}
      />

      {/* Accretion disk - back half (behind black hole) */}
      <g transform={`rotate(${15 + Math.sin(frame * 0.01) * 2}, ${centerX}, ${centerY})`}>
        <ellipse
          cx={centerX}
          cy={centerY}
          rx={accretionOuter}
          ry={accretionOuter * 0.25 * lensDistort}
          fill="url(#accretionGlow)"
          filter="url(#lensing)"
        />

        {/* Accretion disk hot streaks */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2 + (rotation * Math.PI) / 180;
          const streakRadius = interpolate(
            Math.sin(angle + frame * 0.02),
            [-1, 1],
            [accretionInner * 1.2, accretionOuter * 0.9]
          );
          const sx = centerX + Math.cos(angle) * streakRadius;
          const sy =
            centerY + Math.sin(angle) * streakRadius * 0.25 * lensDistort;
          const streakBrightness = interpolate(
            Math.sin(angle * 2 + frame * 0.05),
            [-1, 1],
            [0.3, 1.0]
          );

          return (
            <circle
              key={i}
              cx={sx}
              cy={sy}
              r={6 * currentScale * streakBrightness}
              fill={`rgba(255, ${150 + Math.floor(streakBrightness * 105)}, ${Math.floor(streakBrightness * 50)}, ${streakBrightness * glowIntensity})`}
              filter="url(#lensing)"
            />
          );
        })}
      </g>

      {/* Photon ring */}
      <circle
        cx={centerX}
        cy={centerY}
        r={photonRing}
        fill="none"
        stroke={`rgba(255, 200, 80, ${glowIntensity * 0.6})`}
        strokeWidth={3 * currentScale}
        filter="url(#lensing)"
      />

      {/* Event horizon (the black circle) */}
      <circle
        cx={centerX}
        cy={centerY}
        r={bhRadius}
        fill="url(#eventHorizon)"
      />

      {/* Inner shadow ring for depth */}
      <circle
        cx={centerX}
        cy={centerY}
        r={bhRadius * 1.02}
        fill="none"
        stroke={`rgba(255, 100, 0, ${glowIntensity * 0.3})`}
        strokeWidth={2 * currentScale}
      />
    </svg>
  );
};
