import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeArea } from "../components/utils/SafeView";

import Iconicons from "@expo/vector-icons/Ionicons";
import Entypo from "@expo/vector-icons/Entypo";
import Categories from "../components/categories/Categories";
import FeaturedRow from "../components/featuredRow/FeaturedRow";
import SanityClient from "../sanity";

export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      // headerTitle: "Testing",
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    SanityClient.fetch(
      `
      *[_type=="featured"] {
            ...,
            restaurants[]-> {
              ...,
              dishes[]->,
            }}
    `
    ).then((data) => {
      setFeaturedCategories(data);
    });
  }, []);

  return (
    <SafeArea className="bg-white">
      {/*Header*/}
      <View className="flex-row p-2 items-center space-x-4">
        <Image
          source={{
            uri:
              "https://images.unsplash.com/photo-1619892480889-680893b7aa7b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzZ8fGZydWl0fGVufDB8MnwwfHw%3D&auto=format&fit=crop&w=500&q=60",
          }}
          className="h-9 w-9 rounded-full bg-gray-300"
        />
        <View className="flex flex-grow">
          <Text className="font-bold text-gray-400 text-xs">Deliver Now!</Text>
          <Text className="font-bold text-xl justify-center">
            Current Location{" "}
            <Entypo name="chevron-down" size={25} color="#00CCBB" />
          </Text>
        </View>
        <Iconicons name="md-person-circle-sharp" size={40} color="#00CCBB" />
      </View>

      {/* Search*/}

      <View className="flex-row p-2 items-center space-x-4">
        <View className="flex-grow bg-gray-200 p-3">
          <TouchableOpacity className="flex-row space-x-2">
            <Iconicons name="search-outline" size={25} color="#00CCBB" />
            <TextInput
              placeholder="Restaurants and cuisines"
              keyboardType="default"
              className="flex-grow text-gray-500 font-semibold text-base"
            />
          </TouchableOpacity>
        </View>
        <View className="pr-2">
          <Entypo name="sound-mix" size={25} color="#00CCBB" />
        </View>
      </View>

      {/*Body*/}
      <ScrollView
        contentContainerStyle={{
          marginBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
        className="mb-32"
      >
        {/*Categories*/}
        <Categories />

        {/* Featured */}
        {featuredCategories?.map((category) => (
          <FeaturedRow
            key={category._id}
            id={category._id}
            title={category.name}
            description={category.short_description}
          />
        ))}
        <View className=" h-20 w-full items-center justify-center">
          <Text className="font-bold text-gray-400 text-lg">
            We are glad, you are here!
          </Text>
          <Text className="font-bold text-gray-300 text-2xl">Deliveroo</Text>
        </View>
      </ScrollView>
    </SafeArea>
  );
}
