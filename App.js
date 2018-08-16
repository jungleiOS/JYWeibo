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

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return ( 
        <RootNavigator/>  
    );
  }
};

const RootTabNavigator = createBottomTabNavigator({
  Home: {
    screen: WeiboHome,
    navigationOptions: {
      tabBarLabel: '首页',
    }
  },
  Message: {
    screen: Message,
    navigationOptions: {
      tabBarLabel: '消息',
    }
  },
});

const RootNavigator = createStackNavigator({
  RootTab: {
    screen:RootTabNavigator,
    navigationOptions: {
      header: null
    }
  },
  SubMessage: SubMessage,
});
