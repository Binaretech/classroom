import { useFonts } from 'expo-font';

export default function useRoboto() {
  const [loaded] = useFonts({
    RobotoBlack: require('../assets/fonts/Roboto/Roboto-Black.ttf'),
    RobotoBlackItalic: require('../assets/fonts/Roboto/Roboto-BlackItalic.ttf'),
    RobotoBold: require('../assets/fonts/Roboto/Roboto-Bold.ttf'),
    RobotoBoldItalic: require('../assets/fonts/Roboto/Roboto-BoldItalic.ttf'),
    RobotoItalic: require('../assets/fonts/Roboto/Roboto-Italic.ttf'),
    RobotoLight: require('../assets/fonts/Roboto/Roboto-Light.ttf'),
    RobotoLightItalic: require('../assets/fonts/Roboto/Roboto-LightItalic.ttf'),
    RobotoRegular: require('../assets/fonts/Roboto/Roboto-Regular.ttf'),
    RobotoThin: require('../assets/fonts/Roboto/Roboto-Thin.ttf'),
    RobotoThinItalic: require('../assets/fonts/Roboto/Roboto-ThinItalic.ttf'),
  });

  return [loaded];
}
