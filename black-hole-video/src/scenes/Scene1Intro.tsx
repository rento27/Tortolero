import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
} from "remotion";
import { Starfield } from "../components/Starfield";
import { AnimatedText } from "../components/AnimatedText";

// Scene 1: Title / Intro - 8 seconds (240 frames @ 30fps)
export const SCENE1_DURATION = 240;

export const Scene1Intro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Slow zoom into the stars
  const zoom = interpolate(frame, [0, SCENE1_DURATION], [1, 1.15], {
    extrapolateRight: "clamp",
  });

  // Fade out at the end
  const fadeOut = interpolate(
    frame,
    [SCENE1_DURATION - 30, SCENE1_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Title line animation
  const lineWidth = spring({
    frame: Math.max(0, frame - 50),
    fps,
    config: { damping: 50, stiffness: 60, mass: 1 },
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000005", opacity: fadeOut }}>
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        <Starfield />
      </div>

      {/* Channel name */}
      <AnimatedText
        text="Mi Pequeno Astronauta"
        enterAt={15}
        x={960}
        y={260}
        fontSize={44}
        color="#88bbff"
        fontWeight="600"
      />

      {/* Decorative line */}
      {frame > 50 && (
        <div
          style={{
            position: "absolute",
            left: 960 - 160 * lineWidth,
            top: 385,
            width: 320 * lineWidth,
            height: 3,
            background:
              "linear-gradient(90deg, transparent, #ffaa44, #ff6600, #ffaa44, transparent)",
            borderRadius: 2,
          }}
        />
      )}

      {/* Main title */}
      <AnimatedText
        text="AGUJEROS NEGROS"
        enterAt={35}
        x={960}
        y={400}
        fontSize={100}
        color="#ffffff"
        fontWeight="bold"
      />

      {/* Subtitle */}
      <AnimatedText
        text="Los monstruos del universo"
        enterAt={65}
        x={960}
        y={540}
        fontSize={34}
        color="rgba(255, 200, 100, 0.9)"
        fontWeight="400"
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
