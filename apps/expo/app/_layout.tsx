import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'app/provider';
import { useFonts } from 'expo-font';
import { Stack, Redirect } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { initializeLang } from 'app/lang';
import auth from '@react-native-firebase/auth';

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const scheme = useColorScheme();

  const isAuth = Boolean(auth().currentUser?.email);
  console.log('isAuth', isAuth);

  useEffect(() => {
    initializeLang();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack />
      </ThemeProvider>
    </Provider>
  );
}
