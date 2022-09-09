import React from "react";
import { StyleSheet, StatusBar, SafeAreaView } from "react-native";

export const SafeArea = (props) => (
  <SafeAreaView style={styles.safe}>{props.children}</SafeAreaView>
);

const styles = StyleSheet.create({
  safe: {
    ...Platform.select({
      android: {
        marginTop: 24,
      },
    }),
  },
});
