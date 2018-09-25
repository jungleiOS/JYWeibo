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

    renderAllImage = (imageURLList) => {
        if (!imageURLList) return;
        let list = [];
        for (let i = 0; i < imageURLList.length; i++) {
            list.push(
                <TouchableOpacity key={i} onPress={()=>this.porps.callback(i)}>
                    <Image 
                        style={styles.imageStye}
                        source={{uri:imageURLList[i].thumbnail_pic}}
                    />
                </TouchableOpacity>
            );
        }
        return list;
    }

    render() {
        return(
            <View style={styles.imageBrowseStyle}>
                {this.renderAllImage(this.props.urlList)}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    imageBrowseStyle: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        left:10,
        width:WIDTH-30,
    },
    imageStye: {
        marginLeft: 5,
        marginTop: 5,
        width:(WIDTH-30)/3-5,
        height:(WIDTH-30)/3-5
    }
});