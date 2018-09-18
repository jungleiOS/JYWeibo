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
        console.log(Token);
        // 去掉a标签
        // str = str.replace(/(<\/?a.*?>)|(<\/?span.*?>)/g,'');
        // this.loadData((data)=>{
        //     console.log(data);
        //     this.setState({
        //         dataSource:data.statuses
        //     });
        // });
        
    }

    loadData = (callback)=>{
        readData('token',(value)=>{
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
                <WeiboContent/>
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