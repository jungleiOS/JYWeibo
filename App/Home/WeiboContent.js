import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
} from "react-native";
import { white } from "ansi-colors";
import { View } from "native-base";

export default class WeiboContent extends Component {

    component = (str) =>{
        let userReg = new RegExp('@[\u4e00-\u9fa5a-zA-Z0-9_-]{2,30}','g');
        let topicReg = new RegExp('#[^#]+#','g');
        let linkReg = new RegExp('((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)','g');
        let expressionReg = new RegExp('\\[[0-9a-zA-Z\\u4e00-\\u9fa5]+\\]','g');
        str = this.spacialMatch(userReg,str);
        str = this.spacialMatch(topicReg,str);
        str = this.spacialMatch(linkReg,str);
        str = this.spacialMatch(expressionReg,str);
        return this.generateComponent(str);
    }

    spacialMatch = (regExpStr,str) =>{
        let matchList = str.match(regExpStr);
        let i = 0;
        str = str.replace(regExpStr,()=>{
            let str = '〆'+matchList[i]+'〆';
            i++;
            return str;
        });
        return str;
    }

    generateComponent = (str) => {
        let testReg = new RegExp('〆[^〆]+〆','g');
        let list = str.match(testReg);
        let splitList = str.split(testReg);
        let componentList = [];
        let index = 0;
        for (let i = 0; i < splitList.length; i++) {
            let temp;
            temp = (
                <Text style={styles.des2} key={index}>{splitList[i]}</Text>
            );
            index = index + 1;
            componentList.push(temp);
            if (!list) break;
            if (list[i]){
                let des = list[i];
                des = des.slice(1);
                des = des.substring(0, des.length - 1);
                temp = (
                    <Text key={index} style={styles.des}>{des}</Text>
                );
                componentList.push(temp);
            }
            index = index + 1;
        }
        return componentList;
    }

    render() {
        return(
            <View style={{backgroundColor:this.props.backgroundColor}}>
                <Text style={styles.text}>
                    {this.component(this.props.text)}
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    text: {
        textAlign: 'left',
        marginTop: 8,
        marginBottom: 8,
        left:13,
        width:Dimensions.get('window').width-26,
    },
    des:{
        color: '#0385d2'
    },
    des2:{
        color:'black'
    }
});