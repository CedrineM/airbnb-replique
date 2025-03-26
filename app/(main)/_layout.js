import { Tabs } from "expo-router";

export default LayoutMain = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="(home)"
        options={{ headerShown: false, href: "/home", tabBarLabel: "Home" }}
      />
      <Tabs.Screen name="map" options={{ headerShown: false }} />
      <Tabs.Screen name="profiles" options={{ headerShown: false }} />
    </Tabs>
  );
};
