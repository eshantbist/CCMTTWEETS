import React, {Component} from 'react';
import {Modal,TouchableOpacity,Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ForgotPassword from './ForgotPassword';
import { AuthenticationDetails,CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

var token;
export default class AppStackNavigator extends Component {
  state = {
    username:'',
    password:'',
    confirmCode:'',
    user:{},
    ForgotPasswordClicked:false,
    modalVisibility:false,
    verifiedClicked:false,
  }
  onChangeText(key,value) {
    this.setState({ [key]:value })
  }
  signIn() {
    const {username,password}=this.state
    Auth.signIn(username,password)
    .then(user => {
      this.setState({user});
      console.log('successful signedIn')
      const poolData = {
            UserPoolId : 'us-east-1_rNybqJGJi',
            ClientId : '1d8nuq35qs58vd0411a6l11l8n'
        };
        var authenticationData = {
            Username : username,
            Password : password,
        };
      var authenticationDetails = new AuthenticationDetails(authenticationData);
      var userPool = new CognitoUserPool(poolData);
      var userData = {
          Username : username,
          Pool : userPool
      };
      var cognitoUser = new CognitoUser(userData);
      cognitoUser.authenticateUser(authenticationDetails, {
          onSuccess: function (result) {
              var accessToken = result.getAccessToken().getJwtToken();
              AWS.config.region = 'us-east-1';

              AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                  IdentityPoolId : 'us-east-1:6fad4bf2-7062-4763-bef6-f2f83ff1353d',
                  Logins : {
                      'cognito-idp.us-east-1.amazonaws.com/us-east-1_rNybqJGJi': result.getIdToken().getJwtToken()
                  }
              });
              AWS.config.credentials.refresh((error) => {
                  if (error) {
                       console.error(error);
                  } else {
                       console.log('Successfully logged!');
                       token=result.getIdToken().getJwtToken();
                  }
              });
          },

          onFailure: function(err) {
              alert(err.message || JSON.stringify(err));
          },

      });
      this.props.screenProps.authenticate(true,false,token,username,password);
    })
    .catch(err => {
      //this.props.screenProps.authenticate(false,true)
      alert(err.message || JSON.stringify(err));
    })
  }

  forgotPassword(){
    this.setState({ForgotPasswordClicked:!this.state.ForgotPasswordClicked})
  }

  verified(verifiedClicked){
    this.setState({verifiedClicked});
    this.setState({modalVisibility:true})
  }

  render() {
    if(this.state.ForgotPasswordClicked && this.state.verifiedClicked===false){
        return <ForgotPassword screenProps={{verified:this.verified.bind(this)}} />
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
              <Text style={{fontSize:10,  color:'blue'}}>Password Changed Successfully</Text>
              <TouchableOpacity onPress={() => {
                this.setState({modalVisibility:!this.state.modalVisibility});}} style={{ paddingTop: 10, paddingBottom: 10}}>
                    <Text >Cancel</Text>
              </TouchableOpacity>
            </View>
        </Modal>
        <FontAwesome name={'user-circle'} color={'#333333'} size={100} style={styles.userIcon}/>
        <TextInput
          placeholder='Username'
          onChangeText={value => this.onChangeText('username',value)}
          style={styles.input}
        />
        <TextInput
          placeholder='Password'
          onChangeText={value => this.onChangeText('password',value)}
          secureTextEntry={ true }
          style={styles.input}
        />
        <Button title='Sign In' onPress={this.signIn.bind(this)} style={styles.signIn}/>
        <Button title='Forgot Password??' onPress={this.forgotPassword.bind(this)} />

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
    marginHorizontal:130,
    marginBottom:20,
  }
});
