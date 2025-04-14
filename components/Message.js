import { StyleSheet, Text, View } from "react-native";

function Message({ message, color }) {
  return (
    <View style={styles.errorView}>
      {message !== null && (
        <Text
          style={
            color === "success"
              ? styles.successText
              : color === "error"
              ? styles.errorText
              : null
          }
        >
          {message}
        </Text>
      )}
    </View>
  );
}

export default Message;

const styles = StyleSheet.create({
  errorView: {
    height: 30,
  },
  errorText: {
    color: "#f9575d",
  },
  successText: {
    color: "#7D7D7D",
  },
});
