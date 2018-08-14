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
  createStackNavigator
} from 'react-navigation';

import WeiboHome from './App/Home/WeiboHome';
import Message from './App/Message/Message';

export default class App extends Component {
  render() {
    return (
      <RootNavigator/>
    );
  }
}

const RootNavigator = createStackNavigator(
  {
    Home: WeiboHome,
    Message: Message, 
  },
  {
    initialRouteName: 'Home',
  }
);
