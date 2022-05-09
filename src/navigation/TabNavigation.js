import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import Calender from "../screen/Calender"
import Profile from "../screen/Profile"
import HomeStack from "./HomeStack"
import { basecolor } from "../services/constant"
import { Image, View } from "react-native"
import DeviceInfo from "react-native-device-info"
let hasNotch = DeviceInfo.hasNotch()

const Tab = createBottomTabNavigator()
export default function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let image
          if (route.name === "Profile") {
            image = focused
              ? require("../assets/myprofileactive.png")
              : require("../assets/myprofiledeactive.png")
          } else if (route.name === "Home") {
            image = focused
              ? require("../assets/Homeactive.png")
              : require("../assets/Home2.png")
          } else if (route.name === "Calender") {
            image = focused
              ? require("../assets/calendaractive.png")
              : require("../assets/calendardeactive.png")
          }
          return (
            <View
              style={{
                borderTopColor: focused ? "#EA68FD" : "",
                borderTopWidth: focused ? 3 : 0,
                paddingHorizontal: focused ? 2 : 0,
                backgroundColor: focused ? "rgba(234, 104, 253,0.2)" : ""
              }}
            >
              <Image
                resizeMode="contain"
                source={image}
                style={{ height: 50, width: 50, marginTop: 5 }}
              />
            </View>
          )
        },

        headerShown: false,
        tabBarStyle: {
          backgroundColor: basecolor,
          borderTopColor: "#472f67",
          height: hasNotch ? 84 : 64
          // paddingBottom: 5
        },
        tabBarShowLabel: false
      })}
    >
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Calender" component={Calender} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  )
}
