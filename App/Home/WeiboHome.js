import React, {Component} from "react";
import {
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    FlatList,
    ScrollView
} from "react-native";

import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Icon,
    Title
} from "native-base";

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').HEIGHT;
export default class WeiboHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ischange: true
        };
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left/>
                    <Body>
                        <View style={{flexDirection:'row'}}>
                            <Text>
                                Header
                            </Text>
                            <Text>
                                2333
                            </Text>
                        </View>
                    </Body>
                    <Right>
                        <Button transparent>
                            <Icon name="search"/>
                        </Button>
                        <Button transparent>
                            <Icon name="heart"/>
                        </Button>
                        <Button transparent>
                            <Icon name="more"/>
                        </Button>
                    </Right>
                </Header>

                <ScrollView 
                    horizontal={true}
                    pagingEnabled = {true}
                >
                    <Text style={styles.test}>23333</Text>
                    <Text style={styles.test}>23333</Text>
                </ScrollView>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    test: {
        width:WIDTH,
        height:HEIGHT
    }, 
    test1: {
        flex: 1,
    },
});
