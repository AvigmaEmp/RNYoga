import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  TouchableOpacity,
  Keyboard,
  Image,
  TextInput
} from 'react-native'
import InputText from '../customcomponent/InputText'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { userprofile, userprofileupdate } from '../services/api.function'
import ButtomCustom from '../customcomponent/ButtomCustom'
import { signout } from '../store/action/auth/action'
import { connect } from 'react-redux'
import { Snackbar } from 'react-native-paper'
import GradientButton from '../customcomponent/GradientButton'
import CustomeFont from '../CustomeFont'
import { basecolor } from '../services/constant'
class Profile extends Component {
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
      password: '',
      passShow: false
    }
  }

  onHandleChange = (key, value) => {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [key]: value
      }
    })
  }
  onDismissSnackBar = () => this.setState({ visible: false })

  UpdateProfile = async () => {
    Keyboard.dismiss()
    const re = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
    const { email, password, firstname } = this.state.form
    if (
      email == undefined ||
      email === '' ||
      password == undefined ||
      password === '' ||
      firstname === undefined ||
      firstname === ''
    ) {
      this.setState({
        visible: true,
        message: 'Empty Fields.'
      })
    } else {
      if (email.match(re)) {
        let data = {
          // User_Type: 1,
          User_Name: firstname,
          User_Email: email,
          User_Password: password,
          Type: 2
        }
        console.log('userprofileupdate', data, this.props.token)
        await userprofileupdate(data, this.props.token)
          .then((res) => {
            console.log('res: ', res[0])
            this.setState(
              {
                isLoading: false,
                visible: true,
                message: 'Profile updated successfully' //
              },
              () => this.GetUserProfile()
            )
          })
          .catch((error) => {
            if (error.response) {
              this.setState({ isLoading: false })
              console.log('error.response', error.response)
            } else if (error.request) {
              this.setState({ isLoading: false })
              console.log('request error', error.request)
            } else if (error) {
              alert('Server Error')
              this.setState({ isLoading: false })
            }
          })
      } else {
        this.setState({
          isLoading: false,
          visible: true,
          message: 'Check email format.'
        })
      }
    }
  }
  componentDidMount() {
    this.GetUserProfile()
  }
  GetUserProfile = async () => {
    this.setState({ isLoading: true })
    let data = {
      Type: 2
    }
    // console.log("userprofile", data, this.props.token);
    await userprofile(data, this.props.token)
      .then((res) => {
        console.log('res: ', res[0][0])
        this.setState({
          ...this.state,
          form: {
            ...this.state.form,
            firstname: res[0][0].User_Name,
            email: res[0][0].User_Email,
            password: res[0][0].User_Password
          },
          isLoading: false,
          userdata: res[0]
        })
      })
      .catch((error) => {
        if (error.response) {
          this.setState({ isLoading: false })
          console.log('error.response', error.response)
        } else if (error.request) {
          this.setState({ isLoading: false })
          console.log('request error', error.request)
        } else if (error) {
          alert('Server Error')
          this.setState({ isLoading: false })
        }
      })
  }
  _handleLogOut = () => {
    this.props.signout()
  }
  onShowPassword = () => {
    this.setState({ passShow: !this.state.passShow },()=>{
      console.log('hello')
    })
  }
  render() {
    return (
      <ImageBackground
        source={require('../assets/background.png')}
        resizeMode='stretch'
        style={{ height: '100%' }}
      >
        <ScrollView>
          <View style={styles.container1}>
            <Text style={styles.textheader}>My Profile</Text>
          </View>

          <Text style={styles.textheader2}>Account</Text>

          <View style={styles.container2}>
            <InputText
              value={this.state.form.firstname}
              backgroundbool={true}
              onChangeText={(text) => this.onHandleChange('firstname', text)}
              title={'First Name'}
            />
            <InputText
              value={this.state.form.email}
              backgroundbool={true}
              onChangeText={(text) => this.onHandleChange('email', text)}
              title={'Email'}
              editable={true}
            />
            <View>
             
              {/* <InputText
                value={this.state.form.password}
                backgroundbool={true}
                secureTextEntry={this.state.passShow == true ? false : true}
                onChangeText={(text) => this.onHandleChange('password', text)}
                title={'Password'}
              /> */}
 <View style={{ marginTop: '5%' }}>
        <Text
          style={{
            alignSelf: 'baseline',
            color: '#fff',
             fontSize: 13,
             fontFamily:CustomeFont.Poppins_Light,
           }}
        >
          Password
        </Text>
        <View style={{flexDirection:'row',borderBottomWidth:1,borderBottomColor:'#574273'}}>
        <TextInput
          // label={this.props.title}
          value={this.state.form.password}
          onChangeText={(text) => this.onHandleChange('password', text)}
          style={{
             flex:1,
            height:40,
            fontFamily:CustomeFont.Poppins_Regular,
            fontSize:15,
            color:'#fff',
            marginStart:10
          }}
          activeUnderlineColor={'#C441FD'}
          underlineColor={'#574273'}
          selectionColor='#fff'
          theme={{ colors: { text: '#fff', primary: 'red' } }}
          secureTextEntry={this.state.passShow == true ? false : true}
          editable={false}
        />
         <TouchableOpacity
                style={{  width:30,height:30,justifyContent:'center',alignItems:'center' }}
                onPress={() => {
                  console.log('lllll')
                  this.onShowPassword()
                }}
              >
                <Image
                  style={{ tintColor: 'white', height: 24, width: 24 }}
                  source={
                    this.state.passShow
                      ? require('../assets/show.png')
                      : require('../assets/blind.png')
                  }
                />
              </TouchableOpacity>
        </View>
      </View>

            </View>
          </View>

          <Text style={styles.textheader2}>Subscription</Text>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate('SubscriptionScreen')}
            style={styles.container3}
          >
            <View
              style={{ flexDirection: 'row', justifyContent: 'flex-start' }}
            >
              <View>
                {/* <Image
                  style={styles.circleimage}
                  source={require("../icons/circle.png")}
                /> */}
              </View>
              <View style={{ marginLeft: 20 }}>
                <Text style={styles.bottomtext1}>First 14 days free</Text>
                <Text style={styles.bottomtext2}>49,99$ annualy</Text>
              </View>
            </View>
          </TouchableOpacity>
          <GradientButton
            backgroundColor={'#C441FD'}
            title={'Update'}
            onPress={() => this.UpdateProfile()}
          />
          <GradientButton
            marginBottom={20}
            backgroundColor={'#C441FD'}
            title={'Logout'}
            onPress={() => this._handleLogOut()}
          />
          <KeyboardSpacer />
        </ScrollView>
        <Snackbar
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
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container1: { padding: 20 },
  container2: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: '#3D265E',
    margin: 20,
    borderRadius: 10
  },
  container3: {
    padding: 30,
    // marginTop: 30,
    paddingBottom: 30,
    paddingHorizontal: 20,

    backgroundColor: '#3D265E',
    margin: 20,
    borderRadius: 10
  },
  text1: { color: '#FFFFFF', alignSelf: 'flex-start', marginBottom: 10 },
  textheader: {
     fontSize: 24,
     fontFamily:CustomeFont.Poppins_Medium,
    color: '#FFFFFF',
    marginTop: 30
  },

  textheader1: {
    color: '#9081A3',
    marginTop: 10,
    fontWeight: 'normal',
    fontSize: 16
  },
  textheader2: {
    fontSize: 16,
    marginTop: 3,
    color: '#FFFFFF',
    marginLeft: 30,
    fontFamily:CustomeFont.Poppins_Medium
  },

  validate: {
    height: 30,
    alignItems: 'flex-end',
    flexDirection: 'column'
  },

  bottomtext1: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily:CustomeFont.Poppins_Medium
  },

  bottomtext2: {
    fontSize: 14,
    color: '#9081A3',
    marginTop: 5,
    fontFamily:CustomeFont.Poppins_Light

  },

  circleimage: {
    marginTop: 10,
    height: 30,
    width: 30
  }
})
const mapStateToProps = (state, ownProps) => ({
  token: state.authReducer.token
})

const mapDispatchToProps = {
  signout
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile)
