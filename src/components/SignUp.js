import React, {Component} from 'react';
import {Modal,TouchableOpacity, Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class AppStackNavigator extends Component {
  state = {
    authCode: '',
    username:'',
    password:'',
    email:'',
    phone_number:'',
    confirmCode:'',
    modalVisibility:false,
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
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
          phone_number: this.state.phone_number,
          email: this.state.email,
        }
      })
      .then(res => {
        console.log('successful signup: ', res)
      })
      .catch(err => {
        alert(err.message || JSON.stringify(err));
      })
    }
  }

  confirmSignUp(){
    Auth.confirmSignUp(this.state.username,this.state.confirmCode)
    .then(res=>{
      console.log('signed up',res)
    })
    .catch(err=>{
      console.log('err:',err)
    })
  }

  onStarPress=()=>{
    this.setState({modalVisibility:!this.state.modalVisibility});
    console.log(this.state.modalVisibility);
  }

  // slideBack=()=

  render() {
    return (
      <View style={styles.container}>
        <Modal visible={this.state.modalVisibility} onShow={this.slideBack} animationType={"slide"} transparent={true}>
          <View>
            <Text>Hello World</Text>
          </View>
        </Modal>
        <FontAwesome name={'user-plus'} color={'#333333'} size={60} style={styles.userIcon}/>
        <TextInput
          placeholder='Username'
          onChangeText={value => this.onChangeText('username',value)}
          style={styles.input}
        />
        <View style={styles.passwordInput}>
          <TextInput
            placeholder='Password'
            onChangeText={value => this.onChangeText('password',value)}
            style={styles.input}
            secureTextEntry={ true }
          />
          <TouchableOpacity style={styles.starIcon} onPress={this.onStarPress}>
            <FontAwesome name={'star'} onHover={this.onStarPress} size={15} color={'#ff3333'}/>
          </TouchableOpacity>
        </View>
        <TextInput
          placeholder='Phone'
          onChangeText={value => this.onChangeText('phone_number',value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Email'
          onChangeText={value => this.onChangeText('email',value)}
          style={styles.input}
        />
        <Button title='Sign Up' onPress={this.signUp.bind(this)} />

        <TextInput
          placeholder='Verify OTP'
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
  starIcon:{
    position:'absolute',
    right:20,
    top:25,
  }
});
