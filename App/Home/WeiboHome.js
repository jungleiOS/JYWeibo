import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity,
    Dimensions,
    StyleSheet
 } from 'react-native';
const WIDTH = Dimensions.get('window').width;
export default class WeiboHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ischange : true,
        }
    }

    render() {
        console.log('====> '+ this.ischange)
        return (
            <View style={{ flex: 1, flexDirection:"column",justifyContent:'space-between'}}>
                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    
});