import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';
export default class Message extends Component {
    render() {
        const { navigation } = this.props;
        const itemId = navigation.getParam('itemId', 'NO-ID');
        const otherParam = navigation.getParam('otherParam', 'some default value');
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Text>itemId: {JSON.stringify(itemId)}</Text>
                <Text>otherParam: {JSON.stringify(otherParam)}</Text>
                <Text>Message Screen</Text>
                <Button 
                    title = "去SubMessage"
                    onPress = { () => this.props.navigation.push('SubMessage', {
                        itemId: Math.floor(Math.random() * 100),
                    }) }
                />
                <Button 
                    title = "去Message"
                    onPress = { () => this.props.navigation.push('Message', {
                        itemId: Math.floor(Math.random() * 100),
                    }) }
                />
                <Button
                    title="Go to Home"
                    onPress={() => this.props.navigation.navigate('Home')}
                />
                <Button
                    title="Go back"
                    onPress={() => this.props.navigation.goBack()}
                />
            </View>
        );
    }
}