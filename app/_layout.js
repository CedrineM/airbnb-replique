import { Slot, Stack, router } from "expo-router";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// import des context necessaire
import AuthContext from "../contexts/AuthContext";

const LayoutApp = () => {
  const [userID, setUserID] = useState(null);
  const [userToken, setuserToken] = useState(null);

  const login = async (id, token) => {
    await AsyncStorage.setItem("userId", String(id));
    await AsyncStorage.setItem("userToken", String(token));
    // console.log({ id, token });

    setuserToken(token);
    setUserID(id);
    // console.log({ userID, userToken });
  };

  const logout = async () => {
    await AsyncStorage.removeItem("userId");
    await AsyncStorage.removeItem("userToken");
    setUserID(null);
    setuserToken(null);
  };

  useEffect(() => {
    const alreadyConnected = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const userToken = await AsyncStorage.getItem("userToken");
        if (userId && userToken) {
          // console.log({ userId, userToken });
          setuserToken(userToken);
          setUserID(userId);
        }
      } catch (error) {
        console.log(error);
      }
    };
    alreadyConnected();
  }, []);

  useEffect(() => {
    if (userID && userToken) {
      //redirection vers la page home
      router.replace("/home");
    } else {
      router.replace("/");
    }
  }, [userID, userToken]);

  return (
    <AuthContext.Provider
      value={{
        userID: userID,
        userToken: userToken,
        login: login,
        logout: logout,
      }}
    >
      <Slot />
    </AuthContext.Provider>
  );
};

export default LayoutApp;
