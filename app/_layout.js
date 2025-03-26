import { Stack, router } from "expo-router";
import { useEffect, useState } from "react";

// import des context necessaire
import AuthContext from "../contexts/AuthContext";

export default LayoutApp = () => {
  const [userID, setUserID] = useState(null);
  const [userToken, setuserToken] = useState(null);

  const login = (id, token) => {
    setUserID(id);
    setuserToken(token);
  };

  const logout = () => {
    setUserID(null);
    setuserToken(null);
  };

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
      <Stack>
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(main)" options={{ headerShown: false }} />
        <Stack.Screen name="(home)" options={{ headerShown: false }} />
      </Stack>
    </AuthContext.Provider>
  );
};
