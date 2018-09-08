import React, {Component} from 'react';

import {
    Text,
    Modal,
    TouchableOpacity,
    Animated,
    Dimensions,
    Easing,
    StyleSheet,
    Alert
} from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class CustomModal extends Component {

    render() {
        this.compositeAnim = new Animated.Value(-HEIGHT);
        this.opacityAnim = new Animated.Value(0.5)
        return (
            <Modal
                transparent={true}
                visible={this.props.modalVisible}
                onShow = {()=>{
                    Animated.timing(this.compositeAnim, {
                        toValue: 0,
                        easing: Easing.easeInOut
                    }).start();
                    Animated
                        .timing(this.opacityAnim, {
                        toValue: 1,
                        duration: 500
                    }).start();
                }}
                onRequestClose={() => this.props.callback()}
                animationType="fade"
            >
                <TouchableOpacity
                    style = {{top:global.HEADER_HEIGHT,overflow: 'hidden'}}
                >
                    <Animated.View
                        style={{
                        removeClippedSubviews:true,
                        overflow: 'hidden',
                        width: WIDTH,
                        height: HEIGHT / 2,
                        backgroundColor: 'pink',
                        top: this.compositeAnim,
                        opacity: this.opacityAnim
                    }}>
                        <TouchableOpacity
                            style={styles.test2}
                            onPress={() => {
                                Animated.timing(this.compositeAnim, {
                                    toValue: -HEIGHT,
                                    easing: Easing.easeInOut
                                }).start(()=>{this.props.callback()});
                            }}
                        >
                            <Text>close Modal</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </TouchableOpacity>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    test2: {
        width: WIDTH,
        height: HEIGHT,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
