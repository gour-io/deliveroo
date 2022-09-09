import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const BasketIcon = () => {
  const items = useSelector(selectBasketItems);
  const basketTotal = useSelector(selectBasketTotal);
  const navigation = useNavigation();

  if (items.length === 0) return null;

  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => navigation.navigate("Basket")}
        className="flex-row items-center justify-around mx-10 p-3 bg-[#00ccbbdd] rounded-3xl"
      >
        <Text className="font-bold text-lg text-white bg-[#00887d] px-2 rounded-full">
          {items.length}
        </Text>
        <Text className="font-bold text-lg text-white">View Basket</Text>
        <Text className="font-bold text-lg text-white">
          <MaterialCommunityIcons name="currency-inr" size={18} color="white" />
          {""}
          {basketTotal}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
