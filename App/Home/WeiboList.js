import React, {Component} from "react";
import {
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    View,
    Image,
    RefreshControl
} from "react-native";

import UserBaseInfo from './UserBaseInfo';
import WeiboContent from './WeiboContent';

import { Network } from '../Common/Network/Network';
import * as SinaAPI from '../Common/Network/SinaWeiboAPI';
import { weiboTime } from '../Common/Global/DateManager';

export default class WeiboList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selected: (new Map()),
            dataSource: [],
            refreshing: true,
            isLoreMoreing: 'LoreMoreing'
        };
        this.page = 1;
    }

    componentDidMount() {

        this.loadData(this.page,(data)=>{
            this.setState({
                dataSource: data.statuses,
                refreshing: false
            });
        });
        
    }

    loadData = (page,callback)=>{
        Token.then((value)=>{
            let params = {'access_token':value,'page':page}
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

    _keyExtractor = (item, index) => item.idstr;

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

    _onRefresh = () => {
        let page = 1;
        this.loadData(page,(data)=>{
            console.log('refresh == '+JSON.stringify(data.statuses));
            this.setState({
                dataSource: tdata.statuses,
                refreshing: false
            });
        })
    }

    renderFooter = () => {
        if (!this.state.dataSource) return null;
        if (this.state.dataSource.length != 0 && this.state.isLoreMoreing == 'LoreMoreing') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'正在加载....'}</Text>
                </View>
            )
        } else if (this.state.isLoreMoreing === 'LoreMoreEmpty') {
            return (
                <View style={{
                    height: 44,
                    backgroundColor: 'rgb(200,200,200)',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Text>{'暂无更多'}</Text>
                </View>
            )
        } else {
            return null
        }
    }

    endLoadMore = () => {
        this.page++;
        this.loadData(this.page,(data)=>{
            let dataSource = this.state.dataSource.concat(data.statuses);
            console.log('loadMore == '+JSON.stringify(data.statuses));
            this.setState({
                dataSource: dataSource,
            });
            if (data.statuses.length < 20) {
                this.setState({
                    isLoreMoreing: 'LoreMoreEmpty'
                });
            }
        })
    }

    render() {
        return (
            <FlatList
                data={this.state.dataSource}
                keyExtractor={this._keyExtractor}
                renderItem={this._renderItem}
                ItemSeparatorComponent={this._itemSeparatorComponent}
                ListFooterComponent={this.renderFooter}
                onEndReachedThreshold={0.1}
                onEndReached={this.endLoadMore}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                        title="Loading..."/>
                }
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
    }
});