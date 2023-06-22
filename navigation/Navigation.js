import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import OnboardingScreen from '../screens/Onboarding';
import WelcomeScreen from '../screens/Welcome';
import SplashScreen from '../screens/SplashScreen';
import ProfileScreen from '../screens/Profile';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header/Header';

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { globalState, setOnboardingCompleted, updateUser } =
    useContext(AppContext);
  const { isOnboardingCompleted } = globalState;
  const [isLoading, setIsLoading] = useState(true);

  const checkProfile = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user) {
        setOnboardingCompleted(true);
      }
      updateUser(JSON.parse(user));
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // When app opens run this code
  useEffect(() => {
    checkProfile();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitle: (props) => <Header {...props} />,
        }}
      >
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
