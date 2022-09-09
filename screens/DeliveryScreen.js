import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectRestaurant } from "../redux/features/restaurantSlice";
import { SafeArea } from "../components/utils/SafeView";
import Entypo from "@expo/vector-icons/Entypo";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import MapView, { Marker } from "react-native-maps";

const DeliveryScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  useLayoutEffect(() =>
    navigation.setOptions({
      headerShown: false,
    })
  );
  return (
    <View className="bg-[#00CCBB] flex-1">
      <SafeArea className="z-50">
        <View className="flex-row justify-between items-center p-3">
          <TouchableOpacity onPress={() => navigation.navigate("Home")}>
            <Entypo name="help-with-circle" size={25} color="white" />
          </TouchableOpacity>
          <Text className="font-bold text-lg text-gray-50">Order Help</Text>
        </View>
        <View className="bg-white mx-5 rounded-md p-6 z-50 shadow-md">
          <View className="flex-row justify-between">
            <View className="pr-4 space-y-1">
              <Text className="text-lg text-gray-400">Estimated Arrival</Text>
              <Text className="text-4xl font-bold">45-55 Minutes</Text>
            </View>
            <Animatable.Image
              source={require("../assets/delivery.gif")}
              animation="zoomInUp"
              iterationCount={1}
              className="h-20 w-20"
            />
          </View>
          <Progress.Bar size={30} color="#00CCBB" indeterminate={true} />
          <Text className="mt-3 text-gray-500">
            Yout order at {restaurant.title} is being prepared
          </Text>
        </View>
      </SafeArea>

      <MapView
        initialRegion={{
          latitude: restaurant.lat,
          longitude: restaurant.long,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}
        className="flex-1 -mt-10 z-0"
        mapType="mutedStandard"
      >
        <Marker
          coordinate={{
            latitude: restaurant.lat,
            longitude: restaurant.long,
          }}
          title={restaurant.title}
          description={restaurant.short_description}
          identifier="origin"
          pinColor="#00CCBB"
        />
      </MapView>
      <View className="bg-white flex-row items-center px-3 space-x-5 h-24">
        <Animatable.Image
          source={require("../assets/delivery.gif")}
          animation="zoomInUp"
          iterationCount={1}
          className="h-20 w-20 rounded-full"
        />
        <View className="flex-1">
          <Text className="text-lg">Deepak Gour</Text>
          <Text className="text-gray-400">Your Rider</Text>
        </View>
        <TouchableOpacity className=" space-x-2 items-center">
          <Entypo name="phone" size={25} color="#00CCBB" />
          <Text className="text-[#00CCBB] font-bold">Call Me</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliveryScreen;
