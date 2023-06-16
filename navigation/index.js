import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import OnboardingScreen from '../screens/Onboarding';
import WelcomeScreen from '../screens/Welcome';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { globalState, setOnboardingCompleted } = useContext(AppContext);
  const { isOnboardingCompleted } = globalState;
  const [isLoading, setIsLoading] = useState(true);

  const checkProfile = async () => {
    console.log('In Check Profile');
    try {
      const user = await AsyncStorage.getItem('user');
      console.log(JSON.parse(user));
      if (user) {
        setOnboardingCompleted(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // When app opens run this code
  useEffect(() => {
    console.log('Checking Profile');
    checkProfile();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isOnboardingCompleted ? (
          <>
            <Stack.Screen name='Onboarding' component={OnboardingScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name='Profile' component={ProfileScreen} />
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
