import React from "react";
import { View, StatusBar, StyleSheet } from "react-native";
import MyTabs from "./src/navigation/TabNavigation";
import AuthNavigation from "./src/navigation/AuthNavigation";
import { PersistGate } from "redux-persist/lib/integration/react";
import store, { persistor } from "./src/store";
import { Provider, useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { basecolor } from "./src/services/constant";

const MyStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[styles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
const AppWrapper = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};
function App() {
  const user = useSelector((state) => state.authReducer.loggedin);

  return (
    <NavigationContainer>
      <MyStatusBar backgroundColor={basecolor} barStyle="light-content" />
      {!user ? <AuthNavigation /> : <MyTabs />}
    </NavigationContainer>
  );
}
export default AppWrapper;
const STATUSBAR_HEIGHT = StatusBar.currentHeight;
const APPBAR_HEIGHT = Platform.OS === "ios" ? 0 : 56;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  appBar: {
    backgroundColor: "#79B45D",
    height: APPBAR_HEIGHT,
  },
  content: {
    flex: 1,
    backgroundColor: "#33373B",
  },
});
