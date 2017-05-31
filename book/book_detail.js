/**
 * Created by huzeyin on 2017/5/25.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
    ScrollView,
} from 'react-native';

var Util = require("./../common/util")
var ServiceURL = require("./../common/service")
var Header = require("./../common/header")
var BookItem = require("./book_item")

var bookDetail = React.createClass({

    getInitialState: function () {
        return {
            data: null
        }
    },

    componentDidMount: function () {
        //加载数据
        var id = this.props.id;
        var that = this;
        var url = ServiceURL.book_search_id + "/" + id;
        Util.get(url, function (data) {
            that.setState({
                data: data
            })
        }, function (error) {
            alert(error)
        })
    },

    render(){
        return (
            <ScrollView style={styles.m10}>
                {
                    this.state.data ?
                        <View>
                            <Header navigator={this.props.navigator}
                                    initObj={{
                                        backName: "图书",
                                        title: this.state.data.title
                                    }
                                    }
                            />
                            <BookItem row={this.state.data}/>

                            <View>
                                <Text style={styles.title}>图书简介</Text>
                                <Text style={styles.text}>{this.state.data.summary}</Text>
                            </View>

                            <View>
                                <Text style={styles.title}>作者简介</Text>
                                <Text style={styles.text}>{this.state.data.author_intro}</Text>
                            </View>
                            <View style={{height: 100}}/>
                        </View>
                        : <ActivityIndicator
                        size="large"
                        color="red"
                        style={{
                            flex: 1,
                            marginTop: 20,
                            backgroundColor: '#F5FCFF'
                        }}
                    />
                }

            </ScrollView>
        )
    }
})

var styles = StyleSheet.create({

    m10: {
        flex: 1
    },
    title: {
        fontSize: 16,
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 10
    },
    text: {
        marginLeft: 10,
        marginRight: 10,
        color: "#000d22"
    }


})

module.exports = bookDetail;