/**
 * Created by huzeyin on 2017/5/25.
 */
import React from 'react';
import {
    StyleSheet,
    View,
} from 'react-native';

var Util = require("./util");


module.exports = React.createClass({
    render(){
        return (
            <View>
                <View style={styles.go}/>
            </View>
        )
    },
});


var styles = StyleSheet.create({

    go: {

        borderLeftWidth: 4 * Util.pixel,

        borderBottomWidth: 4 * Util.pixel,

        width: 15,

        height: 15,

        transform: [{rotate: "45deg"}],

        borderColor: "#FFF",

        marginLeft: 10
    }
});
