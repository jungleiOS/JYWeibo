import React, {
    Component
} from 'react';

import WeiboHome from '../Home/CustomHeader';
import Message from '../Message/Message';
import SubMessage from '../Message/SubMessage';

import {
    createStackNavigator,
    createBottomTabNavigator
} from 'react-navigation';

const HomeStack = createStackNavigator({
    Home: {
        screen: WeiboHome,
        navigationOptions: {
            // title: '首页',
            header:null
        }
    },
})

const MessageStack = createStackNavigator({
    Message: {
        screen: Message,
        navigationOptions: {
            // title: '消息'
            header:null
        }
    },
});

const RootTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: {
            tabBarLabel: '首页'
        }
    },
    Message: {
        screen: MessageStack,
        navigationOptions: {
            tabBarLabel: '消息'
        }
    },
});

const RootNavigator = createStackNavigator({
    RootTab: {
        screen: RootTabNavigator,
        navigationOptions: {
            header: null
        }
    },
    SubMessage: SubMessage,
});

export { RootNavigator };