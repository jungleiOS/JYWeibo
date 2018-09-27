import React, {Component} from "react";
import {
    Dimensions,
    StyleSheet,
    View,
    Image,
    TouchableOpacity
} from "react-native";

const WIDTH = Dimensions.get('window').width;

export default class ImageBrowseComponent extends Component {

    renderAllImage = (imageURLList,callback) => {
        if (!imageURLList) return;
        let list = [];
        let url;
        let urlList = [];
        for (let i = 0; i < imageURLList.length; i++) {
            url = imageURLList[i].thumbnail_pic.replace('thumbnail','large');
            urlList.push(url);
        }
        for (let i = 0; i < urlList.length; i++) {
            list.push(
                <TouchableOpacity key={i} onPress={()=>callback(i,urlList)}>
                    <Image 
                        style={styles.imageStye}
                        source={{uri:urlList[i]}}
                    />
                </TouchableOpacity>
            );
        }
        return list;
    }

    render() {
        return(
            <View style={{backgroundColor:this.props.backgroundColor}}>
                <View style={styles.imageBrowseStyle}>
                    {this.renderAllImage(this.props.urlList,this.props.callback)}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBrowseStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        left:12.5,
        width:WIDTH-25.5,
    },
    imageStye: {
        marginLeft: 2.5,
        marginRight: 2.5,
        marginTop: 5,
        marginBottom: 5,
        width:(WIDTH-45)/3,
        height:(WIDTH-45)/3
    }
});