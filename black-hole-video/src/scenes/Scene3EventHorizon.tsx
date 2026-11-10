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

// Scene 3: Event Horizon - 8 seconds (240 frames @ 30fps)
export const SCENE3_DURATION = 240;

export const Scene3EventHorizon: React.FC = () => {
  const frame = useCurrentFrame();

  // Zoom in closer to the black hole
  const zoom = interpolate(frame, [0, SCENE3_DURATION], [1.05, 1.2], {
    extrapolateRight: "clamp",
  });

  const bhScale = interpolate(frame, [0, SCENE3_DURATION], [0.9, 1.15], {
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [SCENE3_DURATION - 25, SCENE3_DURATION],
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
          transformOrigin: "60% 50%",
        }}
      >
        <Starfield />
      </div>

      <Sequence from={0}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "60% 50%",
          }}
        >
          <BlackHole scale={bhScale} centerX={1200} centerY={500} />
        </div>
      </Sequence>

      {/* Title */}
      <AnimatedText
        text="El Horizonte de Eventos"
        enterAt={10}
        exitAt={SCENE3_DURATION - 15}
        x={450}
        y={80}
        fontSize={48}
        color="#ff8844"
        align="left"
        maxWidth={750}
      />

      {/* Explanation 1 */}
      <AnimatedText
        text=""
        enterAt={30}
        exitAt={SCENE3_DURATION - 15}
        x={450}
        y={175}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={650}
        subtitle="Es el limite invisible alrededor del agujero negro. Si cruzas esta frontera... no hay vuelta atras."
        subtitleSize={28}
      />

      {/* Dramatic line */}
      <AnimatedText
        text="El punto de no retorno."
        enterAt={80}
        exitAt={SCENE3_DURATION - 15}
        x={450}
        y={320}
        fontSize={38}
        color="#ff5544"
        fontWeight="bold"
        align="left"
        maxWidth={650}
      />

      {/* Time distortion fact */}
      <AnimatedText
        text=""
        enterAt={120}
        exitAt={SCENE3_DURATION - 15}
        x={450}
        y={410}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={650}
        subtitle="El tiempo se distorsiona tanto que, para alguien observando desde fuera, parecerias congelado para siempre."
        subtitleSize={27}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 60% 50%, transparent 30%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
