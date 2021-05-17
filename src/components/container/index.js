import React, { Component } from 'react';
import {
    View, Dimensions, StatusBar
  } from 'react-native';
  
export default class Container extends Component {
    render() {
        return (
            <View style={{
                ...this.props.style,
                flexDirection: 'row',
                justifyContent: "center",
                paddingTop:StatusBar.currentHeight,
            }}>
                <View style={{
                    backgroundColor: '#fff',
                    width:Dimensions.get('window').width * 0.8,
                    // backgroundColor: "#F1F3F0",
                }}>
                    {this.props.children}
                </View>
            </View>
        )
    }
}