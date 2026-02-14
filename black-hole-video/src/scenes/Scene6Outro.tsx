import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Sequence,
} from "remotion";
import { Starfield } from "../components/Starfield";
import { BlackHole } from "../components/BlackHole";
import { AnimatedText } from "../components/AnimatedText";

// Scene 6: Outro - 8 seconds (240 frames @ 30fps)
export const SCENE6_DURATION = 240;

export const Scene6Outro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Final fade to black
  const fadeOut = interpolate(
    frame,
    [SCENE6_DURATION - 45, SCENE6_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Black hole slowly drifts away and shrinks
  const bhScale = interpolate(frame, [0, SCENE6_DURATION], [1.0, 0.5], {
    extrapolateRight: "clamp",
  });

  // Subscribe button pulse
  const pulse = interpolate(
    Math.sin(frame * 0.1),
    [-1, 1],
    [0.95, 1.05]
  );

  const subscribeOpacity = spring({
    frame: Math.max(0, frame - 80),
    fps,
    config: { damping: 40, stiffness: 60, mass: 1 },
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000005", opacity: fadeIn * fadeOut }}
    >
      <Starfield />

      <Sequence from={0}>
        <BlackHole scale={bhScale} centerX={960} centerY={540} />
      </Sequence>

      {/* Channel name */}
      <AnimatedText
        text="Mi Pequeno Astronauta"
        enterAt={15}
        x={960}
        y={200}
        fontSize={62}
        color="#88bbff"
      />

      {/* Thanks message */}
      <AnimatedText
        text="Gracias por explorar el universo conmigo!"
        enterAt={40}
        x={960}
        y={310}
        fontSize={30}
        color="rgba(255, 255, 255, 0.85)"
        fontWeight="400"
      />

      {/* Subscribe CTA */}
      {frame > 80 && (
        <div
          style={{
            position: "absolute",
            left: 960 - 180,
            top: 620,
            width: 360,
            height: 60,
            borderRadius: 30,
            background: "linear-gradient(135deg, #ff4444, #cc0000)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: subscribeOpacity,
            transform: `scale(${pulse})`,
            boxShadow: "0 4px 20px rgba(255, 0, 0, 0.4)",
          }}
        >
          <span
            style={{
              fontFamily: "'Arial Black', Arial, sans-serif",
              fontSize: 24,
              fontWeight: "bold",
              color: "#ffffff",
              letterSpacing: "0.05em",
            }}
          >
            SUSCRIBETE
          </span>
        </div>
      )}

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
