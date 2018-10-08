import React, {Component} from 'react';
import {Modal,TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import VerifyOtp from './VerifyOtp';

export default class AppStackNavigator extends Component {
  state = {
    authCode: '',
    username:'',
    password:'',
    email:'',
    phone_number:'',
    confirmCode:'',
    signUpClicked:false,
    verifiedClicked:false,
    modalVisibility:false,
    secureTextEntry:true,
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }

  onBack(){
    this.setState({signUpClicked:false});
  }

  closeModal=()=>{
    setInterval(() => {
        this.setState({ modalVisibility: !this.state.modalVisibility })
      }, 2000)
  }
  signUp() {
    const{username,password,phone_number,email}=this.state;
    if(username==''||password==''||phone_number==''||email==''){
      var err='Fill all Fields';
      alert(JSON.stringify(err));
    }
    else{
        Auth.signUp({
        username: this.state.username,
        password: this.state.password,
        attributes: {
          phone_number: '+91'+this.state.phone_number,
          email: this.state.email,
        }
      })
      .then(res => {
        this.setState({signUpClicked:!this.state.signUpClicked})
        console.log('successful signup: ', res)
      })
      .catch(err => {
        alert(err.message || JSON.stringify(err));
      })
    }
  }

  verified(verifiedClicked){
    this.setState({verifiedClicked});
    this.setState({modalVisibility:verifiedClicked})
  }

  onPasswordPress=()=>{
    var err='Minimum length of password should be 8.It should contain at atleast one Uppercase and one LowerCase.It should also contain atleast one special character and one number';
    alert(JSON.stringify(err));
  }

  onUsernamePress=()=>{
    var err='There should be no space in Username';
    alert(JSON.stringify(err));
  }

  render() {
    if(this.state.signUpClicked===true && this.state.verifiedClicked==false){
      return(
        <VerifyOtp username={this.state.username} onBack={this.onBack.bind(this)} screenProps={{
          verified:this.verified.bind(this),
        }}/>
      );
    }
    return (
      <View style={styles.container}>
      <Modal visible={this.state.modalVisibility} animationType={"slide"} transparent={true}>
          <View style={{ margin: 20, padding: 20,
            backgroundColor: '#efefef',
            bottom: 250,
            left: 20,
            right: 20,
            alignItems: 'center',
            position: 'absolute' }}>
            <Text style={{fontSize:10,  color:'blue'}}>Signed Up Successfully</Text>
            <TouchableOpacity onPress={() => {
              this.setState({modalVisibility:!this.state.modalVisibility});}} style={{ paddingTop: 10, paddingBottom: 10}}>
                  <Text >Cancel</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <FontAwesome name={'user-plus'} color={'#333333'} size={60} style={styles.userIcon}/>
        <View style={styles.passwordInput}>
          <TextInput
            placeholder='Username'
            onChangeText={value => this.onChangeText('username',value)}
            style={styles.input}
          />
          <TouchableOpacity style={styles.starIcon} onPress={this.onUsernamePress}>
            <FontAwesome name={'bullseye'} size={15} color={'#E57373'}/>
          </TouchableOpacity>
        </View>
        <View style={styles.passwordInput}>
          <TextInput
            placeholder='Password'
            onChangeText={value => this.onChangeText('password',value)}
            style={styles.input}
            secureTextEntry={ this.state.secureTextEntry }
          />
          <TouchableOpacity style={styles.starIcon} onPress={this.onPasswordPress}>
            <FontAwesome name={'bullseye'} size={15} color={'#E57373'}/>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder='Phone'
          onChangeText={value => this.onChangeText('phone_number',value)}
          value={this.state.phone_number}
          style={styles.input}
        />
        <TextInput
          placeholder='Email'
          onChangeText={value => this.onChangeText('email',value)}
          style={styles.input}
        />
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />
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
  starIcon:{
    position:'absolute',
    right:20,
    top:25,
  }
});
