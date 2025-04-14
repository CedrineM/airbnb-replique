import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { Room } from "../../../components/index";
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";

export default RoomPage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [visible, setVisible] = useState(false);

  const { id } = useLocalSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.response);
      }
    };
    fetchData();
  }, []);
  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={"#f9575d"} />
    </View>
  ) : (
    <SafeAreaView style={{ backgroundColor: "#fff", flex: 1 }}>
      <View>
        <Room
          url={data.photos[0].url}
          price={data.price}
          title={data.title}
          rating={data.ratingValue}
          reviews={data.reviews}
          avatarUrl={data.user.account.photo.url}
        />
        <Text
          numberOfLines={visible ? 0 : 3}
          ellipsizeMode="tail"
          style={styles.description}
        >
          {data.description}
        </Text>
        <Pressable
          onPress={() => {
            setVisible(!visible);
          }}
        >
          <Text style={styles.showButton}>
            {visible ? "Show less" : "Show more "}
          </Text>
        </Pressable>

        <MapView
          // La MapView doit obligatoirement avoir des dimensions
          style={{ width: "100%", height: 600, marginTop: 10 }}
          initialRegion={{
            latitude: 48.856614,
            longitude: 2.3522219,
            latitudeDelta: 0.2,
            longitudeDelta: 0.2,
          }}
        >
          <Marker
            coordinate={{
              latitude: data.location[1],
              longitude: data.location[0],
            }}
            title={data.title}
          />
        </MapView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  description: {
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  showButton: {
    paddingHorizontal: 10,
    color: "#717171",
  },
});
