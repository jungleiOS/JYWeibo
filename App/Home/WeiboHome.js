import React, { Component } from 'react';
import { Text, View, Button} from 'react-native';

export default class WeiboHome extends Component {
    static navigationOptions = {
        headerTitle: <CustomHeader />,
        headerRight: (
          <Button
            onPress={() => alert('This is a button!')}
            title="Info"
            color="#fff"
          />
        ),
      };
    
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

export class CustomHeader extends Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>2333</Text>
            </View>
        );
    }
  }