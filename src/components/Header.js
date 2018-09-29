import React, {Component} from 'react';
import {Text, View, StyleSheet,TouchableOpacity,Platform} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component{
  render(){

    return(
      <TouchableOpacity onPress={this.props.onClick} style={styles.heading}>
        <FontAwesome name={'home'} style={styles.homeIcon}/>
        <Text style={styles.headingText}>  CCMT TWEETS</Text>
      </TouchableOpacity>
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
});
