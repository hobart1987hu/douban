/**
 * Created by huzeyin on 2017/5/25.
 */

import React from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';


var BtnBack = require("./btn_back");


module.exports = React.createClass({

    _pop: function () {
        this.props.navigator.pop();
    },
    render(){

        var obj = this.props.initObj;

        return (

            <View style={[styles.header, styles.row, styles.center]}>

                <TouchableOpacity style={[styles.row, styles.center]}
                                  onPress={this._pop}>
                    <BtnBack/>
                    <Text style={styles.fontFF}>{obj.backName}</Text>
                </TouchableOpacity>

                <View style={[styles.title, styles.center] }>

                    <Text numberOfLines={1} style={[styles.fontFF, styles.titlePos] }>{obj.title}</Text>
                </View>
            </View>
        )
    }
})

var styles = StyleSheet.create({

    row: {
        flexDirection: "row"
    },
    header: {
        height: 50,
        backgroundColor: "#3497ff"
    },
    fontFF: {
        color: "#fff",
        fontSize: 17,
        fontWeight: "bold"
    },
    title: {
        flex: 1
    },
    titlePos: {
        marginLeft: -20,
        width: 200
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    }


})
