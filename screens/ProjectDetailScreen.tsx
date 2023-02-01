import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  FlatList,
  LogBox,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";

import { Menu, MenuItem } from "react-native-material-menu";
import { baseUrl } from "../config/BaseUrl";
import RegularText from "../components/texts/RegularText";
import SmallText from "../components/texts/SmallText";
import Colors from "../config/Colors";
import ImageCard from "../components/cards/ImageCard";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ProgressBar from "react-native-animated-progress";

type Props = NativeStackScreenProps<RootStackParamList, "ProjectDetails">;

export default function ProjectDetailScreen({ navigation }: Props) {
  LogBox.ignoreAllLogs();
  const [visible, setVisible] = useState(false);

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  const DATA = [
    {
      id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
      title: "First Item Lenght testing ",
    },
    {
      id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
      title: "Second Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29d72",
      title: "Third Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29023",
      title: "Fourth Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e29145",
      title: "Fifth Item",
    },
    {
      id: "58694a0f-3da1-471f-bd96-145571e28932",
      title: "Sixth Item",
    },
  ];

  const LeftSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: Colors.primary,
          justifyContent: "center",
          maxHeight: "80%",
          width: "50%",
          marginTop: "5%",
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", flex: 1, justifyContent: "center" }}
          onPress={() => console.log("Task Started")}
        >
          <SmallText
            style={{
              color: "white",
              fontWeight: "600",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Start
          </SmallText>
        </TouchableOpacity>
      </View>
    );
  };
  const RightSwipeActions = () => {
    return (
      <View
        style={{
          backgroundColor: "green",
          justifyContent: "center",
          maxHeight: "80%",
          width: "50%",
          marginTop: "5%",
          alignItems: "flex-end",
          borderTopRightRadius: 10,
          borderBottomRightRadius: 10,
        }}
      >
        <TouchableOpacity
          style={{ width: "100%", flex: 1, justifyContent: "center" }}
          onPress={() => console.log("Task Completed")}
        >
          <SmallText
            style={{
              color: "white",
              fontWeight: "600",
              justifyContent: "center",
              alignSelf: "center",
            }}
          >
            Completed
          </SmallText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <TouchableOpacity
            style={{
              marginTop: "5%",
              marginStart: "5%",
            }}
            onPress={() => navigation.navigate("Home")}
          >
            <Ionicons
              name="md-arrow-back-circle-outline"
              size={30}
              color="black"
            />
          </TouchableOpacity>
          <RegularText
            style={{
              fontWeight: "600",
              fontSize: 18,
              marginTop: "5%",
            }}
          >
            Project Details
          </RegularText>
          <TouchableOpacity
            style={{
              borderWidth: 0.4,
              padding: "1%",
              borderRadius: 10,
              borderColor: "lightgray",
              marginEnd: "3%",
              marginTop: "5%",
            }}
            onPress={() => showMenu()}
          >
            <MaterialCommunityIcons name="dots-horizontal" size={20} />
            <Menu style={{}} visible={visible} onRequestClose={hideMenu}>
              <MenuItem
                onPress={() => {
                  hideMenu;
                }}
              >
                Complete Project
              </MenuItem>
            </Menu>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.body}>
        <Image
          source={require("../assets/project.png")}
          resizeMode="center"
          style={{
            height: "30%",
            width: "100%",
            backgroundColor: "#dcf1f8",
          }}
        />
        <RegularText style={{ fontWeight: "700", margin: "3%", fontSize: 18 }}>
          Project Name
        </RegularText>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="calendar"
            size={18}
            style={{ color: Colors.primary, paddingStart: "3%" }}
          />
          <SmallText style={{ color: "gray", paddingStart: "3%" }}>
            Tue, 30 Jan 2023
          </SmallText>
        </View>
        {/* Project Type: Individual/own */}
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <MaterialCommunityIcons
            name="account"
            size={25}
            color="#2F5DD5"
            style={{ marginTop: "3%", paddingStart: "2%" }}
          />
          {/* <MaterialIcons
            name="supervisor-account"
            size={25}
            color="#2F5DD5"
            style={{ marginTop: "3%", paddingStart: "2%" }}
          /> */}
          <TouchableOpacity style={{ marginTop: "3%", paddingEnd: "2%" }}>
            <MaterialCommunityIcons
              name="cloud-download-outline"
              size={30}
              color="#2F5DD5"
            />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <RegularText
            style={{ fontWeight: "700", paddingStart: "2%", marginTop: "3%" }}
          >
            Description
          </RegularText>
          <ScrollView>
            <SmallText
              style={{
                fontWeight: "500",
                paddingStart: "2%",
                color: "lightgray",
                textAlign: "justify",
                paddingEnd: "1%",
              }}
            >
              qwertypoiuy asdfgh lkjhg zxcvv mnbv qwerty poiuy asdfgh lkjhg
              zxcvv mnbv qwerty poiuy asdfgh lkjhg zxcvv mnbv qwerty poiuy
              asdfgh lkjhg zxcvv mnbvqwertypoiuy asdfgh lkjhg zxcvv
            </SmallText>
          </ScrollView>
          <View
            style={{
              paddingStart: "3%",
              justifyContent: "center",
              marginTop: "5%",
              paddingEnd: "2%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: "2%",
              }}
            >
              <RegularText
                style={{
                  fontWeight: "700",
                }}
              >
                Progress
              </RegularText>
              <RegularText
                style={{
                  marginStart: "20%",
                  color: Colors.primary,
                  fontWeight: "500",
                }}
              >
                50 %
              </RegularText>
            </View>
            <ProgressBar
              progress={50}
              height={9}
              backgroundColor={Colors.primary}
              animated={true}
            />
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: "7%",
              marginBottom: "2%",
              paddingStart: "2%",
              paddingEnd: "2%",
            }}
          >
            <RegularText style={{ fontWeight: "700" }}>Tasks</RegularText>
            <TouchableOpacity
              style={{
                marginStart: "20%",
              }}
              onPress={() => console.log("To Add new Task")}
            >
              <SmallText
                style={{
                  color: Colors.primary,
                  fontWeight: "300",
                }}
              >
                + Add Task
              </SmallText>
            </TouchableOpacity>
          </View>
          <FlatList
            style={{
              flex: 1,
              width: "100%",
            }}
            data={DATA}
            renderItem={({ item }) => (
              <View>
                {/* <RegularText style={{ color: "black" }}>{title}</RegularText> */}
                <GestureHandlerRootView>
                  <Swipeable
                    renderLeftActions={LeftSwipeActions}
                    renderRightActions={RightSwipeActions}
                  >
                    <ImageCard
                      onPress={() => navigation.navigate("Task")}
                      style={{ width: "100%" }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <RegularText
                          style={{
                            fontWeight: "700",
                            fontSize: 16,
                            padding: "0.5%",
                            marginStart: "3%",
                            marginTop: "2%",
                          }}
                        >
                          {item.title}
                        </RegularText>
                        <SmallText
                          style={{
                            fontWeight: "500",
                            padding: "0.5%",
                            marginEnd: "5%",
                            marginTop: "3%",
                            color: "#FF0000",
                          }}
                        >
                          High
                        </SmallText>
                      </View>

                      <SmallText
                        style={{
                          fontWeight: "700",
                          marginStart: "3%",
                          color: "lightgray",
                        }}
                      >
                        {item.title}
                      </SmallText>
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginBottom: "3%",
                        }}
                      >
                        <SmallText
                          style={{
                            fontWeight: "700",
                            padding: "0.5%",
                            marginStart: "3%",
                            marginTop: "2%",
                            color: "lightgray",
                          }}
                        >
                          time
                        </SmallText>
                        <SmallText
                          style={{
                            fontWeight: "700",
                            padding: "0.5%",
                            marginEnd: "5%",
                            marginTop: "2%",
                            color: "green",
                          }}
                        >
                          Completed
                        </SmallText>
                      </View>
                    </ImageCard>
                  </Swipeable>
                </GestureHandlerRootView>
              </View>
            )}
            keyExtractor={(item) => item.id}
          />
        </ScrollView>
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
    marginTop: Constants.statusBarHeight,
  },
  body: {
    flex: 9,
    padding: "5%",
    maxHeight: "100%",
  },
});
