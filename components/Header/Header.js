import { View, Image, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Avatar from "../Avatar/Avatar";
import { colors } from "../../constants/color";

const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require("../../assets/Logo.png")} style={styles.image} />
      </View>

      <Avatar
        onlyAvatar={true}
        style={styles.avatar}
        fontSize={10}
        onPress={() => navigation.navigate("Profile")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
    paddingVertical: 10,
    marginTop: 30,
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginLeft: 40,
    flex: 1,
    alignItems: "center",
  },
  image: {
    height: 70,
    width: 170,
    resizeMode: "contain",
    alignSelf: "center",
  },
  avatar: {
    backgroundColor: colors.GREEN,
    height: 50,
    width: 50,
    borderRadius: 100,
    alignSelf: "flex-end",
  },
});

export default Header;
