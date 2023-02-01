import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

type Props = NativeStackScreenProps<RootStackParamList, "Landing">;

export default function LandingScreen({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../screens/images/bg.webp")}
        style={{ opacity: 0.9 }}
      />
      <View style={styles.body}>
        <Text
          style={{
            margin: "2%",
            fontSize: 20,
            fontWeight: "600",
            color: "white",
          }}
        >
          Welcome Back
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
            }}
          >
            Sign in with Email
          </Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 14,
            fontWeight: "300",
            color: "orange",
            marginTop: "5%",
          }}
        >
          OR
        </Text>
        <View style={{ flexDirection: "row" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "300",
              color: "orange",
              marginTop: "3%",
            }}
          >
            You don't have an Account?
          </Text>
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{
              fontSize: 14,
              fontWeight: "300",
              color: "white",
              marginTop: "3%",
            }}
          >
            {"  "}
            Sign Up here
          </Text>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "transparent",
    position: "absolute",
    height: "80%",
    width: "80%",
    marginStart: "10%",
    marginEnd: "10%",
    marginTop: "10%",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 10,
    width: "80%",
    alignItems: "center",
  },
});
