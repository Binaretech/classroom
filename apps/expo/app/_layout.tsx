import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Provider } from 'app/provider';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { initializeLang } from 'app/lang';
import UserInformationModal from 'app/components/userInformationModal/UserInformationModal';

export default function HomeLayout() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const scheme = useColorScheme();

  useEffect(() => {
    initializeLang();
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <Provider>
      <ThemeProvider value={scheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
        <UserInformationModal />
      </ThemeProvider>
    </Provider>
  );
}
