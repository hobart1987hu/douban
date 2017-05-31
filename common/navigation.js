/**
 * Created by huzeyin on 2017/5/25.
 */
import React from 'react';
import  NavigationExperimental from "react-native-deprecated-custom-components";
import {
    View,
} from 'react-native';

module.exports = React.createClass({
    render(){
        return (
            <NavigationExperimental.Navigator
                initialRoute={{component: this.props.component}}
                configureScene={() => {
                    return NavigationExperimental.Navigator.SceneConfigs.FloatFromRight;
                }}
                renderScene={(route, navigator) => {
                    const Component = route.component;
                    return (
                        <View style={{flex: 1}}>
                            <Component navigator={navigator}
                                       route={route} {...route.passProps}/>
                        </View>
                    )
                }}
            >
            </NavigationExperimental.Navigator>
        )
    }
})