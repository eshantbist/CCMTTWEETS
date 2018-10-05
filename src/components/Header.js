import React, {Component} from 'react';
import {TouchableHighlight,Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Auth } from 'aws-amplify';

export default class Header extends Component{

  signOut(){
    // console.log(this.props.screenProps.isAuthenticated);
    Auth.signOut()
    .then(data => {
      this.props.screenProps.authenticate(false)
      console.log(data)
    })
    .catch(err => console.log(err));
  }

  render(){
    if(this.props.authentication===false){
      return(
        <View>
          <TouchableOpacity onPress={this.props.onClick} style={styles.heading}>
            <FontAwesome name={'home'} style={styles.homeIcon}/>
            <Text style={styles.headingText}>  CCMT TWEETS</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return(
      <View>
        <TouchableOpacity onPress={this.props.onClick} style={styles.heading}>
          <FontAwesome name={'home'} style={styles.homeIcon}/>
          <Text style={styles.headingText}>  CCMT TWEETS</Text>
        </TouchableOpacity>
        <TouchableHighlight onPress={this.signOut.bind(this)} style={styles.signOut}>
          <FontAwesome name={'sign-out'} size={25}/>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  heading:{
    marginTop:Platform.OS === 'ios' ? 20 : 0,
    padding:12,
    backgroundColor:'#e6e6e6',
    textAlign:'left',
    justifyContent:'center',
    flexDirection:'row'
  },
  headingText:{
    fontSize:20,
    fontWeight:'800',
    color:'#8c8c8c'
  },
  homeIcon:{
    fontSize:25,
    color:'#3366cc'
  },
  signOut:{
    position:'absolute',
    right:10,
    top:30
  }
});
