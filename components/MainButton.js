import { TouchableOpacity, Text, StyleSheet } from "react-native";

const MainButton = ({ content, func }) => {
  return (
    <TouchableOpacity
      title="Submit"
      onPress={() => {
        func();
      }}
      style={styles.button}
    >
      <Text> {content} </Text>
    </TouchableOpacity>
  );
};

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderWidth: 3,
    borderColor: "#EB5A62",
    borderRadius: 30,
    paddingVertical: 10,
    alignItems: "center",
    width: 150,
  },
});
