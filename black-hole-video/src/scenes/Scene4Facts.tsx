import React from "react";
import {
  AbsoluteFill,
  useCurrentFrame,
  interpolate,
  Sequence,
} from "remotion";
import { Starfield } from "../components/Starfield";
import { BlackHole } from "../components/BlackHole";
import { Astronaut } from "../components/Astronaut";
import { AnimatedText } from "../components/AnimatedText";

// Scene 4: Incredible Facts - 8 seconds (240 frames @ 30fps)
export const SCENE4_DURATION = 240;

export const Scene4Facts: React.FC = () => {
  const frame = useCurrentFrame();

  const zoom = interpolate(frame, [0, SCENE4_DURATION], [1, 1.06], {
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [SCENE4_DURATION - 25, SCENE4_DURATION],
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

      <Sequence from={0}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "center",
          }}
        >
          <BlackHole scale={1.0} centerX={1250} centerY={480} />
        </div>
      </Sequence>

      {/* Astronaut floating in */}
      <svg
        width={1920}
        height={1080}
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <Astronaut enterAt={20} x={200} y={520} scale={1.3} />
      </svg>

      {/* Title */}
      <AnimatedText
        text="Datos Increibles"
        enterAt={10}
        exitAt={SCENE4_DURATION - 15}
        x={550}
        y={70}
        fontSize={52}
        color="#44ddff"
        align="left"
        maxWidth={700}
      />

      {/* Fact 1: Sagittarius A* */}
      <AnimatedText
        text=""
        enterAt={30}
        exitAt={SCENE4_DURATION - 15}
        x={550}
        y={170}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={650}
        subtitle="El agujero negro en el centro de nuestra galaxia tiene la masa de 4 millones de soles."
        subtitleSize={28}
      />

      {/* Fact 1 name */}
      <AnimatedText
        text="Sagitario A*"
        enterAt={60}
        exitAt={SCENE4_DURATION - 15}
        x={550}
        y={290}
        fontSize={36}
        color="#ffcc44"
        fontWeight="bold"
        align="left"
        maxWidth={650}
      />

      {/* Fact 2 */}
      <AnimatedText
        text=""
        enterAt={90}
        exitAt={SCENE4_DURATION - 15}
        x={550}
        y={370}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={650}
        subtitle="Esta a 26,000 anos luz de distancia. Si viajaras a la velocidad de la luz, tardarias 26,000 anos en llegar!"
        subtitleSize={27}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 65% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
