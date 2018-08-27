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
const HEIGHT = Dimensions.get('window').height;
const sliderLength = WIDTH/8;
export default class WeiboHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange: true,
            slideLineWidth: sliderLength,
            translationDistance:0,
            left:0
        };
        this.newX = 0;
        this.oldX = 0;
        this.isRight = false;
        this.tempWidth = this.state.slideLineWidth;
        this.maxWidth = WIDTH/4;
        this.minWidth = WIDTH/16;
        this.scrollEnd = true;
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
                        <View style={{justifyContent:'flex-start',maxWidth:2*sliderLength}}> 
                            <View 
                                style={{
                                    width:WIDTH/4,
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center'
                                }}>
                                <TouchableOpacity>
                                    <Text style={{color:'brown'}}>
                                        关注
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                    <Text style={{color:'brown'}}>
                                        热门
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={{
                                backgroundColor:'pink',
                                width:this.state.slideLineWidth,
                                height:2,
                                marginTop:4,
                                maxWidth:2*sliderLength,
                                minWidth:sliderLength,
                                left:this.state.left
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
                    showsHorizontalScrollIndicator = {false}
                    bounces = {false}
                    onMomentumScrollEnd = {(event)=>{
                        this.scrollDirection(event.nativeEvent.contentOffset.x);
                        this.scrollEnd = true;
                        if(this.tempWidth === this.maxWidth) {
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
                    }}
                    onScroll = {(event)=>this._onScroll(event)}
                    
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
