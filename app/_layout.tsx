
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/components/useColorScheme';
import { StatusBar } from 'expo-status-bar';


function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={DarkTheme}>
      <StatusBar style="light" backgroundColor='#000000'/>
      <Stack>
        <Stack.Screen name="Auth" options={{headerShown: false}}/>
        <Stack.Screen name="survey" options={{headerShown: false}}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );

}

export default RootLayoutNav;
