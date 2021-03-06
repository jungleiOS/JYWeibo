import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';

export default class Setting extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
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