/**
 * Created by huzeyin on 2017/5/25.
 */
import React from 'react';
import {
    WebView,
    View,
} from 'react-native';


var Header = require("./header");
var Util = require("./util");


module.exports = React.createClass({
    render(){
        return (
            <View style={{flex: 1}}>
                <Header navigator={this.props.navigator}
                        initObj={{backName: this.props.backName, title: this.props.title}}/>
                <WebView
                    automaticallyAdjustContentInsets={false}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    contentInset={{top: -40}}
                    startinloadingstate={true}
                    style={{width: Util.size.width, height: Util.size.height - 50}}
                    source={{uri: this.props.url}}
                ></WebView>
            </View>
        )
    }
})

