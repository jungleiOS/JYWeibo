/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {
  Component
} from 'react';

import {
  createStackNavigator,
  createBottomTabNavigator
} from 'react-navigation';

import WeiboHome from './App/Home/WeiboHome';
import Message from './App/Message/Message';
import SubMessage from './App/Message/SubMessage'; 

export default class App extends Component {
  render() {
    return (
      <RootTabNavigator/>
    );
  }
}

// const RootTabNavigator = TabNavigator({

// },{});

// const RootNavigator = createStackNavigator(
//   {
//     Home: WeiboHome,
//     Message: Message, 
//     SubMessage: SubMessage,
//   },
//   {
//     initialRouteName: 'Home',
//   }
// );

const HomeStack = createStackNavigator({
  Home: WeiboHome,
  SubMessage: SubMessage,
});

const MessageStack = createStackNavigator({
  Message: Message,
  SubMessage: SubMessage,
})

const RootTabNavigator = createBottomTabNavigator({
  Home: HomeStack,
  Message: MessageStack
},{})