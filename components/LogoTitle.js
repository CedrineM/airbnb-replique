import { Image, StyleSheet, View, Text } from "react-native";

import logo from "../assets/img/logo.png";

const LogoTitle = ({ title }) => {
  return (
    <View style={styles.head}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};
export default LogoTitle;
const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  head: {
    alignItems: "center",
    gap: 25,
  },
  title: {
    fontSize: 24,
    color: "#7D7D7D",
  },
});
