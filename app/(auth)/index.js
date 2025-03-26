import { Link } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import { useState, useContext } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import axios from "axios";

// import des composants necessaire
import LogoTitle from "../../components/LogoTitle.js";
import Input from "../../components/Input.js";
import MainButton from "../../components/MainButton.js";
// import { LogoTitle, MainButton, Input } from "../../components/index.js";

// import context
import AuthContext from "../../contexts/AuthContext.js";

export default LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      if (!email || !password) {
        return setErrorMessage("Please fill all fields");
      }
      const formData = { email: email, password: password };
      const response = await axios.post(
        "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in",
        formData
      );

      // console.log(response.data);
      // alert("Congratulations, you are connected. 🎉");
      login(response.data.id, response.data.token);
      setErrorMessage("");
    } catch (error) {
      // console.log(error.response);
      if (error.response.status === 400) {
        return setErrorMessage("This information is not correct!");
      }

      if (error.response.status === 500) {
        return setErrorMessage("Error Intern");
      }
      console.log(error.response);
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <LogoTitle title={"Sign In"} />
      <View style={styles.form}>
        <Input
          value={email}
          name="email"
          setValue={setEmail}
          placeholder="email"
        />
        <Input
          value={password}
          name="password"
          setValue={setPassword}
          placeholder="password"
          type={"password"}
        />
      </View>
      <View style={{ alignItems: "center", gap: 15 }}>
        {errorMessage && (
          <Text style={styles.errorMessage}>{errorMessage}</Text>
        )}
        <MainButton content="Sign in" func={handleSubmit} />
        <Link href={"/signup"} style={styles.link}>
          No account ? Register
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
  head: {
    alignItems: "center",
    gap: 25,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
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
