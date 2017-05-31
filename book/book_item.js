/**
 * Created by huzeyin on 2017/5/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

var Util = require("./../common/util")

var bookItem = React.createClass({
    render(){

        var row = this.props.row;

        return (
            <TouchableOpacity style={[styles.row, styles.item, {alignItems: "center"}]} {...this.props}>
                <View style={[styles.center, {width: 80}, {height: 100}]}>
                    <Image style={styles.book_img} source={{uri: row.image}}/>
                </View>
                <View >
                    <View>
                        <Text style={{width: 200}} numberOfLines={1}>{row.title}</Text>
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={[styles.publisher, {width: 200}]}
                              numberOfLines={1}>{row.publisher}</Text>
                    </View>

                    <View style={{marginTop: 10}}>
                        <Text style={[styles.publisher, {width: 200}]}
                              numberOfLines={1}>{row.author}</Text>
                    </View>

                    <View style={[{flexDirection: "row"}, {alignItems: "flex-start"}, {marginTop: 10}]}>
                        <Text style={styles.price}>{row.price}</Text>
                        <Text style={styles.pages}>{row.pages}页</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
})

var styles = StyleSheet.create({

    row: {
        flexDirection: "row"
    },
    item: {
        height: 120,
        borderBottomWidth: Util.pixel,
        marginTop: 5,
        marginBottom: 5,
        borderColor: "#ccc"
    },
    book_img: {
        width: 80,
        height: 100,
        resizeMode: Image.resizeMode.contain
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    content: {
        marginTop: 10,
        marginLeft: 10
    },
    publisher: {
        color: "#a3a3a3",
        fontSize: 13
    },
    price: {
        color: "#2bb2a3",
        fontSize: 16
    },
    pages: {
        marginLeft: 10,
        color: "#a7a0a0"
    }
})
module.exports = bookItem;
