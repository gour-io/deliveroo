import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState, useMemo } from "react";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../redux/features/basketSlice";
import { SafeArea } from "../components/utils/SafeView";
import { urlFor } from "../sanity";

const BasketScreen = () => {
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const basketTotal = useSelector(selectBasketTotal);
  const items = useSelector(selectBasketItems);
  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <View className="bg-gray-100 flex-1">
      <SafeArea>
        <View className="flex-row items-center rounded-t-lg py-5 pb-3 px-5 bg-white">
          <View className="flex-grow items-center">
            <Text className="text-2xl font-bold text-gray-700">Basket</Text>
            <Text className="text-xs font-bold text-[#00CCBB]">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Entypo name="circle-with-cross" size={30} color="#00CCBB" />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center px-3 py-2 mt-3 mb-2 bg-white">
          <View className="flex-row flex-grow items-center space-x-4 ">
            <Image
              source={{
                uri:
                  "https://thumbs.dreamstime.com/b/scooter-home-delivery-icon-simple-style-illustration-vector-web-design-isolated-white-background-220538419.jpg",
              }}
              className="h-9 w-9 rounded-full bg-gray-300"
            />
            <Text className="font-bold">Deliver in 50-60 min</Text>
          </View>
          <TouchableOpacity>
            <Text className="text-[#00CCBB] font-bold ">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          className="divide-y divide-gray-200"
          showsVerticalScrollIndicator={false}
        >
          {Object.entries(groupedItemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 p-4 px-5  bg-white"
            >
              <Text className="text-[#00CCBB] font-bold text-lg">
                {items.length} x
              </Text>
              <Image
                source={{ uri: urlFor(items[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />

              <Text className="flex-1 font-bold">{items[0]?.name}</Text>

              <View className="flex-row">
                <MaterialCommunityIcons
                  name="currency-inr"
                  size={18}
                  color="#333"
                />
                <Text className="font-bold">
                  {items[0]?.price * items.length}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => dispatch(removeFromBasket({ id: key }))}
              >
                <Text className="text-[#00CCBB] text-xs font-bold">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className=" bg-white ">
          <View className="flex-row justify-between items-center px-3 pt-2 pb-1">
            <Text className="font-bold text-gray-400">Subtotal</Text>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="currency-inr"
                size={15}
                color="#33333399"
              />
              <Text className="font-bold text-gray-400">{basketTotal}</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center px-3 py-1">
            <Text className="font-bold text-gray-400">Delivery Fee</Text>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="currency-inr"
                size={15}
                color="#33333399"
              />
              <Text className="font-bold text-gray-400">40</Text>
            </View>
          </View>
          <View className="flex-row justify-between items-center px-3 pt-1 pb-2">
            <Text className="font-bold">Order Total</Text>
            <View className="flex-row items-center">
              <MaterialCommunityIcons
                name="currency-inr"
                size={15}
                color="black"
              />
              <Text className="font-bold">{basketTotal + 40}</Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="items-center bg-[#00CCBB] m-4 p-4 rounded-lg"
          >
            <Text className="font-bold text-lg text-white">Place Order</Text>
          </TouchableOpacity>
        </View>
      </SafeArea>
    </View>
  );
};

export default BasketScreen;
