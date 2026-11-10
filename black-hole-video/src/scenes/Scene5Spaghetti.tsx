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

// Scene 5: Spaghettification - 8 seconds (240 frames @ 30fps)
export const SCENE5_DURATION = 240;

export const Scene5Spaghetti: React.FC = () => {
  const frame = useCurrentFrame();

  // Accelerating zoom — getting sucked in
  const zoom = interpolate(frame, [0, SCENE5_DURATION], [1.05, 1.3], {
    extrapolateRight: "clamp",
  });

  const bhScale = interpolate(frame, [0, SCENE5_DURATION], [1.1, 1.5], {
    extrapolateRight: "clamp",
  });

  // Astronaut drifts toward the black hole
  const astroX = interpolate(frame, [0, SCENE5_DURATION], [220, 450], {
    extrapolateRight: "clamp",
  });

  // Astronaut stretches vertically (spaghettification effect!)
  const stretchY = interpolate(frame, [80, SCENE5_DURATION], [1, 1.6], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const stretchX = interpolate(frame, [80, SCENE5_DURATION], [1, 0.75], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeIn = interpolate(frame, [0, 20], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [SCENE5_DURATION - 25, SCENE5_DURATION],
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
          transformOrigin: "70% 50%",
        }}
      >
        <Starfield />
      </div>

      <Sequence from={0}>
        <div
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: "70% 50%",
          }}
        >
          <BlackHole scale={bhScale} centerX={1300} centerY={500} />
        </div>
      </Sequence>

      {/* Astronaut with spaghettification effect */}
      <svg
        width={1920}
        height={1080}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <g transform={`translate(${astroX}, 540) scale(${stretchX}, ${stretchY}) translate(${-astroX}, -540)`}>
          <Astronaut enterAt={0} x={astroX} y={540} scale={1.2} />
        </g>
      </svg>

      {/* Title */}
      <AnimatedText
        text="Espaguetificacion!"
        enterAt={10}
        exitAt={SCENE5_DURATION - 15}
        x={480}
        y={60}
        fontSize={50}
        color="#ff6688"
        align="left"
        maxWidth={700}
      />

      {/* Explanation */}
      <AnimatedText
        text=""
        enterAt={30}
        exitAt={SCENE5_DURATION - 15}
        x={480}
        y={150}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={620}
        subtitle="Si cayeras en un agujero negro, la gravedad estiraria tu cuerpo como un espagueti."
        subtitleSize={28}
      />

      {/* Name origin */}
      <AnimatedText
        text=""
        enterAt={80}
        exitAt={SCENE5_DURATION - 15}
        x={480}
        y={280}
        fontSize={26}
        fontWeight="400"
        align="left"
        maxWidth={620}
        subtitle="Los cientificos de verdad lo llaman asi: 'espaguetificacion'. No es broma!"
        subtitleSize={27}
      />

      {/* Fun closer */}
      <AnimatedText
        text="Mejor quedarse lejos..."
        enterAt={140}
        exitAt={SCENE5_DURATION - 15}
        x={480}
        y={400}
        fontSize={34}
        color="#ffaa66"
        fontWeight="600"
        align="left"
        maxWidth={620}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 70% 50%, transparent 25%, rgba(0,0,0,0.75) 100%)",
          pointerEvents: "none",
        }}
      />
    </AbsoluteFill>
  );
};
