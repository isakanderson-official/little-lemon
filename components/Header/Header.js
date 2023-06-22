import { View, Image, StyleSheet } from 'react-native';
import Avatar from '../Avatar/Avatar';
import { colors } from '../../constants/color';
const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Logo.png')} style={styles.image} />
      <Avatar
        onlyAvatar={true}
        style={styles.avatar}
        onPress={() => navigation.navigate('Profile')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  image: {
    height: 30,
    width: 300,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  avatar: {
    backgroundColor: colors.GREEN,
    height: 30,
    width: 30,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
