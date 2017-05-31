/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    TabBarIOS,
    StatusBar
} from 'react-native';


StatusBar.setHidden(true);

var Book = require("./book/book_list");
var Music = require("./music/music");
var Movie = require("./movie/movie");
var Navigation = require("./common/navigation")

var DouApp = React.createClass({

    getInitialState: function () {
        return {
            selectedTab: "图书"
        }
    },

    render(){
        return (
            <TabBarIOS>
                <TabBarIOS.Item
                    title="图书"
                    selected={this.state.selectedTab === "图书"}
                    icon={require("./module_ios/book.png")}
                    onPress={
                        () => {
                            this.setState({
                                selectedTab: "图书"
                            })
                        }
                    }
                >
                    <Navigation component={Book}/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="电影"
                    selected={this.state.selectedTab === "电影"}
                    icon={require("./module_ios/movie.png")}
                    onPress={
                        () => {
                            this.setState({
                                selectedTab: "电影"
                            })
                        }
                    }
                >
                    <Navigation component={Movie}/>
                </TabBarIOS.Item>

                <TabBarIOS.Item
                    title="音乐"
                    icon={require("./module_ios/music.png")}
                    selected={this.state.selectedTab === "音乐"}
                    onPress={
                        () => {
                            this.setState(
                                {
                                    selectedTab: "音乐"
                                }
                            )
                        }
                    }
                >
                    <Navigation component={Music}/>
                </TabBarIOS.Item>
            </TabBarIOS>
        )
    }
})
AppRegistry.registerComponent('DouApp', () => DouApp);
