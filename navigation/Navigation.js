import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useContext, useEffect, useState } from "react";
import AppContext from "../context/AppContext";
import OnboardingScreen from "../screens/Onboarding";
import HomeScreen from "../screens/Home";
import SplashScreen from "../screens/Splash";
import ProfileScreen from "../screens/Profile";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header/Header";
import Avatar from "../components/Avatar/Avatar";
import { Pressable } from "react-native";
import {
  checkMenuTableAndPopulateData,
  getMenuItems,
  insertDataFromApiAsync,
  resetDatabase,
  selectAllMenu,
} from "../database";

const Navigation = () => {
  const Stack = createNativeStackNavigator();
  const { globalState, setOnboardingCompleted, updateUser } =
    useContext(AppContext);
  const { isOnboardingCompleted } = globalState;
  const [isLoading, setIsLoading] = useState(true);

  const loadApp = async () => {
    console.log("In loading app");
    try {
      const user = await AsyncStorage.getItem("user");
      if (user) {
        setOnboardingCompleted(true);
      }
      updateUser(JSON.parse(user));
      const existingMenuItems = await selectAllMenu();
      if (user && existingMenuItems.length) {
        setIsLoading(false);
        return;
      }
      console.log("Checking For items");
      await checkMenuTableAndPopulateData();
      setIsLoading(false);
    } catch (error) {
      console.error("There was an error", error);
      setIsLoading(false);
    }
  };

  // When app opens run this code
  useEffect(() => {
    loadApp();
  }, []);

  if (isLoading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          header: (props) => <Header {...props} />,
          headerShown: true,
        }}
      >
        {isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
