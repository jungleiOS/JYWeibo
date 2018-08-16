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

import { AppNavigator } from './App/Navigator/RootNavigator'

console.disableYellowBox = true;

export default class App extends Component {
  render() {
    return ( 
      <AppNavigator/>  
    );
  }
};

