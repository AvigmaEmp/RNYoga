import React from "react";
import Home from "../screen/Home";
import Nutrition from "../screen/Nutrition";
import Yoga from "../screen/Yoga";
import ChatScreen from "../screen/ChatScreen";
import SubscriptionScreen from "../screen/SubscriptionScreen";
import ChatofflineScreen from "../screen/ChatofflineScreen";
import musicplayer from "../screen/musicplayer"
import { createStackNavigator } from "@react-navigation/stack";
import Meditation from "../screen/Meditation";
import Detailbrainfood from "../screen/Detailbrainfood";
import Detailbadfood from "../screen/Detailbadfood";
import DetailGuide from "../screen/DetailGuide";
import DetailRecipes from "../screen/DetailRecipes";
import DetailGroceryList from "../screen/DetailGroceryList";
import Detaildiet from "../screen/Detaildiet";
const HomeStack = createStackNavigator();

export default function HomeNavigation() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeScreen" component={Home} />
      <HomeStack.Screen name="NutritionScreen" component={Nutrition} />
      <HomeStack.Screen name="DetailGuide" component={DetailGuide} />
      <HomeStack.Screen name="Detaildiet" component={Detaildiet} />
      <HomeStack.Screen name="Detailbadfood" component={Detailbadfood} />
      <HomeStack.Screen name="Detailbrainfood" component={Detailbrainfood} />
      <HomeStack.Screen name="DetailRecipes" component={DetailRecipes} />
      <HomeStack.Screen name="DetailGroceryList" component={DetailGroceryList} />
      <HomeStack.Screen name="Yoga" component={Yoga} />
      <HomeStack.Screen name="ChatScreen" component={ChatScreen} />
      <HomeStack.Screen name="Meditation" component={Meditation} />
      <HomeStack.Screen name="musicplayer" component={musicplayer} />
      <HomeStack.Screen
        name="ChatofflineScreen"
        component={ChatofflineScreen}
      />
      <HomeStack.Screen
        name="SubscriptionScreen"
        component={SubscriptionScreen}
      />
    </HomeStack.Navigator>
  );
}
