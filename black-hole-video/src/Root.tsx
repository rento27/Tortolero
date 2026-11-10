import { Composition } from "remotion";
import { BlackHoleVideo, TOTAL_DURATION } from "./components/BlackHoleVideo";
import { Scene1Intro, SCENE1_DURATION } from "./scenes/Scene1Intro";
import { Scene2WhatIs, SCENE2_DURATION } from "./scenes/Scene2WhatIs";
import { Scene3EventHorizon, SCENE3_DURATION } from "./scenes/Scene3EventHorizon";
import { Scene4Facts, SCENE4_DURATION } from "./scenes/Scene4Facts";
import { Scene5Spaghetti, SCENE5_DURATION } from "./scenes/Scene5Spaghetti";
import { Scene6Outro, SCENE6_DURATION } from "./scenes/Scene6Outro";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {/* Full video - all scenes joined (49 seconds) */}
      <Composition
        id="BlackHole"
        component={BlackHoleVideo}
        durationInFrames={TOTAL_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />

      {/* Individual scenes for preview/editing */}
      <Composition
        id="Scene1-Intro"
        component={Scene1Intro}
        durationInFrames={SCENE1_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene2-QueEsUnAgujeroNegro"
        component={Scene2WhatIs}
        durationInFrames={SCENE2_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene3-HorizonteDeEventos"
        component={Scene3EventHorizon}
        durationInFrames={SCENE3_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene4-DatosIncreibles"
        component={Scene4Facts}
        durationInFrames={SCENE4_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene5-Espaguetificacion"
        component={Scene5Spaghetti}
        durationInFrames={SCENE5_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="Scene6-Outro"
        component={Scene6Outro}
        durationInFrames={SCENE6_DURATION}
        fps={30}
        width={1920}
        height={1080}
      />
    </>
  );
};
