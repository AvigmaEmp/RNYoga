import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../customcomponent/Header";
import { GetUserRecipes } from "../services/api.function";

export default class DetailRecipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserRecipes: [{ 1: 1 }],
            userTitle: this.props.route.params.title

        }
    }

    componentDidMount() {
        this.onHandleGetUserRecipes()
    }

    onHandleGetUserRecipes = async () => {
        let data = {
            UR_PKeyID: 1,
            Type: 1
        }
        this.setState({ isLoading: true })
        await GetUserRecipes(data)
            .then((res) => {
                console.log('res: ', JSON.stringify(res))
                console.log('resresresresresres', res);
                this.setState({ UserRecipes: res[0], isLoading: false })
                console.log('onHandleGetDietTips', this.state.UserRecipes);
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

    onrender = ({ item }) => {
        console.log('itemitem', item);
        return (
            <View style={{ padding: 15 }}>
                <Text style={{
                    fontWeight: "600",
                    fontSize: 18,
                    color: "#fff",
                    lineHeight: 20,
                }}>{item.UR_Name}</Text>
                <Text style={{ marginTop: 20, color: '#ccc', fontSize: 13, lineHeight: 20, }}>{item.UR_Description}</Text>

            </View>
        )
    }
    render() {
        return (
            <ImageBackground
                source={require("../assets/background.png")}
                resizeMode="stretch"
                style={{ height: "100%", flex: 1 }}
            >

                <SafeAreaView>
                    <ScrollView>
                        
                        <Header
                            title={`${this.props.route.params.title}`}
                            navigation={this.props.navigation}
                        />

                        <View style={{}}>
                            <FlatList
                                renderItem={this.onrender}
                                data={this.state.UserRecipes}
                            />
                        </View>
                      
                    </ScrollView>
                </SafeAreaView>

            </ImageBackground>
        );
    }
}
