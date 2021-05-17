import React, { Component } from 'react'
import {
    Text, View,Image,StyleSheet
} from 'react-native'

export default class UserMsgHeader extends Component {
    render() {
        return (
            <View style={[styles.header,this.props.style]}>
                <Image
                    source={{uri:this.props.ptr}}
                    style={styles.ptr}
                />
                <View>
                    <Text style={{
                        fontWeight: "bold",
                        fontSize:28,
                    }}>{this.props.name}</Text>
                    <Text style={{
                        color:"#9A9E9E",
                        maxWidth:"90%",
                    }}>{this.props.description}</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        alignItems: "center",
        paddingTop:18,
        paddingBottom:2,
    },
    ptr: {
        width: 50,
        height: 50,
        borderRadius: 50,
        marginRight:18,
    },
  });