import { View, Text, SafeAreaView } from "react-native";
import { useContext } from "react";
import MainButton from "../../components/MainButton";

// import context
import AuthContext from "../../contexts/AuthContext.js";

export default ProfilePage = () => {
  const { logout } = useContext(AuthContext);
  return (
    <SafeAreaView>
      <View>
        <Text>ProfilePage</Text>
        <MainButton content={"Déconnexion"} func={logout} />
      </View>
    </SafeAreaView>
  );
};
