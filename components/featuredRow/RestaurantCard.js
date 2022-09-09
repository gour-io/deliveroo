import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { urlFor } from "../../sanity";
import { useNavigation } from "@react-navigation/native";

export default function RestaurantCard({
  id,
  imageUrl,
  title,
  rating,
  genre,
  short_description,
  dishes,
  long,
  lat,
  address,
}) {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imageUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          long,
          lat,
        });
      }}
      className="shadow-sm bg-slate-200 rounded-md m-2"
    >
      <Image
        source={{
          uri: urlFor(imageUrl).url(),
        }}
        className="h-36 w-64 rounded-t-md"
      />
      <View className="p-2">
        <Text className="font-bold text-lg">{title}</Text>
        <Text className="font-light text-xs ">{short_description}</Text>
        <View className="flex pt-2">
          <View className="flex-row items-center space-x-2">
            <Entypo name="star" size={20} color="#00CCBB" />
            <Text>
              {rating} - {genre}
            </Text>
          </View>
          <View className="flex-row items-center space-x-2">
            <Entypo name="location-pin" size={20} color="#00CCBB" />
            <Text>{address}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
