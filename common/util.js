/**
 * Created by huzeyin on 2017/5/25.
 */

import React, {Component} from 'react';
import {
    ActivityIndicator,
    PixelRatio,
    Dimensions
} from 'react-native';

var Util = {

    pixel: 1 / PixelRatio.get(),

    size: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height
    },
    /**
     * 基于FETCH的GET方法
     * */
    get: function (url, successCallback, failCallback) {
        fetch(url)
            .then((response) => response.text())
            .then((responseText) => {
                successCallback(JSON.parse(responseText));
            })
            .catch(function (error) {
                failCallback(error)
            });
    },
    loading: function () {
        return <ActivityIndicator
            size={75}
            color="red"
            style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#F5FCFF'}}/>
    }
}
module.exports = Util

