import React, {
    Component
} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Animated
} from 'react-native';
import {
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
} from "native-base";
export default class HomeHeader extends Component {
    render() {
        return (
            <View>

                <Header>
                    <Left style={{flex:1}}>
                        <Button transparent>
                            <Icon name="camera"/>
                        </Button>
                    </Left>
                    <Body>
                        <View style={{justifyContent:'flex-start',maxWidth:2*this.props.maxWidth}}> 
                            <View 
                                style={{
                                    width:this.props.maxWidth,
                                    flexDirection:'row',
                                    justifyContent:'space-around',
                                    alignItems:'center'
                                }}>
                                <TouchableOpacity onPress={()=>this.props.callback({index:1})}>
                                    <Text style={{color:'brown'}}>
                                        关注
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>this.props.callback({index:2})}>
                                    <Text style={{color:'brown'}}>
                                        热门
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <Animated.View style={{
                                backgroundColor:'pink',
                                width:this.props.slideLineWidth,
                                height:2,
                                marginTop:4,
                                maxWidth:2*this.props.slideLineWidth,
                                minWidth:this.props.slideLineWidth,
                                left:this.props.left
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
                    </Right>
                </Header>

            </View>
        );
    }
}