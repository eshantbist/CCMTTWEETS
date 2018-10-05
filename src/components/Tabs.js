import { createBottomTabNavigator } from 'react-navigation';
import React from 'react'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import SignIn from './SignIn'
import SignUp from './SignUp'

const config = {
  SignIn: {
    screen: SignIn,
    navigationOptions:{
      tabBarLabel:'Sign In',
      tabBarIcon:({tintColor})=>(
         <FontAwesome name={'sign-in'} color={'#333333'} size={22}/>
      )
    }
  },
  Register: {
    screen: SignUp,
    navigationOptions:{
      tabBarLabel:'Register',
      tabBarIcon:({tintColor})=>(
         <FontAwesome name={'user-plus'} color={'#333333'} size={22}/>
      )
    }
  }
}

export default createBottomTabNavigator(config)
