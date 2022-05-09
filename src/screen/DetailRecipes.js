import React, { Component } from "react";
import { Text, View, ImageBackground, SafeAreaView, FlatList, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Header from "../customcomponent/Header";
import CustomeFont from "../CustomeFont";
import { GetUserRecipes } from "../services/api.function";
import { basecolor } from "../services/constant";
import LinearGradient from 'react-native-linear-gradient';


export default class DetailRecipes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            UserRecipes: [{ 1: 1 }],
            userTitle: this.props.route.params.title,
            isBreakFast:true,
            isSnak:false,
            isLunch:false,
            isdinner:false

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
                <View style={{position:'absolute',flexDirection:'row',justifyContent:'space-between',paddingHorizontal:15, bottom : 10, width:'98%', height:44,alignContent:'center',backgroundColor:basecolor}}>
                <LinearGradient style={{borderRadius:6}} start={{x: 0.0, y: 0.0}}
        end={{x: 0, y: 1.2}}
        colors= {this.state.isBreakFast ? ['#D970F5', '#A33AF3']: ["rgba(0,0,0,0)","rgba(0,0,0,0)"]} 
       ><TouchableOpacity onPress={()=>{
        this.setState({
            isBreakFast:true,
            isLunch:false,
            isSnak:false,
            isdinner:false
        })
    }} style={{padding:10}}><Text style={{color:'white',fontFamily:CustomeFont.Poppins_Medium, fontSize:14}}>Breakfast</Text></TouchableOpacity></LinearGradient>
                   <LinearGradient style={{borderRadius:6}} start={{x: 0.0, y: 0.0}}
        end={{x: 0, y: 1.2}}
        colors= {this.state.isLunch ? ['#D970F5', '#A33AF3']: ["rgba(0,0,0,0)","rgba(0,0,0,0)"]}
       ><TouchableOpacity onPress={()=>{
        this.setState({
            isBreakFast:false,
            isLunch:true,
            isSnak:false,
            isdinner:false
        })
    }} style={{padding:10}}><Text style={{color:'white',fontFamily:CustomeFont.Poppins_Medium, fontSize:14}}>Lunch</Text></TouchableOpacity></LinearGradient>
                   <LinearGradient style={{borderRadius:6}} start={{x: 0.0, y: 0.0}}
        end={{x: 0, y: 1.2}}
        colors= {this.state.isSnak ? ['#D970F5', '#A33AF3']: ["rgba(0,0,0,0)","rgba(0,0,0,0)"]}
       ><TouchableOpacity onPress={()=>{
        this.setState({
            isBreakFast:false,
            isLunch:false,
            isSnak:true,
            isdinner:false
        })
    }} style={{padding:10}}><Text style={{color:'white',fontFamily:CustomeFont.Poppins_Medium, fontSize:14}}>Snaks</Text></TouchableOpacity></LinearGradient>
                   <LinearGradient style={{borderRadius:6}} start={{x: 0.0, y: 0.0}}
        end={{x: 0, y: 1.2}}
        colors= {this.state.isdinner ? ['#D970F5', '#A33AF3']: ["rgba(0,0,0,0)","rgba(0,0,0,0)"]}
       ><TouchableOpacity onPress={()=>{
           this.setState({
               isBreakFast:false,
               isLunch:false,
               isSnak:false,
               isdinner:true
           })
       }} style={{padding:10}}><Text style={{color:'white',fontFamily:CustomeFont.Poppins_Medium, fontSize:14}}>Dinner</Text></TouchableOpacity></LinearGradient>
                    </View>
            </ImageBackground>
        );
    }
}
