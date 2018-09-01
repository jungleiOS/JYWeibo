import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
    ScrollView,
    NativeModules,
    NativeEventEmitter,
    DeviceEventEmitter,
    Platform,
    Modal,
    TouchableOpacity,
    Animated,
    Easing
} from "react-native";

import {
    Container, View
} from "native-base";

import HomeHeader from './HomeHeader';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const sliderLength = WIDTH/8;

export default class WeiboHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange: true,
            slideLineWidth: sliderLength,
            translationDistance:0,
            left:0,
            modalVisible:false,
            compositeAnim: new Animated.Value(-HEIGHT)
            
        };
        this.newX = 0;
        this.oldX = 0;
        this.isRight = false;
        this.tempWidth = this.state.slideLineWidth;
        this.maxWidth = WIDTH/4;
        this.minWidth = WIDTH/16;
        this.scrollEnd = true;
        this.currentTitle = 1;
    }

    componentDidMount() {
        
        if (Platform.OS === "ios") {
            let eventReceiver = new NativeEventEmitter(NativeModules.AddressBookModule);
            this.subscription = eventReceiver.addListener('contactInfo',(contactObj)=>{
                console.log('name = '+contactObj.name+'\n'+'phoneNumber = '+contactObj.phoneNumber);
            });
        }
        else {
            DeviceEventEmitter.addListener('contactInfo',(contactObj)=>{
                console.log('name = '+contactObj.name+'\n'+'phoneNumber = '+contactObj.phoneNumber);
            });
        }
        
    }

    scrollDirection(offsetX){
        this.newX = offsetX;
        if (this.newX !== this.oldX) {
            if (this.newX > this.oldX) {
                this.isRight = true;
            }
            else {
                this.isRight = false;
            }
        }
        this.oldX = this.newX;
    }

    _onScroll = (event) => {
        let offsetX = event.nativeEvent.contentOffset.x;
        if (this.scrollEnd) {
            this.scrollDirection(event.nativeEvent.contentOffset.x);
        }
        let offset = offsetX/WIDTH;
        this.scrollEnd = false;
        if(this.isRight) {
            this.tempWidth = sliderLength*(1+offset);  
            this.setState({
                slideLineWidth:this.tempWidth
            });
        }
        else {
            this.setState({
                left: sliderLength*offset,
                slideLineWidth: sliderLength*(1+1-offset)
            });     
        }
    }

    _onMomentumScrollEnd = (contentOffset) => {
        this.scrollDirection(contentOffset.x);
        this.scrollEnd = true;
        if (this.isRight){
            this.setState({
                left:sliderLength,
                slideLineWidth:sliderLength
            });
        }
        else {
            this.setState({
                left:0,
                slideLineWidth:sliderLength
            });
        }
    }

    headerCallback = (obj) => {
        if (obj.index === this.currentTitle) {
            // this.props.navigation.push('SelectGroup');
            NativeModules.AddressBookModule.takeContact('233');
            NativeModules.AddressBookModule.promiseMessage('promise').then(
                (result) => {
                    console.log(result)
                }
            ).catch()
            return;
        }else {
            this.currentTitle = obj.index;
        }
        if (obj.index === 1){
            this.refs.scrollView.scrollTo({x: 0, y: 0, animated: true})
            this._onMomentumScrollEnd({x: 0, y: 0});
        }
        else {
            this.refs.scrollView.scrollTo({x: WIDTH, y: 0, animated: true})
            this._onMomentumScrollEnd({x: WIDTH, y: 0});
        }
    }

    render() {
        return (
            <Container>
                <Modal 
                    transparent = {true}
                    visible = {this.state.modalVisible}
                    onRequestClose = {
                        ()=>{

                        }
                    }
                    animationType ="none">
                    <TouchableOpacity style={styles.test2} onPress={()=>{
                         this.setState({
                            modalVisible:false
                        })
                    }}>

                        <Text>close Modal</Text>
                    </TouchableOpacity>
                    
                </Modal>
                <HomeHeader
                    slideLineWidth = {this.state.slideLineWidth}
                    callback = {(obj)=>this.headerCallback(obj)}
                    left = {this.state.left}
                    maxWidth = {this.maxWidth}
                />

                <ScrollView 
                    ref = "scrollView"
                    horizontal={true}
                    pagingEnabled = {true}
                    showsHorizontalScrollIndicator = {false}
                    bounces = {false}
                    onMomentumScrollEnd = {(event)=>this._onMomentumScrollEnd(event.nativeEvent.contentOffset)}
                    onScroll = {(event)=>this._onScroll(event)}
                    scrollEventThrottle = {60}
                >
                    <View style={styles.test1}>
                        <TouchableOpacity onPress={()=>{
                            Animated.sequence([ 
                            Animated.timing(this.state.compositeAnim, {
                                toValue: 0,
                                easing: Easing.ease
                            }),
                            // Animated.delay(200), 
                            // Animated.timing(this.state.compositeAnim, {
                            //     toValue: 0,
                            //     easing: Easing.elastic(2),
                            // }),
                            // Animated.delay(100), 
                            // Animated.timing(this.state.compositeAnim, {
                            //     toValue: 50,
                            //     easing: Easing.linear,
                            // }),
                            // Animated.timing(this.state.compositeAnim, {
                            //     toValue: 0,
                            //     easing: Easing.elastic(1),
                            // })
                            ]).start();
                            }}
                        >
                            <Animated.View style={{
                                width:WIDTH,
                                height:2/3*HEIGHT,
                                backgroundColor:'pink',
                                // transform:[{translateY:this.state.anim.interpolate({
                                //     inputRange:[0,1],
                                //     outputRange: [0, 300],
                                // })}]
                                top:this.state.compositeAnim
                            }}>

                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.test}>

                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        width:WIDTH,
        height:HEIGHT,
        backgroundColor:'red',
    }, 
    test1: {
        width:WIDTH,
        height:HEIGHT,
        backgroundColor:'blue',
        justifyContent:'flex-start',
        // alignItems: 'flex-start',
    }, 
    test2: {
        width:WIDTH,
        height:HEIGHT,
        // backgroundColor:'blue',
        justifyContent:'center',
        alignItems: 'center',
    }, 
});
