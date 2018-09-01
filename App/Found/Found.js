import React, { Component } from 'react';
import { Text, View, Button, TouchableOpacity} from 'react-native';
import { Network } from '../Network/Network'
export default class Found extends Component {
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
                <TouchableOpacity onPress={()=>{
                    Network.get((res)=>{
                        console.log(res);
                    })
                }}>
                    <Text>233333</Text>
                </TouchableOpacity>
                
            </View>
        );
    }
}