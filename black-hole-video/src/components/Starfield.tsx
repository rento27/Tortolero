import React, { useMemo } from "react";
import { useCurrentFrame, interpolate, random } from "remotion";

interface Star {
  x: number;
  y: number;
  size: number;
  brightness: number;
  twinkleSpeed: number;
}

export const Starfield: React.FC = () => {
  const frame = useCurrentFrame();

  const stars = useMemo<Star[]>(() => {
    return Array.from({ length: 300 }, (_, i) => ({
      x: random(`star-x-${i}`) * 1920,
      y: random(`star-y-${i}`) * 1080,
      size: random(`star-s-${i}`) * 2.5 + 0.5,
      brightness: random(`star-b-${i}`) * 0.7 + 0.3,
      twinkleSpeed: random(`star-t-${i}`) * 0.1 + 0.02,
    }));
  }, []);

  return (
    <svg
      width={1920}
      height={1080}
      style={{ position: "absolute", top: 0, left: 0 }}
    >
      {stars.map((star, i) => {
        const twinkle = interpolate(
          Math.sin(frame * star.twinkleSpeed + i),
          [-1, 1],
          [star.brightness * 0.4, star.brightness]
        );

        return (
          <circle
            key={i}
            cx={star.x}
            cy={star.y}
            r={star.size}
            fill={`rgba(255, 255, 255, ${twinkle})`}
          />
        );
      })}
    </svg>
  );
};
