import React, { Component } from 'react';
import {
    View,Text
} from 'react-native';
  
export default class EmptyShow extends Component {
    render() {
        return (
            <View style={[{paddingVertical:20},this.props.style]}>
                <Text style={{textAlign:"center",color:"#999999",fontSize:18}}>
                    {this.props.content === undefined ? "空空如也~" : this.props.content}
                </Text>
            </View>
        )
    }
}