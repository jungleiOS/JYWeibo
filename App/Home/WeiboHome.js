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
    TouchableOpacity,
    Modal
} from "react-native";

import {
    Container, View
} from "native-base";

import HomeHeader from './HomeHeader';
import CustomModal from './CustomModal';
import WeiboList from './WeiboList';

import { Network } from '../Common/Network/Network';
import * as SinaAPI from '../Common/Network/SinaWeiboAPI';

import ImageViewer from 'react-native-image-zoom-viewer';

const WIDTH = Dimensions.get('window').width;
const sliderLength = WIDTH/8;

export default class WeiboHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ischange: true,
            slideLineWidth: sliderLength,
            translationDistance: 0,
            left: 0,
            modalVisible: false,
            imageViewerModal : false,
            imageViewerIndex : 0,
            titleText: '关注',
            imageUrls: []
        };
        this.newX = 0;
        this.oldX = 0;
        this.isRight = false;
        this.tempWidth = this.state.slideLineWidth;
        this.maxWidth = WIDTH/4;
        this.minWidth = WIDTH/16;
        this.scrollEnd = true;
        this.scrollEnd = false;
        this.tagList = [
            ['全部关注','特别关注','V+微博','好友圈','群微博'],
            ['逆向','iOS','Android','React Native','SSH','名人明星'],
            ['特别关注','群微博','好友圈','全都好友关注','全都关注好友圈密']
        ];
        this.currentPage = 0;
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
        this.currentPage = contentOffset.x/WIDTH;
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
        if (this.currentPage === 0 && obj.index === 1) {
            this.setState({
                modalVisible:true
            });
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

    modalCallback = (obj) => {
        this.setState({
            modalVisible:false,
            titleText: this.tagList[obj.titleID][obj.tagID]
        });
        // if (!global.iOS) {
        //     NativeModules.ThirdLoginModule.getAuthWithUserInfoFromSina(()=>{

        //     });
        // }
    }

    _onDismiss = () => {
        // NativeModules.ThirdLoginModule.getAuthWithUserInfoFromSina((info)=>{
        //     let base_info = JSON.parse(info.baseJSONStr);
        //     console.log(base_info);
        //     let params = {
        //         'access_token':base_info.accessToken
        //     };
        //     Network.get(SinaAPI.home_timeline,params,(data)=>{
        //         console.log(data);
        //     });
        // });
    }
    
    render() {
        return (
            <Container>
                <CustomModal 
                    modalVisible = {this.state.modalVisible}
                    titleList = {['默认分组','我的分组','其他']}
                    tagList = {this.tagList}
                    callback = {(obj)=>this.modalCallback(obj)}
                    onDismiss = {()=>this._onDismiss()}
                />
                <Modal visible={this.state.imageViewerModal} transparent={false}>
                    <ImageViewer 
                        imageUrls={this.state.imageUrls}
                        index={this.state.imageViewerIndex}
                        onClick={()=>{
                            this.setState({
                                imageViewerModal:false
                            });
                        }}
                    />
                </Modal>
                <HomeHeader
                    slideLineWidth = {this.state.slideLineWidth}
                    callback = {(obj)=>this.headerCallback(obj)}
                    left = {this.state.left}
                    maxWidth = {this.maxWidth}
                    titleText = {this.state.titleText}
                />
                <ScrollView 
                    ref = "scrollView"
                    horizontal={true}
                    pagingEnabled = {true}
                    showsHorizontalScrollIndicator = {false}
                    bounces = {false}
                    onMomentumScrollEnd = {(event)=>this._onMomentumScrollEnd(event.nativeEvent.contentOffset)}
                    onScroll = {(event)=>this._onScroll(event)}
                    scrollEventThrottle = {16}
                >
                    <View style={styles.test1}>
                        {/* <TouchableOpacity onPress={()=>{
                            this.setState({
                                modalVisible:true
                            })
                        }}>
                            <Text>show Modal</Text>
                        </TouchableOpacity> */}
                        <WeiboList callback={(imageObj)=>{
                            let list = [];
                            for (let i = 0; i < imageObj.imageList.length; i++) {
                                list.push({'url':imageObj.imageList[i]});
                            }
                             this.setState({
                                imageViewerModal:true,
                                imageUrls:list,
                                imageViewerIndex: imageObj.index
                            });
                        }}/>
                    </View>
                    <View style={styles.test}>
                        <TouchableOpacity onPress={()=>{
                            this.props.navigation.navigate('Auth');
                        }}>
                            <Text>去登录</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        width:WIDTH,
    }, 
    test1: {
        width:WIDTH,
        justifyContent:'center',
        alignItems:'center'
    }, 
});
