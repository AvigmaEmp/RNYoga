import React, { Component } from "react"
import { Text, View, Image, TouchableOpacity } from "react-native"
import LinearGradient from "react-native-linear-gradient"
import CustomeFont from "../CustomeFont"

export default class VideoListV extends Component {
  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onPress()
        }}
      >
        <View>
          <View
            style={{
              marginHorizontal: 15,
              justifyContent: "center",
              alignContent: "center"
            }}
          >
            <Image
              source={require("../assets/yoga.jpg")}
              resizeMethod={"resize"}
              resizeMode={"cover"}
              style={{ width: "100%", height: 200, borderRadius: 10 }}
            />
          </View>
          <LinearGradient
            start={{ x: 0.0, y: 0.0 }}
            end={{ x: 0, y: 1.2 }}
            colors={["#D970F5", "#A33AF3"]}
            style={{
              position: "absolute",
              bottom: 10,
              left: 30,
              padding: 2,
              borderRadius: 20
            }}
          >
            <Text
              style={{
                fontFamily: CustomeFont.Poppins_Regular,
                fontSize: 12,
                color: "white",
                textAlign: "center"
              }}
            >
              30:00{" "}
            </Text>
          </LinearGradient>
        </View>
        <Text
          style={{
            fontSize: 15,
            fontFamily: CustomeFont.Poppins_Medium,
            color: "white",
            marginHorizontal: 25,
            marginTop: 15
          }}
        >
          The name of yoga lessions #1
        </Text>
        <Text
          style={{
            fontSize: 12,
            fontFamily: CustomeFont.Poppins_Light,
            color: "white",
            marginHorizontal: 25,
            marginTop: 15,
            marginBottom: 30
          }}
        >
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content.{" "}
        </Text>
      </TouchableOpacity>
    )
  }
}
