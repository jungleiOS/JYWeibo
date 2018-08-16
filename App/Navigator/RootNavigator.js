import React, {
    Component
} from 'react';

import WeiboHome from '../Home/CustomHeader';
import Message from '../Message/Message';
import Add from '../Add/Add';
import Found from '../Found/Found';
import Setting from '../Setting/Setting';

import SubMessage from '../Message/SubMessage';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from 'react-navigation';

const HomeStack = createStackNavigator({
    Home: {
        screen: WeiboHome,
        navigationOptions: {
            // title: '首页',
            header:null
        }
    },
});

const MessageStack = createStackNavigator({
    Message: {
        screen: Message,
        navigationOptions: {
            // title: '消息'
            header:null
        }
    },
});

const AddStack = createStackNavigator({
    Add: {
        screen: Add,
        navigationOptions: {
            // title: '首页',
            header:null
        }
    },
});

const FoundStack = createStackNavigator({
    Found: {
        screen: Found,
        navigationOptions: {
            // title: '首页',
            header:null
        }
    },
});

const SettingStack = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: {
            // title: '首页',
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
    Add: {
        screen: AddStack,
        navigationOptions: {
            tabBarLabel: '添加'
        }
    },
    Found: {
        screen: FoundStack,
        navigationOptions: {
            tabBarLabel: '发现'
        }
    },
    Setting: {
        screen: SettingStack,
        navigationOptions: {
            tabBarLabel: '我的'
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

const DrawerNavigator = createDrawerNavigator({
    Home: {
        screen: RootNavigator,
        navigationOptions: {
            gesturesEnabled: true,
            gestureResponseDistance: {
                horizontal: 300
            },
        }
    },
    Drawer: Message
});

const AppNavigator = createSwitchNavigator({
    Home: DrawerNavigator,
    SubMessage: SubMessage,
});

export { AppNavigator };