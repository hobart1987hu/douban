/**
 * Created by huzeyin on 2017/5/25.
 */
/**
 * Created by huzeyin on 2017/5/25.
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    ListView,
    RefreshControl,
    Image,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';


var Util = require("./../common/util")
var ServiceURL = require("./../common/service")
var Search = require("./../common/search")
var WebView = require("./../common/webview")


var music = React.createClass({

    getInitialState: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        return {
            isRefreshing: false,
            show: false,
            dataSource: ds.cloneWithRows([]),
            keyWords: "Love"
        }
    },
    componentDidMount: function () {
        this.getData()
    },
    getData: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        })
        var that = this
        that.setState({
            show: false,
            isRefreshing: true
        })
        var baseUrl = ServiceURL.music_search + "?q=" + this.state.keyWords + "&count=10"
        Util.get(baseUrl, function (data) {
            if (!data.musics || !data.musics.length) {
                that.setState({
                    isRefreshing: false
                })
                return alert("音乐服务出错！")
            }
            var musics = data.musics
            that.setState({
                isRefreshing: false,
                show: true,
                dataSource: ds.cloneWithRows(musics),
            })
        }, function (error) {
            that.setState({
                isRefreshing: false
            })
            alert(error)
        })
    },
    _changeText: function (value) {
        this.setState({
            keyWords: value
        })
    },
    _search: function () {
        this.getData()
    },
    _goDouBan: function (title, url) {
        this.props.navigator.push({
            component: WebView,
            passProps: {
                backName: "音乐",
                title: title,
                url: url
            }
        })
    },
    _renderRow: function (row) {
        return (
            <View style={styles.item}>
                <View style={styles.center}>
                    <Image style={styles.img} source={{uri: row.image}}/>
                </View>
                <View style={styles.row}>
                    <Text style={[styles.flex_1, {marginLeft: 20}]} numberOfLines={1}>
                        曲目：{row.title}
                    </Text>
                    <Text style={styles.textWidth} numberOfLines={1}>
                        演唱：{row.autor}
                    </Text>
                </View>

                <View style={styles.row}>
                    <Text style={[styles.flex_1, {marginLeft: 20}]} numberOfLines={1}>
                        时间：{row.attrs["pubdate"]}
                    </Text>
                    <Text style={styles.textWidth} numberOfLines={1}>
                        评分：{row["rating"]["average"]}
                    </Text>
                </View>
                <View style={styles.center}>
                    <TouchableOpacity style={[styles.goDou, styles.center]}
                                      onPress={this._goDouBan.bind(this, row.title, row.mobile_link)}>
                        <Text>详情</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    },
    _onRefresh: function () {
        this.getData();
    },
    render(){
        return (
            <View style={styles.flex_1}>
                <View style={[styles.search, styles.row]}>
                    <View style={[styles.flex_1, {marginTop: 0}]}>
                        <Search placeholder="请输入歌曲/歌手名称" onChangeText={this._changeText}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this._search}>
                        <Text style={styles.fontFF}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ?
                        <ListView
                            dataSource={this.state.dataSource}
                            renderRow={this._renderRow}
                            initialListSize={10}
                            refreshControl={
                                <RefreshControl refreshing={this.state.isRefreshing}
                                                onRefresh={this._onRefresh}
                                                title={"正在加载数据..."}
                                                colors={['#ff0000', '#00ff00', '#0000ff']}/>
                            }
                        />
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
    search: {
        paddingLeft: 5,
        paddingRight: 5,
        height: 45,
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
        width: 70,
        height: 70,
        borderRadius: 35
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    item: {
        marginTop: 10,
        borderBottomWidth: Util.pixel,
        borderColor: "#ddd",
        paddingTop: 10,
        paddingBottom: 10
    },
    textWidth: {
        width: 120
    },
    goDou: {
        height: 35,
        width: 60,
        borderColor: "#3082ff",
        borderRadius: 3
    }
})

module.exports = music;
