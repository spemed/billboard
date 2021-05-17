import React, { Component } from 'react';
import BottomDraw from "../../components/bottomDraw"
import GoodsDetail from "../../pages/goodsDetail"
import {View,Text,TouchableOpacity} from "react-native"
export default class TestDraw extends Component {
    render() {
        return (
            <View>
                <GoodsDetail
                    ref='goods'
                />
                <View style={{height:40}}></View>
                <TouchableOpacity style={{backgroundColor:"red"}} onPress={()=>this.refs.goods.display()}>
                    <Text style={{textAlign:"center"}}>click</Text>
                </TouchableOpacity>
            </View>
        )
    }
}