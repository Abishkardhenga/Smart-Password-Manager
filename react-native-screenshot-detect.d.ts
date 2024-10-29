declare module "react-native-screenshot-detect" {
    const ScreenshotDetector: {
      subscribe: (callback: () => void) => () => void;
    };
    export default ScreenshotDetector;
  }
  