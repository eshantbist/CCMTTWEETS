import React, {Component} from 'react';
import {Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import Tabs from './Tabs';
import Amplify, { Auth } from 'aws-amplify';
import App from './App';
import config from './aws-exports';
import Header from './Header';
import ForgotPassword from './ForgotPassword';
Amplify.configure(config)

export default class AppStackNavigator extends Component {
  state = {
    isAuthenticated:false,
    signUpClicked:false,
    token:'',
  }

  authenticate(isAuthenticated,signUpClicked,token){
    this.setState({isAuthenticated});
    this.setState({signUpClicked});
    this.setState({token});
  }

  signedUp(signUpClicked){
    this.setState({signUpClicked});
  }
  render() {

    if(this.state.isAuthenticated && this.state.token){
      return (
        <View>
          <Header
            authentication={this.state.isAuthenticated}
            screenProps={{
              authenticate:this.authenticate.bind(this),
            }}
          />
          <App token={this.state.token}/>
        </View>
      );
    }
    if(this.state.signUpClicked){
      return (
        <View>
          <Header
            authentication={this.state.isAuthenticated}
            screenProps={{
              authenticate:this.authenticate.bind(this)
            }}
          />
          <ForgotPassword/>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          authentication={this.state.isAuthenticated}
          screenProps={{
            authenticate:this.authenticate.bind(this),
          }}
        />
        <Tabs
          screenProps={{
            authenticate:this.authenticate.bind(this),
          }}
        />
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


});
