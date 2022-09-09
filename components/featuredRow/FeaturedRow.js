import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import sanityClient from "../../sanity";

import RestaurantCard from "./RestaurantCard";

export default function FeaturedRow({ id, title, description }) {
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(
        `
      *[_type=="featured" && _id == $id] {
        ...,
        restaurants[]->{
          ...,
          dishes[]->,
          type-> {
            name
          }
        },
      }[0]
    `,
        { id }
      )
      .then((data) => {
        setRestaurants(data?.restaurants);
      });
  }, []);

  return (
    <View className="p-3">
      <View className="flex-row justify-between items-center">
        <Text className="font-bold text-xl">{title}</Text>
        <Entypo name="chevron-with-circle-right" size={30} color="#00CCBB" />
      </View>
      <Text className="font-bold text-gray-400 text-xs">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 1,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCard */}

        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imageUrl={restaurant.image}
            address={restaurant.address}
            title={restaurant.name}
            rating={restaurant.rating}
            genre={restaurant.type?.name}
            short_description={restaurant.short_description}
            dishes={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
}
