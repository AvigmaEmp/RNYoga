import React, { Component } from 'react'
import {
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  Keyboard,
  AppState
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

class Login extends Component {
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
    Keyboard.dismiss()
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const { email, password } = this.state.form
    this.setState({ isLoading: false })
    if (
      email == undefined ||
      email === '' ||
      password == undefined ||
      password === ''
    ) {
      this.setState({
        visible: true,
        message: 'Empty Fields.'
      })
    } else {
      if (email.match(re)) {
        if (password.length > 8) {
          this.setState({ isLoading: true })
          let data = qs.stringify({
            grant_type: this.state.grant_type,
            username: email, // 'jainminals@gmail.com', //email,
            password: password, //'12343', //password,
            ClientId: this.state.clientid,
            Role: 2
            // IMEI: this.state.fcmtoken,
          })
          console.log('loginnnnnn', data)
          await login(data)
            .then((res) => {
              console.log('res: ', JSON.stringify(res))
              this.props.setToken(res.access_token)
              this.props.setLoggedIn(true)
              this.setState({
                isLoading: false,
                access_token: res.access_token,
                visible: true,
                message: 'Login successfully.'
              })
            })
            .catch((error) => {
              if (error.response) {
                this.setState({
                  isLoading: false,
                  visible: true,
                  message: 'Response Error.'
                })
                if (error.response.data.error == '-90') {
                  this.setState({
                    isLoading: false,
                    visible: true,
                    message: 'The Email ID or password is incorrect.'
                  })
                }
                if (error.response.data.error == '0') {
                  this.setState({
                    isLoading: false,
                    visible: true,
                    message: 'The Email ID or password is incorrect.'
                  })
                }
              } else if (error.request) {
                this.setState({
                  isLoading: false,
                  visible: true,
                  message: 'Request Error.'
                })
              } else if (error) {
                this.setState({
                  isLoading: false,
                  visible: true,
                  message: 'Server Error.'
                })
              }
            })
        } else {
          this.setState({
            isLoading: false,
            visible: true,
            message: 'Password must be at least 8 characters long.'
          })
        }
      } else {
        this.setState({
          isLoading: false,
          visible: true,
          message: 'Check email format.'
        })
      }
    }
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
                fontSize: 21,
                fontFamily:CustomeFont.Poppins_SemiBold,
                lineHeight: 30,
                marginTop: 20
              }}
            >
              Sign In
            </Text>
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                textAlign: 'center',
                lineHeight: 25,
                marginTop:4,
               fontFamily:CustomeFont.Poppins_Light
              }}
            >
              We'll personalize your usage across all our platform with your
              login
            </Text>
          </View>
          <View
            style={{
              marginHorizontal: 20,
               marginBottom: 5
            }}
          >
            <InputText
              onChangeText={(text) => this.onHandleChange('email', text)}
              title={'Email'}
            />
            <InputText
              onChangeText={(text) => this.onHandleChange('password', text)}
              title={'Password'}
              secureentery={true}
            />
          </View>
          <View
            style={{
              paddingHorizontal: 20,
              marginTop:20
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 25,
                fontFamily:CustomeFont.Poppins_Light
              }}
            >
              By continuing you are agreeing Relanxie{' '}
              <Text style={{ color: '#C441FD' }}>terms </Text> of service and{' '}
              <Text style={{ color: '#C441FD' }}>privacy policy</Text>
            </Text>
          </View>
          <GradientButton
            backgroundColor={'#C441FD'}
            title={'Sign In'}
            onPress={() => this._handleLogin()}
          />

          {this.state.isLoading && <ActivityIndicatorApp />}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 10,
              marginTop:15
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 13,
                fontFamily:CustomeFont.Poppins_SemiBold
              }}
            >
              Or
            </Text>
          </View>

          {Platform.OS === 'ios' && (
            <ButtomCustom
              backgroundColor={'#3D265E'}
              title={' Sign In With Apple'}
              name={'apple1'}
              onPress={() => this._handleLogin()}
            />
          )}
          <ButtomCustom
            name={'facebook-square'}
            backgroundColor={'#3D265E'}
            title={' Sign In With Facebook'}
            onPress={() => this._handleLogin()}
          />

          <View
            style={{
              marginHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              marginTop: 15
              // height: "30%",
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily:CustomeFont.Poppins_SemiBold
              }}
            >
              Don't have an account ?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Register')}
              style={{
                alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: "pink",
              }}
            >
              <Text
                style={{
                  color: '#C441FD',
                  fontSize: 16,
                fontFamily:CustomeFont.Poppins_SemiBold,
                  textDecorationLine: 'underline'
                }}
              >
                Register
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              marginHorizontal: 20,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              // marginTop: 20,
              // height: "10%",
              marginTop: 6
            }}
          >
            <Text
              style={{
                color: '#fff',
                fontSize: 16,
                fontFamily:CustomeFont.Poppins_SemiBold
              }}
            >
              Forgot Your password?{' '}
            </Text>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Forgotpassword')}
              style={{
                alignItems: 'center',
                justifyContent: 'center'
                // backgroundColor: "pink",
              }}
            >
              <Text
                style={{
                  color: '#C441FD',
                  fontSize: 16,
                fontFamily:CustomeFont.Poppins_SemiBold,
                  textDecorationLine: 'underline'
                }}
              >
                Click here
              </Text>
            </TouchableOpacity>
          </View>
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
export default connect(mapStateToProps, mapDispatchToProps)(Login)
