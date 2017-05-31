/**
 * Created by huzeyin on 2017/5/25.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    Image,
    View,
    ListView,
    TouchableOpacity,
    ActivityIndicator,
} from 'react-native';

var Util = require("./../common/util")
var ServiceURL = require("./../common/service")
var WebView = require("./../common/webview")
var Search = require("./../common/search")


var movie = React.createClass({

    getInitialState: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        return {
            show: false,
            dataSource: ds.cloneWithRows([]),
            keyWords: "幸福"
        }
    },

    componentDidMount: function () {
        this.getData()
    },

    getData: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        var that = this;
        var baseUrl = ServiceURL.movie_search + "?count=10&q=" + this.state.keyWords;
        that.setState({
            show: false
        })
        Util.get(baseUrl, function (data) {
            if (!data.subjects || !data.subjects.length) {
                return alert("电影服务出错！")
            }
            var subjects = data.subjects;
            that.setState({
                dataSource: ds.cloneWithRows(subjects),
                show: true
            })
        }, function (error) {
            alert(error)
        })
    },
    _goDouBan: function (title, url) {
        this.props.navigator.push({
            component: WebView,
            passProps: {
                backName: "电影",
                title: title,
                url: url
            }
        })
    },
    _renderRow: function (row) {
        var casts = row.casts;
        var names = [];
        for (var i in casts) {
            names.push(casts[i].name)
        }
        return (
            <View style={[styles.row, styles.item]}>
                <View>
                    <Image style={styles.img} source={{uri: row.images.medium} }/>
                </View>

                <View>
                    <Text style={styles.textWidth} numberOfLines={1}>名称：{row.title}</Text>
                    <Text style={styles.textWidth} numberOfLines={1}>演员：{names}</Text>
                    <Text style={styles.textWidth} numberOfLines={1}>评分：{row.rating.average}</Text>
                    <Text style={styles.textWidth} numberOfLines={1}>时间：{row.year}</Text>
                    <Text style={styles.textWidth} numberOfLines={1}>标签：{row.genres}</Text>
                    <TouchableOpacity style={styles.goDou} onPress={this._goDouBan.bind(this, row.title, row.alt)}>
                        <Text>详情</Text>
                    </TouchableOpacity>

                </View>
            </View>
        )
    },
    _changeText: function (value) {
        this.setState({
            keyWords: value
        })
    },
    _search: function () {
        this.getData()
    },
    render(){
        return (
            <View style={[styles.flex_1, styles.center]}>
                <View style={[styles.search, styles.row]}>
                    <View style={[styles.flex_1, {marginTop: 0}]}>
                        <Search placeholder="请输入电影名称" onChangeText={this._changeText}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this._search}>
                        <Text style={styles.fontFF}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ?
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}/>
                        : <ActivityIndicator
                        size="large"
                        color="red"
                        style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#F5FCFF'
                        }}
                    />
                }
            </View>

        )
    }
})


var styles = StyleSheet.create({

    flex_1: {
        flex: 1,
        marginTop: 5
    },
    center: {
        justifyContent: "center"
    },
    search: {
        paddingRight: 5,
        paddingLeft: 5,
        height: 45
    },
    btn: {
        width: 45,
        backgroundColor: "#0091ff",
        justifyContent: "center",
        alignItems: "center"
    },
    fontFF: {
        color: "#fff"
    },
    row: {
        flexDirection: "row"
    },
    img: {
        width: 80,
        height: 110,
        resizeMode: Image.resizeMode.contain
    },
    textWidth: {
        width: 200,
        marginLeft: 10
    },
    item: {
        marginTop: 10,
        height: 180,
        paddingTop: 15,
        paddingLeft: 10,
        borderBottomWidth: Util.pixel,
        borderColor: "#ddd"
    },
    goDou: {
        justifyContent: "center",
        alignItems: "center",
        height: 32,
        width: 60,
        borderWidth: Util.pixel,
        borderColor: "#3c9bfd",
        marginLeft: 30,
        marginTop: 10,
        borderRadius: 3
    }

})

module.exports = movie;
