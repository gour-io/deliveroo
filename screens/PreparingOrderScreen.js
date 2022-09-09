import { View, Text } from "react-native";
import React, { useEffect } from "react";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";

const PreparingOrderScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => navigation.navigate("Delivery"), 5000);
  }, []);
  return (
    <View className="bg-[#00ccbb] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/waitingfororder.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
      />

      <Animatable.Text
        animation="slideInDown"
        iterationCount={1}
        className="text-lg my-10 text-[#fff] font-extrabold text-center"
      >
        <Text>Waiting for Restaurant to accept your order!</Text>
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color="white" />
    </View>
  );
};

export default PreparingOrderScreen;
