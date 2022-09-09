import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { urlFor } from "../../sanity";

export default function CategoryCard({ imageUrl, title }) {
  return (
    <TouchableOpacity className="relative mr-1">
      <Image
        source={{
          uri: urlFor(imageUrl).url(),
        }}
        className="h-24 w-24 rounded-md"
      />
      <Text className="absolute bottom-1 left-1 text-white font-bold">
        {title}
      </Text>
    </TouchableOpacity>
  );
}
