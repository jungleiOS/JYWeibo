import React, { Component } from 'react';
import { StyleSheet, View } from "react-native";
import VerifyInput from './VerifyInput';

export default class RegisterSendCode extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (                
                <View style={styles.cont}>
                    <VerifyInput 
                        count = {5}
                        changeText = {
                            (text)=>{
                                console.log(text)
                            }
                        }
                        inputEnd = {
                            (text) => {
                                console.log(text)
                            }
                        }
                        backgroundColor = {'white'}
                    />
                </View>
        );
    }
}



const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
    },
})