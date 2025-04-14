import { Tabs } from "expo-router";
import { Image, View } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Header } from "../../components";

export default LayoutMain = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#f9575d",
        headerTitle: () => <Header />,
        headerTitleAlign: "center",
      }}
    >
      <Tabs.Screen
        name="(home)"
        options={{
          headerShown: false,
          href: "/home",
          tabBarLabel: "Home",
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return <FontAwesome name="home" size={28} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="map"
        options={{
          tabBarLabel: "Around me",
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return <FontAwesome name="map-marker" size={28} color={color} />;
          },
        }}
      />
      <Tabs.Screen
        name="profiles"
        options={{
          tabBarLabel: "My profile",
          tabBarIcon: ({ color }) => {
            // You can return any component that you like here!
            return <FontAwesome name="user-o" size={28} color={color} />;
          },
        }}
      />
    </Tabs>
  );
};
