import { TextInput, StyleSheet, View } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { useState } from "react";

const Input = ({
  value,
  name,
  setValue,
  placeholder,
  type,
  multiline,
  setDisplayMessage,
  setIsInfosModified,
}) => {
  const [visible, setVisible] = useState(true);

  return (
    <View style={{ flexDirection: "row", gap: 10 }}>
      <TextInput
        value={value}
        name={name}
        onChangeText={(text) => {
          setValue(text);
          if (setDisplayMessage) {
            setDisplayMessage(false);
          }

          if (setIsInfosModified) {
            setIsInfosModified(true);
          }
        }}
        placeholder={placeholder}
        style={multiline ? styles.largeInput : styles.input}
        multiline={multiline && true}
        secureTextEntry={type === "password" && visible}
      />
      {type === "password" &&
        (visible ? (
          <Feather
            name="eye"
            size={24}
            color="#7D7D7D"
            onPress={() => {
              setVisible(false);
            }}
          />
        ) : (
          <Feather
            name="eye-off"
            size={24}
            color="#7D7D7D"
            onPress={() => {
              setVisible(true);
            }}
          />
        ))}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  input: {
    textAlign: "left",
    borderBottomColor: "rgba(235, 90, 97, 0.5)",
    borderBottomWidth: 2,
    paddingVertical: 5,
    width: "90%",
    position: "relative",
    paddingRight: 25,
  },

  largeInput: {
    borderColor: "rgba(235, 90, 97, 0.5)",
    borderWidth: 2,
    width: "90%",
    marginBottom: 30,
    marginTop: 15,
    fontSize: 16,
    height: 100,
    padding: 10,
    verticalAlign: "top",
  },
});
