
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme !== 'light' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="StartPage" />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
  // return (
  // <ThemeProvider value={colorScheme !== 'light' ? DarkTheme : DefaultTheme}>      
  //   <Stack>
  //       <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
  //       <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
  //     </Stack>
  //   </ThemeProvider>
  // );
}

export default RootLayoutNav;
