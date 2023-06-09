import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnboardingScreen from './screens/Onboarding';
import WelcomeScreen from './screens/Profile copy';
import ProfileScreen from './screens/Profile';
import { useEffect, useState } from 'react';
import SplashScreen from './screens/SplashScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const Stack = createNativeStackNavigator();
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboardingCompleted, setIsOnboardingCompleted] = useState(false);

  const handleOnboardingNextPress = async () => {
    try {
      await AsyncStorage.setItem('profile', 'token');
      setIsOnboardingCompleted(true);
    } catch (error) {
      console.error('Error setting profile');
    }
  };

  const checkProfile = async () => {
    try {
      const profile = await AsyncStorage.getItem('profile');
      if (profile.length > 1) {
        setIsOnboardingCompleted(true);
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkProfile();
    // When app opens run this code
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isOnboardingCompleted ? (
          <>
            <Stack.Screen
              name='Onboarding'
              component={OnboardingScreen}
              initialParams={{ handleOnboardingNextPress }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
            <Stack.Screen name='Profile' component={ProfileScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
