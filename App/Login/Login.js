import React, { Component } from 'react';
import { 
    Text, 
    View, 
    TextInput, 
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    NativeModules,
 } from 'react-native';
const WIDTH = Dimensions.get('window').width;
export default class WeiboHome extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            ischange : true,
        }
    }

    render() {
        return (
            <View 
                style={{ flex: 1, flexDirection:"column",justifyContent:'space-between'}}>
                
                <View>

                    <Text style={{left:20,marginTop:80,fontSize:22}}>欢迎登录</Text>
                    
                    <View style={{alignItems:'center',marginTop:60}}>
                        
                        <Test ischange = {this.state.ischange} />
                        <TextInput 
                            style={styles.input} 
                            placeholder='密码'
                            clearButtonMode={'always'} />
                        <TouchableOpacity 
                            style={styles.loginBtn}
                            onPress={()=>NativeModules.ThirdLoginModule.getAuthWithUserInfoFromSina(()=>{

                            })}
                        >
                            <Text style={{color:'white'}}>登录</Text>
                        </TouchableOpacity>
                        
                    </View>

                    <TouchableOpacity>
                        <Text style={styles.forgetPassword}>忘记密码?</Text>
                    </TouchableOpacity>

                </View>

                <TouchableOpacity 
                    style={{height:45}} 
                    onPress={()=>{
                        this.setState({
                            ischange:!this.state.ischange
                        });
                    }}>
                    <Text style={{left:15}}>还没有账号?请<Text style={{color:'black'}}>注册</Text></Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export class Test extends Component {
    
    render () {
        // this.ischange = true;
        return(
            <TextInput 
            style={this.props.ischange ? styles.input : styles.input1 }
            placeholder="请输入邮箱或手机号码"
            clearButtonMode={'always'} />
        );
    }
}

const styles = StyleSheet.create({
    input: {
        borderBottomColor:'gray',
        borderStyle:'solid',
        borderBottomWidth:1,
        height:45,
        width:WIDTH-30
    },
    input1: {
        borderBottomColor:'red',
        borderStyle:'solid',
        borderBottomWidth:1,
        height:45,
        width:WIDTH-30
    },
    loginBtn: {
        marginTop:45,
        height:45,
        width:WIDTH-30,
        borderRadius: 5,
        backgroundColor:'black',
        justifyContent: 'center',
        alignItems:'center'
    },
    forgetPassword: {
        left:15,
        marginTop:30
    }
})