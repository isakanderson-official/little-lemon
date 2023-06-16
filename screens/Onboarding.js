import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import Header from '../components/Header';
import { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Onboarding() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setOnboardingCompleted } = useContext(AppContext);

  useEffect(() => {
    const nameValid = firstName?.length > 3;
    const emailValid = email?.length > 6 && email?.includes('@');

    if (nameValid && emailValid) setIsButtonDisabled(false);
    else setIsButtonDisabled(true);
  }, [email, firstName]);

  const user = { firstName, email };

  const onNextPress = async () => {
    try {
      await AsyncStorage.setItem('user', JSON.stringify(user));
      setOnboardingCompleted(true);
    } catch (error) {
      console.error('ERROR', error);
    }
  };

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.middleContainer}>
        <Text style={styles.title}>Let us get to know you</Text>

        <View style={styles.inputContainer}>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>First Name</Text>
            <TextInput
              style={styles.input}
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              keyboardType='email-address'
            />
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Pressable
          style={[styles.nextButton, isButtonDisabled && styles.disabledButton]}
          disabled={isButtonDisabled}
          onPress={onNextPress}
        >
          <Text style={styles.nextButtonText}>Next</Text>
        </Pressable>
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
  middleContainer: {
    backgroundColor: '#EDEFEE',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 30,
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: 'black',
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
    paddingVertical: 30,
  },
  inputWrapper: {
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 16,

    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  footer: {
    backgroundColor: 'white',
    padding: 10,
    paddingBottom: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  nextButton: {
    display: 'flex',
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  disabledButton: {
    backgroundColor: '#D3D3D3',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
