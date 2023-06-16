import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/Profile/CustomTextInput';
import Checkbox from 'expo-checkbox';
import AppContext from '../context/AppContext';
import { colors } from '../constants/color';
import CustomButton from '../components/HOC/CustomButton';
import CheckBoxSection from '../components/Profile/CheckboxSection';

export default function ProfileScreen() {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [notificationPref, setNotificationPref] = useState({
    orderStatus: false,
    password: true,
    offers: true,
    newsletter: true,
  });
  const { logOut } = useContext(AppContext);

  const loadProfileData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('user');
      if (!jsonString) return;
      const { firstName, email, lastName, phoneNumber } =
        JSON.parse(jsonString);
      setFirstName(firstName);
      setEmail(email);
      setLastName(lastName || null);
      setLastName(phoneNumber || null);
    } catch (error) {
      console.log('Error loading profile data:', error);
      return;
    }
  };

  const changeNotificationPref = (key, value) => {
    setNotificationPref((prev) => ({ ...prev, [key]: value }));
  };

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <View style={{ padding: 20, flex: 1, gap: 10 }}>
      <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
        Personal Information
      </Text>
      {/* Avatar Section  */}
      {/* Personal Information Section  */}
      <CustomTextInput
        label='First name'
        value={firstName}
        onChangeText={setFirstName}
      />
      <CustomTextInput
        label='Last name'
        placeholder='Doe...'
        onChangeText={setLastName}
      />
      <CustomTextInput label='Email' value={email} onChangeText={setEmail} />
      <CustomTextInput
        label='Phone number'
        placeholder='(000) 000-0000'
        onChangeText={setPhoneNumber}
      />

      {/* Notification Section  */}
      <Text style={{ fontWeight: 'bold', fontSize: 15 }}>
        Email notifications
      </Text>
      {/* Checkbox Section */}
      <View style={{ flexDirection: 'column', gap: 15 }}>
        <CheckBoxSection
          text={'Order status'}
          value={notificationPref.orderStatus}
          onValueChange={(value) =>
            changeNotificationPref('orderStatus', value)
          }
        />
        <CheckBoxSection
          text={'Password changes'}
          value={notificationPref.password}
          onValueChange={(value) => changeNotificationPref('password', value)}
        />
        <CheckBoxSection
          text={'Special offers'}
          value={notificationPref.offers}
          onValueChange={(value) => changeNotificationPref('offers', value)}
        />
        <CheckBoxSection
          text={'Newsletter'}
          value={notificationPref.newsletter}
          onValueChange={(value) => changeNotificationPref('newsletter', value)}
        />
      </View>
      <CustomButton
        text='Log out'
        style={{ backgroundColor: colors.YELLOW }}
        textStyle={{ color: colors.BLACK }}
      />
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          gap: 20,
        }}
      >
        <CustomButton
          text='Discard Changes'
          onPress={logOut}
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0)',
            borderColor: colors.GREEN,
          }}
          textStyle={{ color: colors.BLACK }}
        />
        <CustomButton text='Save Changes' />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
