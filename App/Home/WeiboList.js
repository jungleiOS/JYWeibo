import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Image
} from "react-native";

import UserBaseInfo from './UserBaseInfo';
import WeiboContent from './WeiboContent';

import { Network } from '../Common/Network/Network';
import * as SinaAPI from '../Common/Network/SinaWeiboAPI';
import { readData } from '../Common/Storage/Storage';
import { weiboTime } from '../Common/Global/DateManager';

export default class WeiboList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: (new Map()),
            dataSource: []
        };
    }

    componentDidMount() {
        let str = '我算#233# @2333 [拳头] #乱起八强# @233333 https://www.jianshu.com/p/cca5519a9367 @大 啊大 #阿斯顿# 啊 https://www.jianshu.com/p/cca5519a9367';
        let userReg = new RegExp('@[0-9a-zA-Z\\u4e00-\\u9fa5]+','g');
        let topicReg = new RegExp('#[^#]+#','g');
        let linkReg = new RegExp('((http[s]{0,1}|ftp)://[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)|(www.[a-zA-Z0-9\\.\\-]+\\.([a-zA-Z]{2,4})(:\\d+)?(/[a-zA-Z0-9\\.\\-~!@#$%^&*+?:_/=<>]*)?)','g');
        let expressionReg = new RegExp('(\[[0-9a-zA-Z\u4e00-\u9fa5]+\])','g');
        str = this.spacialMatch(userReg,str);
        str = this.spacialMatch(topicReg,str);
        str = this.spacialMatch(linkReg,str);
        str = this.spacialMatch(expressionReg,str);
        // let testReg = new RegExp('(?<=\<Text\>).*(?=\</Text\>)','g');
        // let list = str.match(testReg);
        // console.log(list);
        
        // let result = reg.exec(str);
        // console.log('result = '+result[1]);
        // let list = str.match(reg);
        // console.log('list ==  '+list+' list.length == ' + list.length);
        // this.loadData((data)=>{
        //     console.log(data);
        //     this.setState({
        //         dataSource:data.statuses
        //     });
        // });
        
    }

    spacialMatch = (regExpStr,str) =>{
        let matchList = str.match(regExpStr);
        let i = 0;
        str = str.replace(regExpStr,()=>{
            return '<Text>'+matchList[i]+'</Text>';
        });
        return str;
    }

    loadData = (callback)=>{
        Token.then((value)=>{
            let params = {'access_token':value}
            Network.get(SinaAPI.home_timeline,params,(data) => callback(data));
        });
    }

    _onPressItem = (id) => {
        this.setState((state) => {
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return {selected};
        });
    };

    _keyExtractor = (item, index) => item.id.toString();

    _renderItem = ({item}) => (
        <MyListItem
            item={item}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item.id)}
        />
    );

    _itemSeparatorComponent = () => {
        return(
            <View style={{
                height:8,
                backgroundColor:'#eeeeee',
                width:Dimensions.get('window').width
            }}/>
        );
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._itemSeparatorComponent}
            />
        );
    }
}

class MyListItem extends React.PureComponent {

    _onPress = () => {
        this.props.onPressItem(this.props.item.id);
    };
    
    componentDidMount() {

    }

    render() {
        
        return (
            <View>
                <UserBaseInfo
                    avatar_hd = {this.props.item.user.avatar_hd}
                    name = {this.props.item.user.name}
                    time = {weiboTime(this.props.item.created_at)}
                    tail = {this.props.item.source.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g,'')}
                />
                <WeiboContent
                    text = {this.props.item.text}
                />
                <View style={styles.additionalInfo}>
                    <TouchableOpacity style={styles.tag}>
                        <Image 
                            source={require('../Source/Image/share.png')}
                            style={styles.icon}
                        />
                        <Text>{this.props.item.reposts_count}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Image 
                            source={require('../Source/Image/comment.png')}
                            style={styles.icon}
                        />
                        <Text>{this.props.item.comments_count}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.tag}>
                        <Image 
                            source={require('../Source/Image/like.png')}
                            style={styles.icon}
                        />
                        <Text>{this.props.item.attitudes_count}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    additionalInfo: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems: 'center',
        height:36
    },
    tag: {
        flexDirection:'row',
        justifyContent:'space-around',
        width:64
    },
    icon: {
        width:20,
        height:20
    },
});