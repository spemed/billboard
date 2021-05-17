import React, { Component } from 'react'
import { View, StyleSheet,Text,StatusBar,Image} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import OrderApi from "../../api/order"
import timer from '../../utils/timer';
import network from '../../constants/network';

const ALL = 0;//全部
const WATITING = 1;//待发货
const DELIVERING = 2;//配送中
const COMPLETED = 3;//配送完成

export default class ExchangeRecord extends Component {

    constructor(props) {
        super(props)
        this.state = {
            waiting:[],
            delivering:[],
            completed:[],
            order : [],
            all:[],
            refreshing:true,
            tab:0,
        }
    }

    async componentDidMount() {
        const {status,message,data} = await OrderApi.order()
        if(status !== 0) {
            alert(message)
            return 
        }

        const order = data.order
        const waiting = []
        const delivering = []
        const completed = []

        for(let item of order) {
           if(item.status === WATITING) {
                waiting.push(item)
           } else if(item.status === DELIVERING) {
                delivering.push(item)
           } else if (item.status === COMPLETED) {
                completed.push(item)
           }
        }
        this.setState({
            refreshing:false,
            waiting,
            delivering,
            completed,
            order,
            all:order,
        })
    }

    async onRefresh() {
        const {status,message,data} = await OrderApi.order()
        if(status !== 0) {
            alert(message)
            return 
        }
        this.setState({
            refreshing:false,
            order:data.order
        })
    }

    statusToTextDescription(status) {
        if(status === WATITING) {
            return "待发货"
        } else if(status === DELIVERING){
            return "配送中"
        } else if(status === COMPLETED) {
            return "配送完成"
        } else {
            return "异常"
        }
    }

    viewItemBuilder(index,item) {
        return (
            <View style={styles.recordsItem} key={index}>
                <TouchableOpacity 
                    style={styles.itemHeader}
                    onPress={
                        ()=>this.props.navigation.navigate('Goto',{businessId:item.business_id})
                    }
                >
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <Text style={{fontSize:16}}>
                            {item.business.name}
                        </Text>
                        <MaterialIcons 
                            name="keyboard-arrow-right"
                            size={26}
                        />
                    </View>
                    <Text style={{color:"#E04A18",fontSize:16}}>
                        {this.statusToTextDescription(item.status)}
                    </Text>
                </TouchableOpacity>
                <View style={styles.itemBody}>
                    <Image 
                        source={{uri:network.CDN + item.awards.ptr}}
                        style={{
                            width:80,
                            height:80,
                            borderRadius:10,
                        }}
                    />
                    <View style={{flexDirection:"row",justifyContent:"space-between",flexBasis:"73%",}}>
                        <Text style={{fontSize:18}}>
                            {item.awardName}
                        </Text>
                        <View>
                            <Text style={{fontSize:22}}>${item.cost}</Text>
                            <Text style={{textAlign:"right",color:"#B1B1B1",fontSize:20}}>×{item.exchangeNum}</Text>
                        </View>
                    </View>
                </View>
                <Text style={{textAlign:"right"}}>购买时间:{timer.timestampToTime(item.created_at)}</Text>
                <View style={styles.itemFooter}>
                    <TouchableOpacity style={[styles.buttom,styles.buttomSpecial,{display:item.status === WATITING || item.status === COMPLETED ? "none" : "flex"}]}>
                        <Text style={[styles.buttomText,styles.buttomTextSpecial]}>确认收货</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttom,{display:item.status === DELIVERING ? "flex" : "none"}]}>
                        <Text style={styles.buttomText}>查看物流</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttom,{display:item.status === COMPLETED ? "flex" : "none"}]}>
                        <Text style={styles.buttomText}>删除订单</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttom,{display:item.status === WATITING ? "flex" : "none"}]}>
                        <Text style={styles.buttomText}>取消订单</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {
                          [
                            "全部",
                            "待发货",
                            "配送中",
                            "配送完成"
                          ].map((item,index)=>
                            <View 
                                style={styles.topBarItem} 
                                onTouchStart={()=>{
                                    if(index == this.state.tab) {
                                        return
                                    }
                                    let order = [];
                                    if(index === ALL) {
                                        order = this.state.all
                                    } else  if(index === WATITING) {
                                        order = this.state.waiting
                                    } else if(index === DELIVERING) {
                                        order = this.state.delivering
                                    } else if (index === COMPLETED) {
                                        order = this.state.completed
                                    }
                                    this.setState({
                                        tab:index,
                                        order
                                    })
                                }}
                            >
                               <Text style={[styles.topBarItemText,this.state.tab === index ? styles.topBarItemTextCover : {} ]}>
                                  {item}
                                </Text>
                            </View>)
                    }
                </View>
                <View style={styles.body}>
                    <FlatList
                        style={{flex:1}}
                        refreshing={this.state.refreshing}
                        data={this.state.order}
                        onRefresh={ () => {
                            this.onRefresh();
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={
                            ({index,item})=>this.viewItemBuilder(index,item)
                        }
                    />
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:"#F2F2F2",
        marginTop:StatusBar.currentHeight,
        flex:1,
        // paddingBottom:5,
    },
    header:{
        flexDirection:"row",
    },
    topBarItem:{
        flexGrow:1,
        alignItems:"center",
    },
    /**
     * 普通时的样式
     */
    topBarItemText:{
        paddingTop:15,
        paddingBottom:10,
        fontSize:18,
        color:"#5F5E63",
    },
    /**
     * 点击时的样式
     */
    topBarItemTextCover:{
        color:"#BF6123",
        borderBottomWidth:3,
        borderBottomColor:"#E85A12",
    },
    body:{
        width:"92%",
        alignSelf:"center",
        flex:1,
        // backgroundColor:"red"
    },
    recordsItem:{
        backgroundColor:"#fff",
        paddingHorizontal:15,
        borderRadius:8,
        marginTop:15,
    },
    itemHeader:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"space-between",
        paddingTop:10,
        paddingBottom:15,
    },
    itemBody:{
        flexDirection:"row",
        width:"100%",
        justifyContent:"space-between",
    },
    itemFooter:{
        flexDirection:"row",
        justifyContent:"space-around",
    },
    buttom:{
        borderRadius:18,
        borderWidth:1,
        borderColor:"#CBCBCB",
        marginVertical:14,
    },
    buttomSpecial:{
        borderColor:"#C3663B",
    },
    buttomText:{
        fontSize:14,
        paddingVertical:6,
        paddingHorizontal:20,
        color:"#747474",
    },
    buttomTextSpecial:{
        color:"#FF5100",
    }
})