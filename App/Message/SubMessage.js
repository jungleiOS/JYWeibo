// import React, { Component } from 'react';
// import { Text, View} from 'react-native';

// export default class Message extends Component {
//     render() {
//         return (
//             <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//                 <Text>SubMessage Screen</Text>
//             </View>
//         );
//     }
// }

import React,{Component} from 'react';
import {StyleSheet, TextInput, View} from "react-native";
import VerifyInput from './VerifyInput';

export default class RegisterSendCode extends Component {
    constructor(props) {
        super(props);
        this.isDelete = false;
    }
   

    render() {
        return (
            // <Container>
                
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
                
            // </Container>
        );
    }
}

// export class VerifyInput1 extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             list : [],
//         }
//     }

//     componentWillMount() {
//         // let containtList = [];
//         // for (let i = 0; i < this.props.count; i++ ) {
//         //     containtList.push('');
//         // }
//         // this.setState({
//         //     list:containtList
//         // });
//         this.createTempData();
//     }

//     componentDidMount() {
//         this.refs.input.focus();
//     }

//     createTextBox = () => {
        
//         let componentList = [];
    
//         console.log(this.state.list)
//         for(let i = 0; i < this.props.count; i++ ) {
//             componentList.push(
//                 <View style = {styles.inp}>
//                     <Text>{this.state.list[i]}</Text>
//                 </View>
//             );
//         }
//         return componentList;
//     }

//     createTempData = () => {
//         let containtList = [];
//         for (let i = 0; i < this.props.count; i++ ) {
//             containtList.push('');
//         }
//         this.setState({
//             list:containtList
//         });
//     }

//     render() {
//        return(
//            <View>
//                 <View style = {styles.cont}>
//                     {this.createTextBox()}
//                 </View>

//                 <TextInput 
//                     ref = 'input'
//                     caretHidden
//                     maxLength = {this.props.count}
//                     onChangeText = {
//                         (text)=>{
//                             let tempList = [];
//                             for (let i = 0; i < text.length; i++) {
//                                 tempList.push(text.charAt(i));
//                             }
//                             console.log(tempList)
//                             this.setState({
//                                 list:tempList
//                             });
//                         }
//                     }
//                     style={{color:'white'}}
//                 />

//            </View>
           
//        )
//     }
// }


const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 100,
    },
    inp: {
        width: 40,
        height: 40,
        fontSize: 28,
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor: '#4A4A4A',
        borderBottomWidth: 2,
        marginRight: 10,
    },
    sendCon: {
        marginTop: 56,
        marginLeft: 51,

    },
    sendCod: {
        fontSize: 13,
        color: '#9B9B9B',
    }
})