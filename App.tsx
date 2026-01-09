// App.tsx

// import de pacotes
import { NavigationContainer } from '@react-navigation/native';
import { AppRoutes } from '@/navigation/index';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppRoutes />
        <StatusBar style="light" />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}