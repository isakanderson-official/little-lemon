import {
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/Profile/CustomTextInput';
import Checkbox from 'expo-checkbox';
import AppContext from '../context/AppContext';
import { colors } from '../constants/color';
import CustomButton from '../components/HOC/CustomButton';
import CheckBoxSection from '../components/Profile/CheckboxSection';
import Avatar from '../components/Avatar/Avatar';

const initalNotificationPrefState = {
  orderStatus: true,
  password: true,
  offers: true,
  newsletter: true,
};

export default function ProfileScreen({ navigation }) {
  const [firstName, setFirstName] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [email, setEmail] = useState(null);
  const [notificationPref, setNotificationPref] = useState(
    initalNotificationPrefState
  );
  const { logOut, updateUser, globalState } = useContext(AppContext);

  const { user } = globalState;

  console.log('get', user);

  const setProfileValues = async (userAsyncStorage) => {
    const { firstName, email, lastName, phoneNumber, notificationPref } =
      userAsyncStorage;
    setFirstName(firstName);
    setLastName(lastName || null);
    setEmail(email);
    setPhoneNumber(phoneNumber || null);
    setNotificationPref(notificationPref || initalNotificationPrefState);
  };

  const loadProfileData = async () => {
    try {
      const jsonString = await AsyncStorage.getItem('user');
      if (!jsonString) return;
      await setProfileValues(JSON.parse(jsonString));
    } catch (error) {
      console.log('Error loading profile data:', error);
      return;
    }
  };

  const isValidPhoneNumber = (string) => {
    //US only phone number regex

    const phonePattern = /^(\+1)?[0-9]{3}[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
    return phonePattern.test(string);
  };

  const saveProfileChanges = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      alert('Invalid phone number');
      return;
    }
    try {
      updateUser({
        firstName,
        lastName,
        email,
        phoneNumber,
        notificationPref,
      });
      navigateToWelcomeScreen();
    } catch (error) {
      alert('Error saving profile changes');
      console.error(error);
    }
  };

  const discardProfileChanges = async () => {
    loadProfileData();
    alert('Changes discarded');
  };

  const changeNotificationPref = (key, value) => {
    setNotificationPref((prev) => ({ ...prev, [key]: value }));
  };

  const navigateToWelcomeScreen = () => navigation.navigate('Welcome');

  useEffect(() => {
    loadProfileData();
  }, []);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={{ padding: 20, flex: 1, gap: 10 }}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, color: colors.BLACK }}>
          Personal Information
        </Text>
        {/* Avatar Section  */}
        <Avatar user={user} />
        {/* Personal Information Section  */}
        <CustomTextInput
          label='First name'
          value={firstName}
          onChangeText={setFirstName}
        />
        <CustomTextInput
          value={lastName}
          label='Last name'
          placeholder='Doe...'
          onChangeText={setLastName}
        />
        <CustomTextInput
          label='Email'
          value={email}
          onChangeText={setEmail}
          inputMode='email'
          keyboardType='email-address'
        />
        <CustomTextInput
          value={phoneNumber}
          label='Phone number'
          placeholder='(000) 000-0000'
          onChangeText={setPhoneNumber}
          // inputMode='tel'
          keyboardType='numeric'
        />

        {/* Notification Section  */}
        <Text style={{ fontWeight: 'bold', fontSize: 15, color: colors.BLACK }}>
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
            onValueChange={(value) =>
              changeNotificationPref('newsletter', value)
            }
          />
        </View>
        <CustomButton
          text='Log out'
          style={{ backgroundColor: colors.YELLOW, borderColor: colors.YELLOW }}
          textStyle={{ color: colors.BLACK }}
          onPress={logOut}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            gap: 20,
          }}
        >
          <CustomButton
            text='Discard Changes'
            onPress={discardProfileChanges}
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0)',
              borderColor: colors.GREEN,
            }}
            textStyle={{ color: colors.BLACK }}
          />
          <CustomButton text='Save Changes' onPress={saveProfileChanges} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});
