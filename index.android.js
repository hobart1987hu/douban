/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
} from 'react-native';
import TabNavigator from './tab_navigator/TabNavigator';


const TabNavigatorItem = TabNavigator.Item;

var Book = require("./book/book_list");
var Music = require("./music/music");
var Movie = require("./movie/movie");
var Navigation = require("./common/navigation")

const TAB_NORMAL_1 = require('./images/book.png');
const TAB_NORMAL_2 = require('./images/movie.png');
const TAB_NORMAL_3 = require('./images/music.png');

const TAB_PRESS_1 = require('./images/book.png');
const TAB_PRESS_2 = require('./images/movie.png');
const TAB_PRESS_3 = require('./images/music.png');

class DouApp extends Component {

    constructor() {
        super();
        this.state = {
            selectedTab: 'book',
        }
    }

    /**
     tab点击方法
     **/
    onPress(tabName) {
        if (tabName) {
            this.setState(
                {
                    selectedTab: tabName,
                }
            );
        }
    }

    /**
     渲染每项
     **/
    renderTabView(title, tabName, isBadge, component) {
        var tabNormal;
        var tabPress;
        switch (tabName) {
            case 'book':
                tabNormal = TAB_NORMAL_1;
                tabPress = TAB_PRESS_1;
                break;
            case 'movie':
                tabNormal = TAB_NORMAL_2;
                tabPress = TAB_PRESS_2;
                break;
            case 'music':
                tabNormal = TAB_NORMAL_3;
                tabPress = TAB_PRESS_3;
                break;
            default:

        }
        return (
            <TabNavigatorItem
                title={title}
                renderIcon={() => <Image style={styles.tabIcon} source={tabNormal}/>}
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={tabPress}/>}
                selected={this.state.selectedTab === tabName}
                selectedTitleStyle={{color: '#f85959'}}
                onPress={() => this.onPress(tabName)}
                renderBadge={() => isBadge ?
                    <View style={styles.badgeView}><Text style={styles.badgeText}>15</Text></View> : null}
            >
                <Navigation component={component}/>
            </TabNavigatorItem>
        );
    }

    /**
     自定义tabbar
     **/
    tabBarView() {
        return (
            <TabNavigator
                tabBarStyle={styles.tab}
            >
                {this.renderTabView('图书', 'book', false, Book)}
                {this.renderTabView('电影', 'movie', false, Movie)}
                {this.renderTabView('音乐', 'music', false, Music)}
            </TabNavigator>
        );
    }


    render() {
        var tabBarView = this.tabBarView();
        return (
            <View style={styles.container}>
                {tabBarView}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    tab: {
        height: 52,
        alignItems: 'center',
        backgroundColor: '#f4f5f6',
    },
    tabIcon: {
        width: 25,
        height: 25,
    },
    badgeView: {
        width: 22,
        height: 14,
        backgroundColor: '#f85959',
        borderWidth: 1,
        marginLeft: 10,
        marginTop: 3,
        borderColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
    },
    badgeText: {
        color: '#fff',
        fontSize: 8,
    }
});


AppRegistry.registerComponent('DouApp', () => DouApp);
