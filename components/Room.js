import { Image, StyleSheet, Text, View } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const Room = ({
  url,
  price,
  title,
  rating,
  reviews,
  description,
  avatarUrl,
}) => {
  const ratingStars = (rating) => {
    let tabRating = [];
    for (let i = 0; i < rating; i++) {
      tabRating.push(<AntDesign name="star" size={24} color="#FFB102" />);
    }
    if (rating < 5) {
      const calc = 5 - rating;
      for (let i = 0; i < calc; i++) {
        tabRating.push(<AntDesign name="star" size={24} color="#BBBBBB" />);
      }
    }
    return tabRating;
  };

  return (
    <View style={styles.offerDiv}>
      <View style={styles.picturDiv}>
        <Image source={{ uri: url }} style={styles.img} />
        <View style={styles.priceDiv}>
          <Text style={styles.textPrice}>{price} €</Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginVertical: 10,
          marginHorizontal: 10,
        }}
      >
        <View style={styles.ratinTitleDiv}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {title}
          </Text>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            {ratingStars(rating).map((el, index) => {
              return <View key={index}>{el}</View>;
            })}
            <Text style={{ color: "#7D7D7D" }}>{reviews} reviews</Text>
          </View>
        </View>

        <View style={styles.avatar}>
          <Image source={{ uri: avatarUrl }} style={styles.img} />
        </View>
      </View>
      <View>
        <Text>{description}</Text>
      </View>
    </View>
  );
};

export default Room;

const styles = StyleSheet.create({
  offerDiv: {
    backgroundColor: "#fff",
    width: "100%",
    borderBottomColor: "#E7E7E7",
    borderBottomWidth: 1,
    marginBottom: 15,
  },
  picturDiv: {
    height: 200,
    position: "relative",
  },
  img: { width: "100%", height: "100%" },

  priceDiv: {
    width: 100,
    height: 50,
    backgroundColor: "#000000",
    textAlign: "center",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 10,
  },

  textPrice: {
    color: "#fff",
    fontSize: 20,
  },

  title: {
    fontSize: 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: "50%",
    overflow: "hidden",
  },

  ratinTitleDiv: {
    width: 250,
    gap: 10,
  },
});
