import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { TextInput } from 'react-native-paper'
import CustomeFont from '../CustomeFont'
import { basecolor } from '../services/constant'

export default class InputText extends Component {
  render() {
    return (
      <View style={{ marginTop: '5%' }}>
        <Text
          style={{
            alignSelf: 'baseline',
            color: '#fff',
             fontSize: 13,
             fontFamily:CustomeFont.Poppins_Light,
           }}
        >
          {this.props.title}
        </Text>
        <TextInput
          // label={this.props.title}
          value={this.props.value}
          onChangeText={this.props.onChangeText}
          style={{
            backgroundColor: this.props.backgroundbool ? '' : basecolor,
            width: '100%',
            height: 30,
            fontFamily:CustomeFont.Poppins_Regular,
            fontSize:15
          }}
          activeUnderlineColor={'#C441FD'}
          underlineColor={'#574273'}
          selectionColor='#fff'
          theme={{ colors: { text: '#fff', primary: 'red' } }}
          secureTextEntry={this.props.secureentery}
          editable={!this.props.editable}
        />
      </View>
    )
  }
}
