
import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Keyboard,
  AppState,
  Image
} from 'react-native'
import { basecolor } from '../services/constant'
import InputText from '../customcomponent/InputText'
import ButtomCustom from '../customcomponent/ButtomCustom'
import { ActivityIndicator, Snackbar } from 'react-native-paper'
import KeyboardSpacer from 'react-native-keyboard-spacer'
// import LinearGradient from "react-native-linear-gradient";
import { login, normalize } from '../services/api.function'
import Spinner from 'react-native-loading-spinner-overlay'
import qs from 'qs'
import { connect } from 'react-redux'
import { setLoggedIn, setToken } from '../store/action/auth/action'
import ActivityIndicatorApp from '../customcomponent/ActivityIndicator'
import dynamicLinks from '@react-native-firebase/dynamic-links'
import CustomeFont from '../CustomeFont'
import GradientButton from '../customcomponent/GradientButton'

class LandingScreen extends Component {
  constructor() {
    super()
    this.state = {
      ErrorPassword: null,
      ErrorEmail: null,
      ErrorUserEmail: null,
      form: [],
      grant_type: 'password',
      access_token: '',
      clientid: 1,
      isLoading: false,
      fcmtoken: '',
      visible: false,
      message: '',
      appState: 'active'
    }
  }
  _getInitialUrl = async () => {
    const url = dynamicLinks().onLink(this.handleDynamicLink)
  }
  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange)
  }

  _handleAppStateChange = async (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      this._getInitialUrl()
    }
    this.setState({ appState: nextAppState })
  }
  handleDynamicLink = (link) => {
    if (link.url) {
      this.props.navigation.navigate('ResetPassword', { link: link.url })
    }
  }
  onDismissSnackBar = () => this.setState({ visible: false })
  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value
      }
    })
  }
  componentDidMount = async () => {
    // this.focusListener = this.props.navigation.addListener("focus", () => {

    // });
    this._getInitialUrl()
    AppState.addEventListener('change', this._handleAppStateChange)
    await dynamicLinks()
      .getInitialLink()
      .then((link) => {
        if (link) {
          console.log('Loginlink', link)
          this.props.navigation.navigate('ResetPassword', { link: link.url })
        }
        console.log('Loginlinklink', link)
      })
  }
  _handleLogin = async () => {
    
  }
  render() {
    console.log(this.state.form)
    return (
      <SafeAreaView style={{ backgroundColor: basecolor }}>
        <Spinner visible={this.state.isLoading} />
        <ScrollView
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={{ backgroundColor: basecolor, height: '100%' }}
        >
          <View
            style={{
              alignItems: 'center',
              paddingVertical: 4
              // height: "20%",
              // backgroundColor: "pink",
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 24,
                fontFamily:CustomeFont.Poppins_SemiBold,
                lineHeight: 30,
                marginTop: 20
              }}
            >
              Relieve Anxiety
            </Text>
          </View>
          
          <View
            style={{
              paddingHorizontal: 25,
              marginTop:10,
              justifyContent:'center',
              alignItems:'center'
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                lineHeight: 25,
                 fontFamily:CustomeFont.Poppins_Light
              }}
            >
        All-in-One app to help you feel better, live well and stop worrying about anxiety.</Text>
          </View>
          <Image  
          style={{flex:1,alignSelf:'center'}}
          resizeMode={'cover'}
           source={require('../assets/bg1.png')}
          />
          <View
            style={{
              paddingHorizontal: 20,
              marginTop:20
            }}
          >
           <TouchableOpacity
           onPress={() => this.props.navigation.navigate('Login')}

           >
           <Text
              style={{
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                lineHeight: 25,
                fontFamily:CustomeFont.Poppins_Light
              }}
            >
              Sign into an existing account
             </Text>
           </TouchableOpacity>
          </View>
         <View style={{marginBottom:20}}>
         <GradientButton
            backgroundColor={'#C441FD'}
            title={'Sign Up'}
            onPress={() => this.props.navigation.navigate('Register')}
            />
         </View>

          {this.state.isLoading && <ActivityIndicatorApp />}

          <KeyboardSpacer />
          <Snackbar
            duration={100000}
            visible={this.state.visible}
            onDismiss={() => this.onDismissSnackBar()}
            action={{
              label: 'close',
              onPress: () => {
                this.setState({ visible: false })
              }
            }}
          >
            {this.state.message}
          </Snackbar>
        </ScrollView>
      </SafeAreaView>
    )
  }
}
const mapStateToProps = (state, ownProps) => ({
  // parentid: state.parentidReducer.parentid,
})

const mapDispatchToProps = {
  setLoggedIn,
  setToken
}
export default connect(mapStateToProps, mapDispatchToProps)(LandingScreen)
