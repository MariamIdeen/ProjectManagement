import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  LogBox,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { StatusBar } from "expo-status-bar";
import Constants from "expo-constants";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  MaterialIcons,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import axios from "axios";
import { baseUrl } from "../config/BaseUrl";

import SmallText from "../components/texts/SmallText";
import RegularText from "../components/texts/RegularText";
import ImageCard from "../components/cards/ImageCard";
import Colors from "../config/Colors";
import ProgressBar from "react-native-animated-progress";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useUserStore } from "../config/Store";

const Ht = Dimensions.get("window").height + 56;
const wdt = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  LogBox.ignoreAllLogs();
  //Value from Zustand
  const [setTask] = useUserStore((state: any) => [state.setTask]);
  const [setProject] = useUserStore((state: any) => [state.setProject]);

  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [name, setName] = useState();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      return () => {
        getLoginDetails();
      };
    }, [])
  );

  const hideMenu = () => setVisible(false);

  const showMenu = () => setVisible(true);

  useEffect(() => {
    let isMounted = true; // note mutable flag
    getLoginDetails();

    return () => {
      isMounted = false;
    }; // cleanup toggles value, if unmounted
  }, []);

  const getLoginDetails = async () => {
    try {
      const details: any = await AsyncStorage.getItem("LoginDetails");
      const lid = JSON.parse(details);

      if (lid !== "") {
        setId(lid.login_id);
        setData(JSON.parse(details));
        setName(lid.name);
        getProjects(lid.login_id);
        getTasks(lid.login_id);
      }

      return details != null ? JSON.parse(details) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  const getProjects = async (login_id: string) => {
    const data = {
      login_id: login_id,
    };
    axios
      .post(baseUrl + "project/getProjects", data)
      .then(function (response) {
        if (response.data.response === "Success") {
          const res = response.data.result;
          setProjects(res);
          setProject(res);
        } else {
          alert(response.data.errorMsg);
        }
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };
  console.log("Projects", projects);

  const getTasks = async (login_id: string) => {
    const data = {
      login_id: login_id,
    };
    axios
      .post(baseUrl + "task/getTasks", data)
      .then(function (response) {
        if (response.data.response === "Success") {
          const res = response.data.result;
          setTasks(res);
        } else {
          alert(response.data.errorMsg);
        }
      })
      .catch(function (error) {
        // handle error
        alert(error.message);
      });
  };

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
            paddingTop: "2%",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.image}
            source={require("../assets/profile.png")}
          />
          <View style={{ flex: 1, justifyContent: "center", margin: "3%" }}>
            <SmallText style={{ color: "gray" }}>Welcome Back</SmallText>
            <RegularText
              style={{ color: "black", fontWeight: "700", fontSize: 18 }}
            >
              {name}
            </RegularText>
          </View>
          <TouchableOpacity
            style={{
              borderWidth: 0.4,
              padding: "1%",
              borderRadius: 10,
              borderColor: "lightgray",
              marginEnd: "2%",
            }}
          >
            <MaterialIcons name="notifications" size={20} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            backgroundColor: "#FAFAFF",
            paddingStart: "5%",
            borderRadius: 10,
            height: 45,
            margin: "2%",
            elevation: 1,
            flexDirection: "row",
          }}
        >
          <TextInput
            style={{
              backgroundColor: "#FAFAFF",
              flex: 1,
              color: "black",
            }}
            placeholder="Search for your task and projects"
            placeholderTextColor="lightgray"
            onChangeText={(value: string) => {
              setSearch(value);
            }}
            value={search}
          />
          <Ionicons
            name="search"
            color="#000"
            size={20}
            style={{
              margin: "2%",
              marginTop: "4%",
            }}
          />
        </View>
      </View>
      <ScrollView
        automaticallyAdjustContentInsets={false}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        style={{ flex: 1, marginBottom: "2%" }}
      >
        <View
          style={{
            alignItems: "flex-start",
            flex: 1,
            width: "100%",
            paddingStart: "5%",
            paddingEnd: "5%",
            marginBottom: "5%",
          }}
        >
          <RegularText style={{ fontWeight: "800", fontSize: 18 }}>
            My Projects
          </RegularText>

          <FlatList
            horizontal={true}
            showsHorizontalScrollIndicator={true}
            data={projects}
            renderItem={({ item }: any) => (
              <View>
                {/* <RegularText style={{ color: "black" }}>{title}</RegularText> */}

                <ImageCard
                  onPress={() => navigation.navigate("ProjectDetails")}
                >
                  <Image
                    style={{
                      justifyContent: "center",
                      width: "100%",
                      height: "40%",
                      marginTop: "5%",
                    }}
                    resizeMode="contain"
                    source={require("../assets/project.png")}
                  />
                  <RegularText
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                      alignSelf: "center",
                      padding: "0.5%",
                    }}
                  >
                    {item.project_title}
                  </RegularText>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "center",
                      alignItems: "center",
                      margin: "2%",
                      alignSelf: "center",
                    }}
                  >
                    <MaterialCommunityIcons
                      name="account"
                      size={25}
                      color="#2F5DD5"
                      style={{ marginTop: "3%" }}
                    />
                    <View
                      style={{
                        paddingStart: "5%",
                        justifyContent: "center",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <SmallText
                          style={{ color: "lightgray", marginEnd: "5%" }}
                        >
                          Progress
                        </SmallText>
                        <SmallText
                          style={{
                            marginStart: "20%",
                            color: Colors.primary,
                          }}
                        >
                          {item.project_progress}
                        </SmallText>
                      </View>
                      <ProgressBar
                        progress={item.project_progress}
                        height={7}
                        backgroundColor={Colors.primary}
                        animated={true}
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "2%",
                    }}
                  >
                    <SmallText
                      style={{
                        marginStart: "5%",
                        paddingStart: "3%",
                        color: "lightgray",
                        fontWeight: "500",
                      }}
                    >
                      Deadline
                    </SmallText>
                    <SmallText
                      style={{
                        marginEnd: "5%",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      {item.project_deadline}
                    </SmallText>
                  </View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: "2%",
                    }}
                  >
                    <SmallText
                      style={{
                        marginStart: "5%",
                        paddingStart: "3%",
                        color: "lightgray",
                        fontWeight: "500",
                      }}
                    >
                      Tasks Left
                    </SmallText>
                    <SmallText
                      style={{
                        marginEnd: "5%",
                        color: "black",
                        fontWeight: "500",
                      }}
                    >
                      Deadline
                    </SmallText>
                  </View>
                </ImageCard>
              </View>
            )}
            keyExtractor={(item) => item.project_id}
          />

          <RegularText style={{ fontWeight: "800", fontSize: 18 }}>
            Today's Task
          </RegularText>

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
        </View>
      </ScrollView>

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
    padding: "3%",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 1000,
    marginStart: "2%",
  },
  body: {
    flex: 9,
    padding: "5%",
  },
});
