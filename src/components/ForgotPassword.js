import React, {Component} from 'react';
import {TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View,Modal} from 'react-native';
import { Auth } from 'aws-amplify';
import Header from './Header';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ChangePassword from './ChangePassword';

export default class ForgotPassword extends Component {
  state = {
    username:'',
    shouldVerify:false,
    modalVisibility:false,
    verifiedClicked:false,
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }
  closeModal=()=>{
    setInterval(() => {
        this.setState({ modalVisibility: !this.state.modalVisibility })
      }, 2000)
  }
  isVerified(){
    this.props.screenProps.verified(true);
  }

  forgotPassword(){
    const new_password='Eshant@12'
    Auth.forgotPassword(this.state.username)
    .then(data => {
      console.log(data);
      this.setState({verifiedClicked:!this.state.verifiedClicked});
    })
    .catch(err=>{
      console.log('err:',err)
      alert(err.message || JSON.stringify(err));
    })
  }

  render() {
    if(this.state.verifiedClicked===true){
      return (
        <ChangePassword username={this.state.username} screenProps={{isVerified:this.isVerified.bind(this)}}/>
      );
    }
      return (
        <View style={styles.container}>
          <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
          <View>
            <TextInput
              placeholder='Username'
              onChangeText={value => this.onChangeText('username',value)}
              style={styles.input}
            />
            <Button title='Verify and Change Password' onPress={this.forgotPassword.bind(this)}/>
          </View>
        </View>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop:200,
    alignItems:'stretch',
    height:'100%',
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
  }
});
