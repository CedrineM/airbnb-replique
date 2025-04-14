import { Image, StyleSheet, View } from "react-native";
import logo from "../assets/img/logo.png";

const Header = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Image source={logo} style={styles.img} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  img: {
    height: 30,
    width: 30,
  },
});
