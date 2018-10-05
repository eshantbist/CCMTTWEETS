import React, {Component} from 'react';
import {Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class ForgotPassword extends Component {
  state = {
    username:'',
    code:'',
    confirmCode:'',
    shouldVerify:false,
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }

  forgotPassword(){
    const new_password='Eshant@12'
    Auth.forgotPassword(this.state.username)
    .then(data => {
      console.log(data);
      this.setState({shouldVerify:!this.state.shouldVerify});
    })
    .catch(err => console.log(err));

    Auth.forgotPasswordSubmit(this.state.username, this.state.code, new_password)
    .then(data => console.log(data))
    .catch(err => console.log(err));
  }

  render() {
    if(this.state.shouldVerify===true){
      return (
        <View style={styles.container}>
          <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
          <TextInput
            placeholder='Verification Code'
            onChangeText={value => this.onChangeText('code',value)}
            secureTextEntry={ true }
            style={styles.input}
          />
          <Button title='Change Password' onPress={this.forgotPassword.bind(this)}/>

        </View>
      );
    }
      return (
        <View style={styles.container}>
          <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
          <TextInput
            placeholder='Username'
            onChangeText={value => this.onChangeText('username',value)}
            style={styles.input}
          />
          <Button title='Change Password' onPress={this.forgotPassword.bind(this)}/>

        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    height:'100%',
    flexDirection:'column',
  },
  input: {
    height: 50,
    backgroundColor: '#ededed',
    margin:10,
    paddingLeft:10,
    borderRadius:10
  },
  userIcon:{
    marginHorizontal:130,
    marginBottom:20,
  }
});
