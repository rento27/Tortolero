import React from "react";
import { AbsoluteFill, Series } from "remotion";
import { Scene1Intro, SCENE1_DURATION } from "../scenes/Scene1Intro";
import { Scene2WhatIs, SCENE2_DURATION } from "../scenes/Scene2WhatIs";
import { Scene3EventHorizon, SCENE3_DURATION } from "../scenes/Scene3EventHorizon";
import { Scene4Facts, SCENE4_DURATION } from "../scenes/Scene4Facts";
import { Scene5Spaghetti, SCENE5_DURATION } from "../scenes/Scene5Spaghetti";
import { Scene6Outro, SCENE6_DURATION } from "../scenes/Scene6Outro";

// Total: 240 + 270 + 240 + 240 + 240 + 240 = 1470 frames = 49 seconds @ 30fps
export const TOTAL_DURATION =
  SCENE1_DURATION +
  SCENE2_DURATION +
  SCENE3_DURATION +
  SCENE4_DURATION +
  SCENE5_DURATION +
  SCENE6_DURATION;

export const BlackHoleVideo: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#000005" }}>
      <Series>
        <Series.Sequence durationInFrames={SCENE1_DURATION}>
          <Scene1Intro />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE2_DURATION}>
          <Scene2WhatIs />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE3_DURATION}>
          <Scene3EventHorizon />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE4_DURATION}>
          <Scene4Facts />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE5_DURATION}>
          <Scene5Spaghetti />
        </Series.Sequence>
        <Series.Sequence durationInFrames={SCENE6_DURATION}>
          <Scene6Outro />
        </Series.Sequence>
      </Series>
    </AbsoluteFill>
  );
};
