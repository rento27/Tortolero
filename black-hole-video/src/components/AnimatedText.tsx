import React from "react";
import {
  useCurrentFrame,
  interpolate,
  spring,
  useVideoConfig,
  Easing,
} from "remotion";

interface AnimatedTextProps {
  text: string;
  enterAt?: number;
  exitAt?: number;
  x?: number;
  y?: number;
  fontSize?: number;
  color?: string;
  fontWeight?: string;
  align?: "left" | "center" | "right";
  maxWidth?: number;
  shadow?: boolean;
  subtitle?: string;
  subtitleSize?: number;
}

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  enterAt = 0,
  exitAt = Infinity,
  x = 960,
  y = 540,
  fontSize = 64,
  color = "#ffffff",
  fontWeight = "bold",
  align = "center",
  maxWidth = 1400,
  shadow = true,
  subtitle,
  subtitleSize = 28,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const relativeFrame = frame - enterAt;
  if (relativeFrame < 0) return null;

  // Entry animation
  const enterProgress = spring({
    frame: relativeFrame,
    fps,
    config: { damping: 40, stiffness: 80, mass: 1 },
  });

  // Exit animation
  const exitProgress =
    exitAt === Infinity
      ? 1
      : interpolate(frame, [exitAt - 15, exitAt], [1, 0], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        });

  const opacity = enterProgress * exitProgress;
  const translateY = interpolate(enterProgress, [0, 1], [40, 0]);

  const textAlign =
    align === "left" ? "flex-start" : align === "right" ? "flex-end" : "center";

  const textShadow = shadow
    ? "0 0 20px rgba(0,0,0,0.8), 0 0 60px rgba(0,0,0,0.5), 0 2px 4px rgba(0,0,0,0.9)"
    : "none";

  return (
    <div
      style={{
        position: "absolute",
        left: x - maxWidth / 2,
        top: y,
        width: maxWidth,
        display: "flex",
        flexDirection: "column",
        alignItems: textAlign,
        opacity,
        transform: `translateY(${translateY}px)`,
      }}
    >
      <div
        style={{
          fontFamily: "'Arial Black', 'Helvetica Neue', Arial, sans-serif",
          fontSize,
          fontWeight,
          color,
          textShadow,
          textAlign: align,
          lineHeight: 1.2,
          letterSpacing: "0.02em",
        }}
      >
        {text}
      </div>
      {subtitle && (
        <div
          style={{
            fontFamily: "'Helvetica Neue', Arial, sans-serif",
            fontSize: subtitleSize,
            fontWeight: "400",
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 0 15px rgba(0,0,0,0.9), 0 2px 4px rgba(0,0,0,0.8)",
            textAlign: align,
            marginTop: 16,
            lineHeight: 1.5,
            maxWidth: maxWidth * 0.85,
          }}
        >
          {subtitle}
        </div>
      )}
    </div>
  );
};
