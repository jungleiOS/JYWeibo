import React, {
    Component
} from 'react';

import WeiboHome from '../Home/WeiboHome';
import Message from '../Message/Message';
import Add from '../Add/Add';
import Found from '../Found/Found';
import Setting from '../Setting/Setting';

import SubMessage from '../Message/SubMessage';
import SelectGroup from '../Home/SelectGroup.js'

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
            header:null
        }
    },
});

const MessageStack = createStackNavigator({
    Message: {
        screen: Message,
        navigationOptions: {
            header:null
        }
    },
});

const AddStack = createStackNavigator({
    Add: {
        screen: Add,
        navigationOptions: {
            header:null
        }
    },
});

const FoundStack = createStackNavigator({
    Found: {
        screen: Found,
        navigationOptions: {
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
    SelectGroup: SelectGroup
});

const DrawerNavigator = createDrawerNavigator({
    Home: RootNavigator,
    Message: Message
});

const AppNavigator = createSwitchNavigator({
    Home: DrawerNavigator
});


export { AppNavigator };