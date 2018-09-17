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
                        uri: this.props.headImageURL
                    }}
                        style={styles.userHeadImage}/>
                    <View style={styles.userDescribe}>
                        <Text style={styles.userName}>{this.props.userName}</Text>
                        <View
                            style={{
                            flexDirection: 'row'
                        }}>
                            <Text style={styles.relevantInfo}>
                                {this.props.time+'  来自'}
                            </Text>
                            <TouchableOpacity>
                                <Text style={styles.highlightedInfo}>{this.props.describeTail}</Text>
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