import React, { Component } from 'react';
import {TouchableOpacity,Text} from "react-native"
export default class Button extends Component  {
    render() {
        return (
            <TouchableOpacity style={
                [{
                    backgroundColor: "#FF6902",
                    paddingVertical: 10,
                    borderRadius: 20,
                    width: "100%",
                 },
                    this.props.style
                ]}>
                <Text style={{ color: "#F3FFEF", textAlign: "center" }}>{this.props.content}</Text>
            </TouchableOpacity>
        )
    }
}