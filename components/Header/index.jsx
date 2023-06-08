import { View, Text, Image, StyleSheet } from 'react-native';
const Header = () => {
  return (
    <View style={styles.container}>
      {/* <Image source={require('../../assets/Logo.png')} style={styles.image} /> */}
      <Text style={styles.text}>Little Lemon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F5F5F5',
  },
  image: {
    width: 500,
    height: 24,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: '#495E57',
  },
});

export default Header;
