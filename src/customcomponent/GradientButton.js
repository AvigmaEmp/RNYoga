
import React, { Component } from 'react'
import { Text, TouchableOpacity } from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import CustomeFont from '../CustomeFont'
import { normalize } from '../services/api.function'
import LinearGradient from 'react-native-linear-gradient';

export default class GradientButton extends Component {
  render() {
    return (
        <LinearGradient start={{x: 0.0, y: 0.0}}
        end={{x: 0, y: 1.2}}
        colors={['#D970F5', '#A33AF3']}
        style={{
            //  backgroundColor: this.props.backgroundColor, //"#3D265E",
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: this.props.margin ? null : 20,
              borderRadius: 10,
             
              marginTop: 20,
              height: 60,
              marginBottom: this.props.marginBottom
            }}>
      <TouchableOpacity
        onPress={this.props.onPress}
        style={{
           justifyContent: 'center',
          alignItems: 'center',
           width:'100%',
          height:'100%',
          flexDirection: 'row',
        }}
      >
        {/* <AntDesign name={this.props.name} size={25} color='#FFF' /> */}
        <Text
          style={{ marginStart:10,color: '#fff', fontSize: 17, fontFamily:CustomeFont.Poppins_SemiBold,}}
        >
          {this.props.title}
        </Text>
      </TouchableOpacity>
      </LinearGradient>
    )
  }
}
