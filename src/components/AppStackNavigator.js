import React, {Component} from 'react';
import {Button,TextInput,Platform, StyleSheet, Text, View} from 'react-native';
import Tabs from './Tabs';
import Amplify, { Auth } from 'aws-amplify';
import App from './App';
import config from './aws-exports';
import Header from './Header';
Amplify.configure(config)

export default class AppStackNavigator extends Component {
  state = {
    isAuthenticated:false,
    ForgotPasswordClicked:false,
    token:'',
    username:'',
    password:'',
  }

  authenticate(isAuthenticated,ForgotPasswordClicked,token,username,password){
    this.setState({isAuthenticated});
    this.setState({ForgotPasswordClicked});
    this.setState({token});
    this.setState({username});
    this.setState({password});
  }

  render() {

    if(this.state.isAuthenticated && this.state.token){
      console.log(this.state.username);
      return (
        <View>
          <Header
            authentication={this.state.isAuthenticated}
            screenProps={{
              authenticate:this.authenticate.bind(this),
            }}
          />
          <App token={this.state.token} username={this.state.username} password={this.state.password}/>
        </View>
      );
    }
    if(this.state.ForgotPasswordClicked){
      return (
        <View>
          <Header
            authentication={this.state.isAuthenticated}
            screenProps={{
              authenticate:this.authenticate.bind(this)
            }}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <Header
          authentication={false}
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
