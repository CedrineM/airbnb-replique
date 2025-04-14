import {
  View,
  SafeAreaView,
  StyleSheet,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Offer } from "../../../components/index";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "expo-router";

export default HomePage = () => {
  const [data, setData] = useState(null);
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms"
        );
        setData(response.data);

        setisLoading(false);
      } catch (error) {
        console(error);
      }
    };
    fetchData();
  }, []);

  return isLoading ? (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size={"large"} color={"#f9575d"} />
    </View>
  ) : (
    <SafeAreaView style={{ backgroundColor: "#fff" }}>
      <FlatList
        style={{ marginBottom: 50, marginTop: 20 }}
        contentContainerStyle={styles.container}
        data={data}
        keyExtractor={(item) => String(item._id)}
        renderItem={({ item }) => (
          <Link href={`/room?id=${item._id}`}>
            <Offer
              url={item.photos[0].url}
              price={item.price}
              title={item.title}
              rating={item.ratingValue}
              reviews={item.reviews}
              avatarUrl={item.user.account.photo.url}
            />
          </Link>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    marginHorizontal: 15,
  },
});
