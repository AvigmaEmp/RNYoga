import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList } from "react-native";
import Header from "../customcomponent/Header";
import { GetGroceryList } from "../services/api.function";

export default class DetailGroceryList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            GroceryList: [{ 1: 1 }],
            userTitle: this.props.route.params.title

        }
    }

    componentDidMount() {
        this.onHandleGetGroceryList()
    }

    onHandleGetGroceryList = async () => {
        let data = {
            GR_PKeyID: 1,
            Type:1
        }
        this.setState({ isLoading: true })
        await GetGroceryList(data)
            .then((res) => {
                console.log('res: ', JSON.stringify(res))
                console.log('resresresresresres', res);
                this.setState({ GroceryList: res[0], isLoading: false })
                console.log('onHandleGetGroceryList', this.state.GroceryList);
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
                }}>{item.GR_Name}</Text>
                <Text style={{ marginTop: 20, color: '#ccc', fontSize: 13,lineHeight:20,}}>{item.GR_Description}</Text>
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
                    <Header
                        title={`${this.props.route.params.title}`}
                        navigation={this.props.navigation}
                    />

                    <View>
                        <FlatList
                            renderItem={this.onrender}
                            data={this.state.GroceryList}
                        />
                    </View>

                </SafeAreaView>
            </ImageBackground>
        );
    }
}
