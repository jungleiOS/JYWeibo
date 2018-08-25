import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList,
    Animated,
    ScrollView
} from "react-native";

import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title
} from "native-base";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').HEIGHT;
export default class WeiboHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange: true,
            slideLineWidth: WIDTH/8,
            translationDistance:0
        };
        this.newX = 0;
        this.oldX = 0;
        this.isRight = false;
    }

    scrollDirection(offsetX){
        if(offsetX < 0){
            this.isRight = false;
            this.oldX = 0;
            return;
        }else if (offsetX > WIDTH) {
            this.oldX = WIDTH;
            this.isRight = true;
            return;
        }
        this.newX = offsetX;
        if (this.newX !== this.oldX) {
            if (this.newX > this.oldX) {
                this.isRight = true;
            }
            else if (this.newX < this.oldX) {
                this.isRight = false;
            }
        }
        this.oldX = this.newX;
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left style={{flex:1}}>
                        <Button transparent>
                            <Icon name="camera"/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{justifyContent:'flex-start'}}> 
                            <View 
                                style={{
                                    width:WIDTH/4,
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center'
                                    }}>
                                <Text style={{color:'brown'}}>
                                    {/* 特别 */}
                                    关注
                                </Text>
                                <Text style={{color:'brown'}}>
                                    热门
                                </Text>
                            </View>
                            <Animated.View style={{
                                backgroundColor:'pink',
                                width:this.state.slideLineWidth,
                                height:2,
                                marginTop:4,
                                maxWidth:WIDTH/4,
                                minWidth:WIDTH/8,
                                transform:[{translateX:this.state.translationDistance}]
                                }}>
                            </Animated.View>
                        </View>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="search"/>
                        </Button>
                        <Button transparent>
                            <Icon name="heart"/>
                        </Button>
                        <Button transparent>
                            <Icon name="more"/>
                        </Button>
                    </Right>
                </Header>

                <ScrollView 
                    horizontal={true}
                    pagingEnabled = {true}
                    onMomentumScrollBegin = {(event)=>{
                        console.log('开始  '+event.nativeEvent.contentOffset.x);
                    }}
                    onMomentumScrollEnd = {(event)=>{
                        console.log('结束  '+event.nativeEvent.contentOffset.x);
                    }}
                    onScroll = {(event)=>{
                        console.log('滚动  ' +event.nativeEvent.contentOffset.x);
                        this.scrollDirection(event.nativeEvent.contentOffset.x);
                        let tempWidth = this.state.slideLineWidth;
                        let maxWidth = WIDTH/4;
                        let minWidth = WIDTH/16;
                        if(this.isRight) {
                           tempWidth = tempWidth < maxWidth ? tempWidth+5 : maxWidth;  
                        }
                        else {
                            tempWidth = tempWidth > minWidth ? tempWidth-5 : minWidth;
                        }
                        // this.setState({
                        //     slideLineWidth:tempWidth
                        // });
                        if (tempWidth === maxWidth) {
                            this.setState({
                                translationDistance:tempWidth
                            });
                        }

                    }}
                    scrollEventThrottle = {60}
                >
                    <Text style={styles.test1}>23333</Text>
                    <Text style={styles.test}>23333</Text>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        width:WIDTH,
        height:HEIGHT,
        backgroundColor:'red'
    }, 
    test1: {
        width:WIDTH,
        height:HEIGHT,
        backgroundColor:'blue'
    }, 
});
