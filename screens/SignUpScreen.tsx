import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
  Dimensions,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { Formik, FormikProps } from "formik";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import * as Yup from "yup";
import { baseUrl } from "../config/BaseUrl";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Checkbox from "expo-checkbox";

import RegularText from "../components/texts/RegularText";
import SmallText from "../components/texts/SmallText";
import { Ionicons } from "@expo/vector-icons";

const Ht = Dimensions.get("window").height + 56;
const wdt = Dimensions.get("window").width;

type Props = NativeStackScreenProps<RootStackParamList, "Signup">;

interface Values {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export default function SignUpScreen({ navigation }: Props) {
  const [regData, setRegData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAwareScrollView>
      <View style={styles.container}>
        {/* <Image
          source={require("../screens/images/bg.webp")}
          style={{ opacity: 0.9, height: Ht, width: wdt }}
        /> */}
        <Formik
          initialValues={{
            name: "",
            email: "",
            phone: "",
            password: "",
          }}
          onSubmit={(values: Values) => {
            setRegData({
              name: values.name,
              phone: values.phone,
              email: values.email,
              password: values.password,
            });

            const data = {
              user_name: values.name,
              user_phone: values.phone,
              user_email: values.email,
              login_username: values.email,
              login_password: values.password,
            };

            console.log("DATA", data);

            axios
              .post(baseUrl + "auth/register", data)
              .then(function (response) {
                // handle success
                console.log(response.data.response);
                if (response.data.response === "Success") {
                  console.log("response.data.response");
                  navigation.navigate("Login");
                  if (response.data.response === "Success") {
                    setRegData({
                      name: "",
                      phone: "",
                      email: "",
                      password: "",
                    });
                  }
                } else {
                  alert(response.data.errorMsg);
                  setRegData({
                    name: "",
                    phone: "",
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
            name: Yup.string().required("* Name is required"),
            phone: Yup.string().required("* Number is required"),
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
                  onPress={() => navigation.navigate("Login")}
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
                    Tell us about you
                  </RegularText>
                  <SmallText
                    style={{
                      color: "gray",
                    }}
                  >
                    Let's have you set up
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
                  Name
                </SmallText>
                <TextInput
                  placeholder="John"
                  placeholderTextColor="lightgray"
                  onBlur={handleBlur("name")}
                  onChangeText={handleChange("name")}
                  value={values.name}
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
                {errors.name && (
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 15,
                      color: "red",
                    }}
                  >
                    {errors.name}
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
                  Phone Number
                </SmallText>
                <TextInput
                  placeholder="9874560123"
                  placeholderTextColor="lightgray"
                  keyboardType="phone-pad"
                  onBlur={handleBlur("phone")}
                  onChangeText={handleChange("phone")}
                  value={values.phone}
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
                {errors.phone && (
                  <Text
                    style={{
                      fontSize: 10,
                      marginBottom: 15,
                      color: "red",
                    }}
                  >
                    {errors.phone}
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
              </View>

              <TouchableOpacity
                style={styles.button}
                onPress={() => handleSubmit()}
              >
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "600",
                    color: "white",
                  }}
                >
                  Create Account
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </KeyboardAwareScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  body: {
    flex: 1,
    height: "100%",
    width: "100%",
    marginEnd: "10%",
    marginTop: "10%",
    marginStart: "2%",
  },
  card: {
    padding: "5%",
    width: "100%",
    borderRadius: 20,
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
    marginEnd: "2%",
  },
});
