import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    Image
 } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export default class LunchPage extends Component {

    componentDidMount() {

        Token.then((value)=>{
            if (value === undefined) {
                this.isLogin = false;
            }
            else {
                this.isLogin = true;
            }
        });

        this.time = setInterval(()=>{
            if (this.isLogin) {
                this.props.navigation.navigate('Home');
            }
            else {
                this.props.navigation.navigate('Auth');
            }
        },1000);
        
    }

    componentWillUnmount() {
        clearInterval(this.time);
    }

    render() {
        return(
            <View>
                <Image
                    source={require('../Source/Image/lunch.jpg')}
                    style={styles.lunch}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    lunch:{
        width:WIDTH,
        height:HEIGHT
    }
});