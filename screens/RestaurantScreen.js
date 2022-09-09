import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeArea } from "../components/utils/SafeView";
import Entypo from "@expo/vector-icons/Entypo";
import { urlFor } from "../sanity";
import DishRow from "../components/dishRow/DishRow";
import BasketIcon from "../components/BasketIcon";
import { useDispatch } from "react-redux";
import { setRestraunt } from "../redux/features/restaurantSlice";

export default function RestaurantScreen() {
  const {
    params: {
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
    },
  } = useRoute();

  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      setRestraunt({
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
      })
    );
  }, [dispatch]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
      // headerTitle: title,
    });
  }, []);
  return (
    <>
      <BasketIcon />
      <ScrollView
        contentContainerStyle={{}}
        showsVerticalScrollIndicator={false}
      >
        <View className="relative">
          <Image
            source={{
              uri: urlFor(imageUrl).url(),
            }}
            className="w-full h-48 bg-gray-300 p-4"
          />
          <TouchableOpacity
            onPress={navigation.goBack}
            className="absolute top-9 left-3 bg-gray-400 rounded-full"
          >
            <Entypo name="arrow-with-circle-left" size={30} color="white" />
          </TouchableOpacity>
        </View>
        <View className="p-4 bg-white">
          <Text className="font-bold text-lg">{title}</Text>
          <View className="flex-row space-x-2 pt-2 pb-2">
            <View className="flex-row items-center">
              <Entypo name="star" size={20} color="#00CCBB" />
              <Text> {rating}</Text>
            </View>
            <View className="flex-row items-center">
              <Entypo name="location-pin" size={20} color="#00CCBB" />
              <Text> {address}</Text>
            </View>
          </View>
          <Text className="font-light text-gray-600">{short_description}</Text>
        </View>
        <View className="bg-white pb-2">
          <TouchableOpacity className="flex-row justify-between mx-4 p-1 bg-gray-100 rounded-md">
            <View className="flex-row items-center space-x-2">
              <Entypo name="help-with-circle" size={15} color="gray" />
              <Text className="text-gray-500 text-xs">
                Have a food allergy?
              </Text>
            </View>
            <Entypo name="chevron-with-circle-right" size={18} color="gray" />
          </TouchableOpacity>
        </View>

        {/*Menu body*/}
        <View className="pb-36">
          <Text className="text-white bg-[#00CCBB] p-4 font-bold text-xl border-b-2 border-b-slate-200">
            Menu
          </Text>

          {/* DishRows */}
          {dishes.map((dish) => {
            const { _id, name, short_description, price, image } = dish;
            return (
              <DishRow
                key={_id}
                id={_id}
                name={name}
                description={short_description}
                price={price}
                image={image}
              />
            );
          })}
        </View>
      </ScrollView>
    </>
  );
}
