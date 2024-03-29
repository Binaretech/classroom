import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'app/provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useColorScheme } from 'react-native';
import { initializeLang } from 'app/lang';
import { initializeDayjsPlugins } from 'app/utils/date';
import { AuthProvider } from 'app/provider/AuthProvider';
initializeDayjsPlugins();

initializeLang();

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const scheme = useColorScheme();

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}
