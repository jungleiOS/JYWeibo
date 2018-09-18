import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Image
} from "react-native";

export default class WeiboContent extends Component {
    render() {
        return(
            <View style={styles.middle}>
                    <Text>{this.props.item.text}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    middle:{
        marginTop: 8,
        marginBottom: 8,
        left:13,
        width:Dimensions.get('window').width-26,
        justifyContent:'center',
        alignItems:'center'
    }
});