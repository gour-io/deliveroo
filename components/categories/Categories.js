import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import sanityClient from "../../sanity";

import CategoryCard from "./CategoryCard";

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    sanityClient
      .fetch(`*[_type == "category"]`)
      .then((data) => setCategories(data));
  }, []);

  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
      className="pb-3"
    >
      {/* CategoryCard */}
      {categories?.map((category) => (
        <CategoryCard
          key={category._id}
          imageUrl={category.image}
          title={category.name}
        />
      ))}
    </ScrollView>
  );
}
