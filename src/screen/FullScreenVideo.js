import React, { Component } from "react"
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ScrollView,
  SafeAreaView
} from "react-native"
import { basecolor } from "../services/constant"
import VideoPlayer from "react-native-video-player"
import Video from "react-native-video"
import CustomeFont from "../CustomeFont"

export default class FullScreenVideo extends Component {
  constructor() {
    super()
    this.state = {
      videosArray: [
        "https://musicsvideosfiles.s3.amazonaws.com/WhatsApp+Video+2022-04-28+at+4.09.10+PM.mp4",
        "https://musicsvideosfiles.s3.amazonaws.com/WhatsApp+Video+2022-04-28+at+4.09.10+PM.mp4",
        "https://musicsvideosfiles.s3.amazonaws.com/WhatsApp+Video+2022-04-28+at+4.09.10+PM.mp4",
        "https://musicsvideosfiles.s3.amazonaws.com/WhatsApp+Video+2022-04-28+at+4.09.10+PM.mp4"
      ]
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: basecolor, flex: 1 }}>
        <SafeAreaView>
          <VideoPlayer
            video={{
              uri:
                "https://musicsvideosfiles.s3.amazonaws.com/WhatsApp+Video+2022-04-28+at+4.09.10+PM.mp4"
            }}
            resizeMode={"stretch"}
            // style={{ position: "absolute", top: 10, height: 250 }}
          />
          <ScrollView style={{}}>
            <Text
              style={{
                fontSize: 15,
                fontFamily: CustomeFont.Poppins_Medium,
                color: "white",
                marginHorizontal: 25,
                marginTop: 10
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
              In publishing and graphic design, Lorem ipsum is a placeholder
              text commonly used to demonstrate the visual form of a document or
              a typeface without relying on meaningful content.{" "}
            </Text>
            <FlatList
              data={this.state.videosArray}
              renderItem={(item) => {
                return (
                  <View
                    style={{
                      marginBottom: 25,
                      flexDirection: "row",
                      marginHorizontal: 20,
                      overflow: "hidden"
                    }}
                  >
                    <Image
                      style={{ width: 90, height: 70, borderRadius: 10 }}
                      resizeMode={"cover"}
                      source={require("../assets/yoga.jpg")}
                    />
                    <View
                      style={{
                        paddingHorizontal: 15,
                        justifyContent: "center",
                        alignItems: "flex-start"
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 15,
                          fontFamily: CustomeFont.Poppins_Medium,
                          color: "white"
                        }}
                      >
                        The name of yoga lessions #1
                      </Text>
                      <Text
                        numberOfLines={2}
                        style={{
                          fontSize: 12,
                          fontFamily: CustomeFont.Poppins_Light,
                          color: "white",
                          marginTop: 5
                        }}
                      >
                        In publishing and graphic design, Lorem ipsum is a
                        placeholder text commonly used to demonstrate the visual
                        form of a document or a typeface without relying on
                        meaningful content.{" "}
                      </Text>
                    </View>
                  </View>
                )
              }}
            />
          </ScrollView>
          <TouchableOpacity
            onPress={() => this.props.navigation.goBack()}
            style={{
              backgroundColor: "#fff",
              justifyContent: "center",
              alignItems: "center",
              borderRadius: 3,
              marginHorizontal: 20,
              width: 28,
              position: "absolute",
              top: "5%"
            }}
          >
            <Image
              resizeMode="contain"
              style={{ height: 30, width: 30 }}
              source={require("../assets/backarrow.png")}
            />
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    )
  }
}
