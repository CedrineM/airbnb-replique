import { Link } from "expo-router";
import { View, Text, StyleSheet, Image } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// import des composants necessaire
import LogoTitle from "../../components/LogoTitle.js";
import Input from "../../components/Input.js";
import MainButton from "../../components/MainButton.js";
// import { LogoTitle, Input, MainButton } from "../../components/index.js";

// import context
import AuthContext from "../../contexts/AuthContext.js";

export default SignupPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [description, setDescription] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      if (
        !email ||
        !password ||
        !username ||
        !description ||
        !confirmPassword
      ) {
        return setErrorMessage("Please fill all fields");
      }
      if (password !== confirmPassword) {
        return setErrorMessage("Both passwords must be identical");
      }
      const formData = {
        email: email,
        username: username,
        password: password,
        description: description,
      };

      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
        formData
      );

      // console.log(response.data);
      // alert("Your account has been created 🎉");

      login(response.data.id, response.data.token);
      setErrorMessage("");
    } catch (error) {
      if (error.response.status === 400) {
        return setErrorMessage(
          "This email or username already has an account."
        );
      }
      if (error.response.status === 500) {
        return setErrorMessage("Error Intern");
      }
      console.log(error.response);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <LogoTitle title={"Sign Up"} />

      <View style={styles.form}>
        <Input
          value={email}
          name="email"
          setValue={setEmail}
          placeholder="Email"
        />
        <Input
          value={username}
          name="username"
          setValue={setUsername}
          placeholder="Username"
        />
        <Input
          value={description}
          name="description"
          setValue={setDescription}
          placeholder="Describe yourself in a few words..."
          multiline="true"
        />
        <Input
          value={password}
          name="password"
          setValue={setPassword}
          placeholder="Password"
          type={"password"}
        />
        <Input
          value={confirmPassword}
          name="confirmPassword"
          setValue={setConfirmPassword}
          placeholder="Confirm password"
          type={"password"}
        />
      </View>
      <View style={{ alignItems: "center", gap: 15 }}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <MainButton content="Sign in" func={handleSubmit} />
        <Link href={"/"} style={styles.link}>
          Already have an account ? Sign in
        </Link>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 30,
  },

  title: {
    fontSize: 24,
    color: "#7D7D7D",
  },

  errorMessage: {
    color: "#EB5A62",
  },

  form: {
    width: "100%",
    gap: 30,
  },

  link: { color: "#7D7D7D" },
});
