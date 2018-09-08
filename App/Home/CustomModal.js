import React, {Component} from 'react';

import {
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    View
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class CustomModal extends Component {

    _onShow = () => {
        Animated.timing(this.compositeAnim, {
            toValue: 0,
            easing: Easing.easeInOut,
            duration: 300
        }).start();
        Animated.timing(this.opacityAnim, {
            toValue: 1,
            duration: 500
        }).start();
    }

    _closeAnim = () => {
        Animated.timing(this.compositeAnim, {
            toValue: -HEIGHT,
            easing: Easing.easeInOut
        }).start(() => {
                this.props.callback()
        });
        Animated.timing(this.opacityAnim, {
            toValue: 0,
            duration: 500
        }).start();
    }

    group = () => {
        let theGroup = [];
        if (!this.props.titleList) {
            return;
        }
        for(let i = 0; i < this.props.titleList.length; i++){
            theGroup.push(
                <View key={i} style={styles.group}>
                    <View style={styles.title}>
                        <Text style={{color:'#797979'}}>{this.props.titleList[i]}</Text>
                    </View>
                    <View style={styles.tagContainer}>
                        {this.tag(i)}
                    </View>
                </View>
            )
        }
        return theGroup;
    }

    tag = (row) => {
        let theTag = [];
        for (let j = 0; j < this.props.tagList[row].length; j++) {
            theTag.push(
                <TouchableOpacity 
                    key = {j} 
                    style={styles.tag}
                    onPress = {()=>{
                        this.props.callback({titleID:row,tagID:j});
                    }}
                >
                    <Text style={{color:'#212121'}}>{this.props.tagList[row][j]}</Text>
                </TouchableOpacity>
            );
        }
        return theTag;
    }

    render() {
        this.compositeAnim = new Animated.Value(-HEIGHT);
        this.opacityAnim = new Animated.Value(0.5)
        return (
            <Modal
                transparent
                visible={this.props.modalVisible}
                onShow= {() => this._onShow()}
                onRequestClose={() => this.props.callback()}
                animationType="fade">
                <View
                    style={{
                    backgroundColor: 'rgba(0.45, 0.45, 0.45, 0.1)',
                    overflow: 'hidden',
                    top: global.HEADER_HEIGHT,
                    height: HEIGHT - global.HEADER_HEIGHT
                }}>
                    <Animated.View
                        style={{
                        removeClippedSubviews: true,
                        overflow: 'hidden',
                        width: WIDTH,
                        top: this.compositeAnim,
                        opacity: this.opacityAnim,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#F5F5F5'
                    }}>
                        {this.group()}
                    </Animated.View>
                </View>

            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    test2: {
        width: WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5F5F5'
    },
    group: {
        justifyContent: 'flex-start',
        width: WIDTH - 30
    },
    title: {
        marginTop: 10,
        justifyContent: 'flex-start'
    },
    tagContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tag: {
        borderRadius: 3,
        borderColor: 'gray',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        marginTop: 10,
        backgroundColor:'#E7E7E7',
        paddingLeft: 10,
        paddingRight: 10,
    }
});
