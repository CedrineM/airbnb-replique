import { Stack } from "expo-router";

import { Header } from "../../../components";
import { View } from "react-native";

export default LayoutHome = () => {
  return (
    <Stack
      screenOptions={{
        headerTitle: () => (
          <View>
            <Header />
          </View>
        ),
        headerTintColor: "#f9575d",
      }}
    >
      <Stack.Screen
        name="room"
        options={{
          headerTitle: () => (
            <View style={{ marginLeft: "-55" }}>
              <Header />
            </View>
          ),
        }}
      />
    </Stack>
  );
};
