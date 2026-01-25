import { Composition } from "remotion";
import { SandsDXExplainer } from "./compositions/SandsDXExplainer";

// Video configuration
// 1 minute = 60 seconds at 30fps = 1800 frames
// Square format: 1080x1080

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="SandsDXExplainer"
        component={SandsDXExplainer}
        durationInFrames={1800}
        fps={30}
        width={1080}
        height={1080}
        defaultProps={{}}
      />
    </>
  );
};
