import React, {
    Component
} from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
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

    constructor(props) {
        super(props);
        
        this.state = {
            textColor1:'#212121',
            textFontSize1:17,
            textColor2:'#797979',
            textFontSize2:15,
        }
        this.currentSelected = false;
    }

    changeTextStyle = () => {
        if (this.currentSelected) {
            this.setState({
                textColor1:'#212121',
                textFontSize1:17,
                textColor2:'#797979',
                textFontSize2:15,
            });
        }
        else {
            this.setState({
                textColor1:'#797979',
                textFontSize1:15,
                textColor2:'#212121',
                textFontSize2:17,
            });
        }
    }

    _onLayout = (event) => {
        let {x} = event.nativeEvent.layout;
        if (x === 0) {
            this.currentSelected = true;
            this.changeTextStyle();
        }
        else if ( x >= this.props.slideLineWidth) {
            this.currentSelected = false;
            this.changeTextStyle();
        }
    }

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
                                style={[styles.titleContainer,{width:this.props.maxWidth}]}>
                                <TouchableOpacity 
                                    onPress={()=>{
                                        this.props.callback({index:1});
                                        this.currentSelected = true;
                                        this.changeTextStyle();
                                }}>
                                    <Text style={{
                                        color:this.state.textColor1,
                                        fontSize:this.state.textFontSize1
                                    }}>
                                    关注
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>{
                                    this.props.callback({index:2});
                                    this.currentSelected = false;
                                    this.changeTextStyle();
                                }}>
                                    <Text style={{
                                        color: this.state.textColor2,
                                        fontSize: this.state.textFontSize2
                                    }}>
                                        热门
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View 
                                style={{
                                    backgroundColor:'#fe9600',
                                    width:this.props.slideLineWidth,
                                    height:2,
                                    marginTop:4,
                                    maxWidth:2*this.props.slideLineWidth,
                                    minWidth:this.props.slideLineWidth,
                                    left:this.props.left
                                }}
                                onLayout = {(event)=>this._onLayout(event)}
                            >
                            </View>
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

const styles = StyleSheet.create({
    titleContainer: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center'
    },

})