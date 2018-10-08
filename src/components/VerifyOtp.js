import React, {Component} from 'react';
import {Modal,TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class VerifyOtp extends Component {
  state = {
    confirmCode:'',
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }

  confirmSignUp(){
    Auth.confirmSignUp(this.props.username,this.state.confirmCode)
    .then(res=>{
      this.props.screenProps.verified(true);
      console.log('signed up',res)
    })
    .catch(err=>{
      console.log('err:',err)
      alert(err.message || JSON.stringify(err));
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder='Enter Verification Code'
          onChangeText={value => this.onChangeText('confirmCode',value)}
          style={styles.input}
        />

        <Button title='Verify OTP' onPress={this.confirmSignUp.bind(this)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    height: 50,
    backgroundColor: '#ededed',
    margin:10,
    paddingLeft:10,
    borderRadius:10
  },
  userIcon:{
    marginHorizontal:150,
    marginBottom:20,
  },
});
