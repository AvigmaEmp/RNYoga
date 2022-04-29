import React, { Component } from "react";
import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import ViewComp from "../customcomponent/ViewComp";
import Header from "../customcomponent/Header";
import { getnutrition } from "../services/api.function";

export default class Nutrition extends Component {
 
  constructor() {
    super();
    this.state = {
    nutrition:[]
    };
  }
  componentDidMount() {
   this.onHandlegetnutrition()
  }

  onHandlegetnutrition = async () => {
    let data = {
      NU_PKeyID: 1,
      Type: 1,
    }
    this.setState({ isLoading: true })
    await getnutrition(data)
      .then((res) => {
        console.log('res', JSON.stringify(res))
        console.log('resUSRDATA', res)
        this.setState({ nutrition:res, isLoading: false })
      })
      .catch((error) => {
        if (error.response) {
          console.log('responce_error', error.response)
          this.setState({
            isLoading: false,
            color: 'red',
            visible: true,
            message: 'Some Response Error'
          })
        } else if (error.request) {
          this.setState({
            isLoading: false,
            color: 'red',
            visible: true,
            message: 'Some Request Error'
          })
          console.log('request error', error.request)
        }
      })
  }
  
 
 
 
  render() {
    return (
      <ImageBackground
        source={require("../assets/background.png")}
        resizeMode="stretch"
        style={{ height: "100%" }}
      >
        <SafeAreaView>
          <ScrollView>
          <Header title={"Nutrition"} navigation={this.props.navigation} />
          <View
            style={{
              marginHorizontal: 10,
              paddingBottom:20
            }}
          >
            {/* <ViewComp
              onPress={() =>
                this.props.navigation.navigate("DetailPageScreen", {
                  title: "Guide",
                })
              }
              title={"Guide"}
              iconpath={require("../assets/flower.png")}
            /> */}
             <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("DetailGuide", {
                    title: "Guide",
                  })
                }
                title={"Guide"}
                iconpath={require("../assets/icon-guide.png")}
              />
            <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("Detaildiet", {
                    title: "Diet tips",
                  })
                }
                title={"Diet tips"}
                iconpath={require("../assets/icon-diet-tips.png")}
              />
            <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("Detailbadfood", {
                    title: "Bad foods",
                  })
                }
                title={"Bad food"}
                iconpath={require("../assets/icon-bad-food.png")}
              />
             <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("Detailbrainfood", {
                    title: "Brain food",
                  })
                }
                title={"Brain food"}
                iconpath={require("../assets/icon-brain-food.png")}
              />
              <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("DetailRecipes", {
                    title: "Recipes",
                  })
                }
                title={"Recipes"}
                iconpath={require("../assets/Guide.png")}
              />
              <ViewComp
                onPress={() =>
                  this.props.navigation.navigate("DetailGroceryList", {
                    title: "Grocery list",
                  })
                }
                title={"Grocery list"}
                iconpath={require("../assets/flower.png")}
              />
           
          </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
