import React, { useEffect } from "react";
import { View, Text, Button, Image } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

import Onboarding from "react-native-onboarding-swiper";

type Props = NativeStackScreenProps<RootStackParamList, "Welcome">;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <Onboarding
      bottomBarColor="#FFF"
      onSkip={() => navigation.replace("Login")}
      onDone={() => navigation.navigate("Login")}
      pages={[
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./images/imgone.webp")}
              style={{ height: 250, width: 250 }}
              resizeMode="contain"
            />
          ),
          title: "Schedule Planning",
          subtitle: "Planning Stage of an Event ",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./images/imgtwo.jpg")}
              style={{ height: 250, width: 250 }}
              resizeMode="contain"
            />
          ),
          title: "Team Work",
          subtitle: "Team Work makes planning perfect",
        },
        {
          backgroundColor: "#fff",
          image: (
            <Image
              source={require("./images/screenthree.jpg")}
              style={{ height: 250, width: 250 }}
              resizeMode="contain"
            />
          ),
          title: "Final Stage",
          subtitle: "Cross Check Schedules .. All Done",
        },
      ]}
    />
  );
}
