import React,{Component} from 'react';
import {StyleSheet, TextInput, View, Text, TouchableOpacity} from "react-native";

export default class VerifyInput extends Component {

    constructor(props) {
        super(props);
        this.state = {
            list : [],
        }
    }

    componentWillMount() {
        this.createTempData();
    }

    componentDidMount() {
        this.refs.input.focus();
    }

    createTextBox = () => {
        
        let componentList = [];
        for(let i = 0; i < this.props.count; i++ ) {
            componentList.push(
                <View style = {styles.inp}>
                    <Text>{this.state.list[i]}</Text>
                </View>
            );
        }
        return (
            <TouchableOpacity
                zIndex={5}
                style = {styles.cont}
                onPress = {()=>this.refs.input.focus()}
            >
                {componentList}
            </TouchableOpacity>
        );
    }

    createTempData = () => {
        let containtList = [];
        for (let i = 0; i < this.props.count; i++ ) {
            containtList.push('');
        }
        this.setState({
            list:containtList
        });
    }

    render() {
        return(
            <View style = {{backgroundColor:'white'}}>
                {this.createTextBox()}
                <TextInput 
                    zIndex={1}
                    ref = 'input'
                    caretHidden
                    maxLength = {this.props.count}
                    onChangeText = {
                        (text)=>{
                            this.props.changeText(text);
                            let tempList = [];
                            for (let i = 0; i < text.length; i++) {
                                tempList.push(text.charAt(i));
                            }
                            this.setState({
                                list:tempList
                            });
                            if (text.length === this.props.count) {
                                this.refs.input.blur();
                            }
                        }
                     }
                     onBlur = {
                         (event)=>{
                            this.props.inputEnd(event.nativeEvent.text);
                         }
                     }
                    style={{color:this.props.backgroundColor}}
                />
            </View>
       )
    }
}

const styles = StyleSheet.create({
    cont: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    inp: {
        width: 40,
        height: 40,
        fontSize: 28,
        justifyContent:'center',
        alignItems:'center',
        borderBottomColor: '#4A4A4A',
        borderBottomWidth: 2,
        marginRight: 5,
        marginLeft: 5,
    },
})