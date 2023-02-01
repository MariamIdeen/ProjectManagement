import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  BackHandler,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { Formik } from "formik";
import axios from "axios";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Ionicons } from "@expo/vector-icons";

import { baseUrl } from "../config/BaseUrl";
import RegularText from "../components/texts/RegularText";
import SmallText from "../components/texts/SmallText";
import { useUserStore } from "../config/Store";

const Ht = Dimensions.get("window").height + 56;
const wdt = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

interface Values {
  email: string;
  password: string;
}

export default function LoginScreen({ navigation }: Props) {
  const [setUserData] = useUserStore((state: any) => [state.setUserData]);
  const [logData, setLogData] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  //setting values for future use
  const storeData = async (res: any) => {
    try {
      const jsonValue = JSON.stringify(res);
      await AsyncStorage.setItem("LoginDetails", jsonValue);
      console.log(jsonValue);
      setUserData(jsonValue);
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  return (
    <KeyboardAwareScrollView style={{ height: "100%", flex: 1 }}>
      <View style={styles.container}>
        <Formik
          initialValues={{
            email: logData.email,
            password: logData.password,
          }}
          onSubmit={(values: Values) => {
            setLogData({
              email: values.email,
              password: values.password,
            });
            const data = {
              login_username: values.email,
              login_password: values.password,
            };

            axios
              .post(baseUrl + "auth/login", data)
              .then(function (response) {
                // handle success
                // console.log(response.data.response);
                if (response.data.response === "Success") {
                  const res = response.data.result;
                  // setLogData({
                  //   email: "",
                  //   password: "",
                  // });
                  //calling async storage for storage
                  storeData(res);

                  navigation.navigate("Root");
                } else {
                  alert(response.data.errorMsg);
                  setLogData({
                    email: "",
                    password: "",
                  });
                }
              })
              .catch(function (error) {
                // handle error
                alert(error.message);
              });
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string().required("* Email is required"),
            password: Yup.string().required("* Password is required"),
          })}
        >
          {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
            <View style={styles.body}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity
                  style={{
                    marginTop: "15%",
                    marginStart: "2%",
                  }}
                  onPress={() => BackHandler.exitApp()}
                >
                  <Ionicons
                    name="md-arrow-back-circle-outline"
                    size={35}
                    color="black"
                    style={{
                      marginTop: "15%",
                      marginStart: "2%",
                    }}
                  />
                </TouchableOpacity>
                <View
                  style={{
                    marginTop: "15%",
                    marginStart: "2%",
                  }}
                >
                  <RegularText
                    style={{
                      fontSize: 25,
                      fontWeight: "600",
                    }}
                  >
                    HELLO
                  </RegularText>
                  <SmallText
                    style={{
                      color: "gray",
                    }}
                  >
                    Please Login to your Account
                  </SmallText>
                </View>
              </View>

              <View style={styles.card}>
                <SmallText
                  style={{
                    marginTop: "5%",
                    fontSize: 15,
                    fontWeight: "500",
                    color: "black",
                    paddingStart: "4%",
                  }}
                >
                  Email Address
                </SmallText>
                <TextInput
                  placeholder="xyz@mail.com"
                  placeholderTextColor="lightgray"
                  keyboardType="email-address"
                  onBlur={handleBlur("email")}
                  onChangeText={handleChange("email")}
                  value={values.email}
                  style={{
                    backgroundColor: "#FAFAFF",
                    paddingStart: "5%",
                    borderRadius: 10,
                    height: 45,
                    margin: "2%",
                    color: "black",
                    elevation: 1,
                  }}
                />

                {errors.email && (
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 15,
                      color: "red",
                    }}
                  >
                    {errors.email}
                  </Text>
                )}

                <SmallText
                  style={{
                    marginTop: "5%",
                    fontSize: 15,
                    fontWeight: "500",
                    color: "black",
                    paddingStart: "4%",
                  }}
                >
                  Password
                </SmallText>
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
                    placeholder="Password"
                    placeholderTextColor="lightgray"
                    secureTextEntry={!passwordVisible}
                    onBlur={handleBlur("password")}
                    onChangeText={handleChange("password")}
                    value={values.password}
                  />
                  <Ionicons
                    name={passwordVisible ? "eye" : "eye-off"}
                    color="#000"
                    size={20}
                    style={{
                      margin: "2%",
                      marginTop: "4%",
                    }}
                    onPress={() => setPasswordVisible(!passwordVisible)}
                  />
                </View>
                {errors.password && (
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 15,
                      color: "red",
                    }}
                  >
                    {errors.password}
                  </Text>
                )}
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: "400",
                    color: "blue",
                    paddingStart: "4%",
                    alignSelf: "flex-start",
                  }}
                  onPress={() => console.log("New Page")}
                >
                  I Forgot my password
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => handleSubmit()}
                style={styles.button}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  SIGN IN
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "300",
              color: "black",
            }}
          >
            You don't have an Account?
          </Text>
          <Text
            onPress={() => navigation.navigate("Signup")}
            style={{
              fontSize: 14,
              fontWeight: "500",
              color: "#7879FF",
            }}
          >
            {"  "}
            Sign Up
          </Text>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
  body: {
    justifyContent: "center",
    flex: 1,
    height: "100%",
    width: "90%",
    marginStart: "5%",
    marginEnd: "5%",
    marginTop: "10%",
  },
  card: {
    width: "100%",
    margin: "2%",
    borderRadius: 20,
    marginTop: "10%",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    paddingStart: "2%",
  },
  button: {
    backgroundColor: "#7879FF",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    alignItems: "center",
    marginTop: "15%",
    elevation: 2,
    marginBottom: "10%",
    alignSelf: "center",
  },
});
