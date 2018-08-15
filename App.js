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
  View
} from 'react-native';

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
        <RootNavigator/>  
    );
  }
};

const HomeStack = createStackNavigator({
  Home: {
    screen: WeiboHome,
    navigationOptions: {
      title: '首页',
      tabBarPosition: 'bottom',
      tabBarLabel: '首页',
      showLabel: true,
    }
  },
});

const MessageStack = createStackNavigator({
  Message: {
    screen: Message,
    navigationOptions: {
      title:'消息',
      tabBarPosition: 'bottom',
      showLabel: true,
    }
  },
});

const RootTabNavigator = createBottomTabNavigator({
  'Home': HomeStack,
  'Message': MessageStack,
}, {});

const RootNavigator = createStackNavigator({
  RootTab: {
    screen: RootTabNavigator,
    navigationOptions: {
      header: null,
    }
  },
  SubMessage: SubMessage,
});
