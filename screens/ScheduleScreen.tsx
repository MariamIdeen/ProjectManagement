import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";

type Props = NativeStackScreenProps<RootStackParamList, "Schedule">;

export default function PlannerScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <Text>Header Section</Text>
      </View>
      <View style={styles.body}>
        <Text>Landing Screen</Text>
      </View>
      <View style={styles.footer}>
        <Text>Footer Section</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navigation: {
    flex: 2,
    marginTop: Constants.statusBarHeight,
  },
  body: {
    flex: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  footer: {
    flex: 1,
  },
});
