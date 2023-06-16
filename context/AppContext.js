import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useState } from 'react';

export default AppContext = createContext();

export const AppProvider = ({ children }) => {
  const initalState = {
    isOnboardingCompleted: false,
  };

  const [globalState, setGlobalState] = useState(initalState);

  const setOnboardingCompleted = async (value = true) => {
    setGlobalState((prev) => ({
      ...prev,
      isOnboardingCompleted: value,
    }));
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    setOnboardingCompleted(false);
  };

  return (
    <AppContext.Provider
      value={{ globalState, setGlobalState, setOnboardingCompleted, logOut }}
    >
      {children}
    </AppContext.Provider>
  );
};
