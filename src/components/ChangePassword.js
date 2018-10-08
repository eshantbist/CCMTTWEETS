import React, {Component} from 'react';
import {Modal,TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class ChangePassword extends Component {
  state = {
    code:'',
    username:this.props.username,
    new_password:'',
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }
  changePassword(){
    Auth.forgotPasswordSubmit(this.state.username, this.state.code, this.state.new_password)
    .then(data => {
      console.log('data:',data);
      this.props.screenProps.isVerified();
    })
    .catch(err=>{
      console.log('err:',err)
      alert(err.message || JSON.stringify(err));
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
        <TextInput
          placeholder='Verification Code'
          onChangeText={value => this.onChangeText('code',value)}
          secureTextEntry={ true }
          style={styles.input}
        />
        <TextInput
          placeholder='New Password'
          onChangeText={value => this.onChangeText('new_password',value)}
          secureTextEntry={ true }
          style={styles.input}
        />
        <Button title='Verify and Change Password' onPress={this.changePassword.bind(this)}/>

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
