/**
 * Created by huzeyin on 2017/5/25.
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';

var Util = require("./../common/util")
var Search = require("./../common/search")
var BookItem = require("./book_item")
var ServiceURL = require("./../common/service")
var BookDetail = require("./book_detail")

var book = React.createClass({

    getInitialState: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow !== newRow
        })
        return {
            dataSource: ds,
            keyWords: "c语言",
            show: false,
            isRefreshing: false
        }
    },
    componentDidMount: function () {
        this.getData();
    },
    getData: function () {
        var ds = new ListView.DataSource({
            rowHasChanged: (oldRow, newRow) => oldRow !== newRow
        })
        var baseURL = ServiceURL.book_search + "?count=10&q=" + this.state.keyWords;
        var that = this;
        this.setState({
            show: false,
            isRefreshing: true
        })
        Util.get(baseURL, function (data) {
            if (!data.books || !data.books.length) {
                that.setState({
                    isRefreshing: false,
                })
                return alert("图书服务出错啦！")
            }
            var books = data.books;
            that.setState({
                isRefreshing: false,
                show: true,
                dataSource: ds.cloneWithRows(books)
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
        this.getData();
    },
    _loadPage: function (id) {
        this.props.navigator.push({
            component: BookDetail,
            passProps: {
                id: id
            }
        })
    },
    _renderRow: function (row) {
        return (
            <BookItem row={row} onPress={this._loadPage.bind(this, row.id)}/>
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
                        < Search placeholder="请输入图书的名称" onChangeText={this._changeText}/>
                    </View>
                    <TouchableOpacity style={styles.btn} onPress={this._search}>
                        <Text style={styles.fontFF}>搜索</Text>
                    </TouchableOpacity>
                </View>
                {
                    this.state.show ?
                        <ListView dataSource={this.state.dataSource}
                                  renderRow={this._renderRow}
                                  initialListSize={10}
                                  refreshControl={
                                      <RefreshControl
                                          onRefresh={this._onRefresh}
                                          refreshing={this.state.isRefreshing}
                                          colors={['#ff0000', '#00ff00', '#0000ff']}
                                          title={"正在加载数据..."}
                                      />
                                  }/> :
                        <ActivityIndicator
                            size="large"
                            color="red"
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#F5FCFF',
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
        height: 45
    },
    btn: {
        width: 50,
        backgroundColor: "#0091ff",
        justifyContent: "center",
        alignItems: "center"
    },
    fontFF: {
        color: "#fff"
    },
    row: {
        flexDirection: "row"
    }
})
module.exports = book;
