import React, {
    Component
} from 'react';

import {
    Image
} from "react-native";

import WeiboHome from '../../Home/WeiboHome';
import Message from '../../Message/Message';
import Add from '../../Add/Add';
import Found from '../../Found/Found';
import Setting from '../../Setting/Setting';

import SubMessage from '../../Message/SubMessage';
import SelectGroup from '../../Home/SelectGroup';
import Login from '../../Login/Login';
import LunchPage from '../../Login/LunchScreen';

import {
    createStackNavigator,
    createBottomTabNavigator,
    createDrawerNavigator,
    createSwitchNavigator
} from 'react-navigation';

const kAdd = require('../../Source/Image/add.png');
const kAddSelected = require('../../Source/Image/addSelected.png');
const kMessage = require('../../Source/Image/message.png');
const kMessageSelected = require('../../Source/Image/messageSelected.png');
const kFind = require('../../Source/Image/find.png');
const kFindSelected = require('../../Source/Image/findSelected.png');
const kWeibo = require('../../Source/Image/weibo.png');
const kWeiboSelected = require('../../Source/Image/weiboSelected.png');
const kMy = require('../../Source/Image/my.png');
const kMySelected = require('../../Source/Image/mySelected.png');

const TabOptions = (tabBarTitle,normalImage,selectedImage) => {
    const tabBarLabel = tabBarTitle;
    const tabBarIcon = (({tintColor,focused})=> {
        return(
            <Image
                source={!focused ? normalImage : selectedImage}
                style={[{height:35,width:35 }, {tintColor: tintColor}]}
            />
        )
    });
    return {tabBarLabel,tabBarIcon};
}

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

const MyStack = createStackNavigator({
    Setting: {
        screen: Setting,
        navigationOptions: {
            header:null
        }
    },
});

const RootTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions: () => TabOptions('微博',kWeibo,kWeiboSelected)
    },
    Message: {
        screen: MessageStack,
        navigationOptions: () => TabOptions('消息',kMessage,kMessageSelected)
    },
    Add: {
        screen: AddStack,
        navigationOptions: () => TabOptions('添加',kAdd,kAddSelected)
    },
    Found: {
        screen: FoundStack,
        navigationOptions: () => TabOptions('发现',kFind,kFindSelected)
    },
    My: {
        screen: MyStack,
        navigationOptions: () => TabOptions('我的',kMy,kMySelected)
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
    Lunch: LunchPage,
    Home: DrawerNavigator,
    Auth: Login
});

export { AppNavigator };