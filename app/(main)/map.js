import axios from "axios";
import { useEffect, useState } from "react";
import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import { View, Text, ActivityIndicator } from "react-native";

export default MapPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [coords, setCoords] = useState({});
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const askPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        let location = await Location.getCurrentPositionAsync({});
        console.log("location =>", location); // console.log permettant de visualiser l'objet obtenu
        const obj = {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        };

        setCoords(obj);
      }
    };
    askPermission();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/around?latitude=${coords.latitude}&longitude=${coords.longitude}`
        );
        // console.log("map data", response.data);
        let copy = [...markers];
        response.data.map((elem) => {
          copy.push(
            <Marker
              key={elem._id}
              coordinate={{
                latitude: elem.location[1],
                longitude: elem.location[0],
              }}
              title={elem.title}
              description={elem.description}
            />
          );
        });
        setMarkers(copy);
        setIsLoading(false);
      } catch (error) {
        // console.log(copy);
        console.log(error.response);
      }
    };
    fetchData();
  }, [coords]);

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={"#f9575d"} />
    </View>
  ) : (
    <MapView
      // La MapView doit obligatoirement avoir des dimensions
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 48.856614,
        longitude: 2.3522219,
        latitudeDelta: 0.2,
        longitudeDelta: 0.2,
      }}
      showsUserLocation={true}
    >
      {markers.map((elem) => {
        return elem;
      })}
    </MapView>
  );
};
