import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Sequence,
} from "remotion";
import { Starfield } from "../components/Starfield";
import { BlackHole } from "../components/BlackHole";
import { AnimatedText } from "../components/AnimatedText";

// Scene 2: What is a black hole? - 9 seconds (270 frames @ 30fps)
export const SCENE2_DURATION = 270;

export const Scene2WhatIs: React.FC = () => {
  const frame = useCurrentFrame();

  const zoom = interpolate(frame, [0, SCENE2_DURATION], [1, 1.08], {
    extrapolateRight: "clamp",
  });

  // Fade in
  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  // Fade out
  const fadeOut = interpolate(
    frame,
    [SCENE2_DURATION - 25, SCENE2_DURATION],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: "#000005", opacity: fadeIn * fadeOut }}
    >
      <div
        style={{
          transform: `scale(${zoom})`,
          transformOrigin: "center",
        }}
      >
        <Starfield />
      </div>

      {/* Black hole appears centered, then drifts right */}
      <Sequence from={15}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          <BlackHole scale={0.85} centerX={1150} centerY={520} />
        </div>
      </Sequence>

      {/* Title */}
      <AnimatedText
        text="Que es un agujero negro?"
        enterAt={10}
        exitAt={SCENE2_DURATION - 20}
        x={530}
        y={80}
        fontSize={50}
        color="#ffcc44"
        align="left"
        maxWidth={800}
      />

      {/* First paragraph */}
      <AnimatedText
        text=""
        enterAt={40}
        exitAt={SCENE2_DURATION - 20}
        x={530}
        y={180}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={680}
        subtitle="Es una region del espacio donde la gravedad es tan increiblemente fuerte que nada puede escapar..."
        subtitleSize={30}
      />

      {/* Second paragraph with dramatic reveal */}
      <AnimatedText
        text="Ni siquiera la luz."
        enterAt={100}
        exitAt={SCENE2_DURATION - 20}
        x={530}
        y={340}
        fontSize={40}
        color="#ff8844"
        fontWeight="bold"
        align="left"
        maxWidth={680}
      />

      {/* Additional fact */}
      <AnimatedText
        text=""
        enterAt={140}
        exitAt={SCENE2_DURATION - 20}
        x={530}
        y={430}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={680}
        subtitle="Nacen cuando una estrella gigante muere y colapsa sobre si misma."
        subtitleSize={28}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
