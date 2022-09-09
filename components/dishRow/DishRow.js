import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import React, { useState } from "react";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Entypo from "@expo/vector-icons/Entypo";
import { urlFor } from "../../sanity";

// redux
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../../redux/features/basketSlice";

export default function DishRow({ id, name, description, price, image }) {
  const [isPressed, setIsPressed] = useState(false);
  const items = useSelector((state) => selectBasketItemsWithId(state, id));
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, name, description, price, image }));
  };

  const removeItemFromBusket = () => {
    if (!items.length > 0) return;

    dispatch(removeFromBasket({ id }));
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => setIsPressed(!isPressed)}
        className={`bg-white p-4 border border-gray-200 ${
          isPressed && "border-b-0"
        }`}
      >
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="font-bold text-lg  text-gray-700">{name}</Text>
            <Text className="text-gray-400">{description}</Text>
          </View>
          <Image
            source={{
              uri: urlFor(image).url(),
            }}
            style={{
              borderWidth: 1,
              borderColor: "#fff",
            }}
            className="h-16 w-16 rounded-md"
          />
        </View>
        <View className="flex-row items-center">
          <MaterialCommunityIcons name="currency-inr" size={18} color="#333" />
          <Text className="text-gray-800 font-medium">{price}</Text>
        </View>
      </TouchableOpacity>

      {isPressed ? (
        <View>
          <View className="bg-gray-50 flex-row items-center p-3 space-x-2">
            <TouchableOpacity
              disabled={!items.length}
              onPress={removeItemFromBusket}
            >
              <Entypo
                name="circle-with-minus"
                size={25}
                color={items.length > 0 ? "#3FA796" : "gray"}
              />
            </TouchableOpacity>
            <Text className="font-bold text-lg">{items.length}</Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <Entypo name="circle-with-plus" size={25} color="#3FA796" />
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </>
  );
}
