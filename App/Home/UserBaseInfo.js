import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    View,
    Image
} from "react-native";

export default class UserBaseInfo extends Component {
    render() {
        return (
            <View style={styles.userBaseInfo}>

                <TouchableOpacity style={styles.userBaseInfo2}>
                    <Image
                        source={{
                        uri: 'data:image/png;base64,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'
                    }}
                        style={styles.userHeadImage}/>
                    <View style={styles.userDescribe}>
                        <Text style={styles.userName}>塔米尔</Text>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.relevantInfo}>
                                一小时前 来自
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.highlightedInfo}>肾XMax客户端</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.arrowImageTouch}>
                    <Image
                        source={require('../Source/Image/downArrow.png')}
                        style={styles.arrowImage}/>
                </TouchableOpacity>

            </View>
        );
    }
}

const styles = StyleSheet.create({

    userBaseInfo: {
        marginTop: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: Dimensions.get('window').width
    },

    userBaseInfo2: {
        flexDirection: 'row',
        left: 15
    },

    userDescribe: {
        left: 15,
        justifyContent: 'space-between'
    },

    userHeadImage: {
        width: 48,
        height: 48,
        borderRadius: 24
    },

    arrowImageTouch: {
        alignItems: 'center',
        height: 44,
        width: 44
    },

    arrowImage: {
        width: 20,
        height: 20
    },

    userName: {
        fontSize: 16
    },

    relevantInfo: {
        fontSize: 14,
        color: '#767676'
    },

    highlightedInfo: {
        color: '#0385d2'
    }
});