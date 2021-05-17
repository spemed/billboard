import React, { Component } from 'react'
import {TouchableOpacity,Text} from 'react-native'

export default class HeaderRight extends Component {
    render () {
        return (
            <TouchableOpacity style={{
                marginRight:20,
            }}>
                <Text style={{fontSize:18}}>
                    {this.props.title}
                </Text>
            </TouchableOpacity>
        )
    }
}