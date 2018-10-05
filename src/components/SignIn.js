import React, {Component} from 'react';
import {Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import { Auth } from 'aws-amplify';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { AuthenticationDetails,CognitoUserPool, CognitoUserAttribute, CognitoUser } from 'amazon-cognito-identity-js';

var token;
export default class AppStackNavigator extends Component {
  state = {
    username:'',
    password:'',
    confirmCode:'',
    user:{},
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
            UserPoolId : 'us-east-1_P5KYxw7mb',
            ClientId : '6v7if32kkonnlop7k9smi1v60h'
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
                  IdentityPoolId : 'us-east-1:1770794e-a627-4028-b3a7-ada509a64983',
                  Logins : {
                      'cognito-idp.us-east-1.amazonaws.com/us-east-1_P5KYxw7mb': result.getIdToken().getJwtToken()
                  }
              });
              AWS.config.credentials.refresh((error) => {
                  if (error) {
                       console.error(error);
                  } else {
                       console.log('Successfully logged!');
                       console.log(result.getIdToken().getJwtToken());
                       token=result.getIdToken().getJwtToken();
                  }
              });
          },

          onFailure: function(err) {
              alert(err.message || JSON.stringify(err));
          },

      });
      this.props.screenProps.authenticate(true,false,token);
    })
    .catch(err => {
      //this.props.screenProps.authenticate(false,true)
      alert(err.message || JSON.stringify(err));
    })
  }

  forgotPassword(){
    this.props.screenProps.authenticate(false,true);
  }

  render() {
    return (
      <View style={styles.container}>
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
