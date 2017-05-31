/**
 * Created by huzeyin on 2017/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    TextInput,
    View,
} from 'react-native';

var Util = require("./util");

module.exports = React.createClass({
    render(){
        return (
            <View style={styles.flex_1}>
                <TextInput style={[styles.flex_1, styles.input]} underlineColorAndroid={"transparent"} {...this.props}/>
            </View>
        )
    }
});
var styles = StyleSheet.create({
    flex_1: {
        flex: 1
    },
    input: {
        borderWidth: Util.pixel,
        height: 40,
        borderColor: "#DDDDDD",
        paddingLeft: 5,
    }
});