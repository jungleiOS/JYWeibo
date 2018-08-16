import React, { Component } from 'react';
import { Text, View, Button, PanResponder } from 'react-native';

export default class WeiboHome extends Component {
    componentWillMount() {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                console.log(+JSON.stringify(gestureState));
                console.log(e.nativeEvent.locationX);
                return true;
            }
        });
    }
    render() {
        return (
            <View {...this._panResponder.panHandlers}style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button 
                    title = "去消息页"
                    onPress = { () => this.props.navigation.navigate('Message', {
                        itemId: 86,
                        otherParam: 'anything you want here',
                    }) }
                />
            </View>
        );
    }
}