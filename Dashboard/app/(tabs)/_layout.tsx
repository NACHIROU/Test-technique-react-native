// app/_layout.tsx
import { Stack } from 'expo-router';
import { ThemeProvider } from '../../src/theme/ThemeContext'; // Vérifie bien le chemin !

export default function RootLayout() {
  return (
    // C'est ICI que l'on branche la prise électrique pour TOUTE l'application
    <ThemeProvider>
      <Stack screenOptions={{ headerShown: false }}>
        {/* Ici, on dit à Expo de charger le groupe d'onglets (tabs) */}
        <Stack.Screen name="(tabs)" />
      </Stack>
    </ThemeProvider>
  );
}