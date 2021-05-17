import React, { Component } from 'react';
import { View, Text, StyleSheet,FlatList,Image,Dimensions,TouchableOpacity} from 'react-native';
import Tasks from "../../mock/tasks"
import network from "../../constants/network"
import GoodsDetail from "../../pages/goodsDetail"
import Container from "../../components/container"
import AwardsApi from "../../api/awards"
import ActivityApi from "../../api/activity"
import UserApi from "../../api/user"
import EmptyShow from '../../components/emptyShow';

const TASK_CENTER = 0 //任务中心
const EXCHANGE = 1  //兑换好礼

export default class Goto extends Component {
    constructor(props) {
        super(props)
        this.state = {
            businessId:props.navigation.getParam('businessId', 0),
            goods:[],
            tasks:Tasks,
            tab: EXCHANGE, //默认选择第一个元素,
            taskRefreshing:true,
            goodsRefreshing:true,
        }
    }

    /**
     * 刷新任务列表
     */
    async refreshTask() {
        const businessId = this.props.navigation.getParam('businessId', 0)
        response = await ActivityApi.business_activities(businessId)
        if (response.status === Enum.STATUS_CODE.FATAL_ERROR) {
            alert(response.message)
            return 
        }
        const tasks = response.data.task;
        this.setState({
            tasks,
            taskRefreshing:false,
        })
    }

    /**
     *  刷新奖品列表
     */
    async refreshGoods() {
        const businessId = this.props.navigation.getParam('businessId', 0)
        let response = await AwardsApi.awards(businessId)
        let { status, message, data } = response
       
        if (status === Enum.STATUS_CODE.FATAL_ERROR) {
            alert(message)
            return 
        }


        const awards = data.awards
        const goods = []
        let goodsItem = []
        for (let i = 0; i < awards.length / 2; i++) {
            goodsItem[0] = awards[i]
            if (i + 1 < awards.length) {
                goodsItem[1] = awards[i+1]
            }
            goods[i] = goodsItem
        }

        this.setState({
            goods,
            goodsRefreshing:false,
        })
    }

    async componentDidMount() {
        const businessId = this.props.navigation.getParam('businessId', 0)
        let response = await AwardsApi.awards(businessId)
        let { status, message, data } = response
       
        if (status === Enum.STATUS_CODE.FATAL_ERROR) {
            alert(message)
            return 
        }


        const awards = data.awards
        const goods = []
        let goodsItem = []
        for (let i = 0; i < awards.length / 2; i++) {
            goodsItem[0] = awards[i]
            if (i + 1 < awards.length) {
                goodsItem[1] = awards[i+1]
            }
            goods[i] = goodsItem
        }

        response = await ActivityApi.business_activities(businessId)
        if (response.status === Enum.STATUS_CODE.FATAL_ERROR) {
            alert(response.message)
            return 
        }
        const tasks = response.data.task;
  

        response = await UserApi.points(businessId)
        if (response.status === Enum.STATUS_CODE.FATAL_ERROR) {
            alert(response.message)
            return 
        }

        const points = response.data.points
        this.setState({
            tasks,
            goods,
            points,
            goodsRefreshing:false,
            taskRefreshing:false
        })
        
    }

    //任务中心
    task() {
        if(this.state.tab !== TASK_CENTER) {
            return
        }
         
        const { navigate } = this.props.navigation
        return (
            this.state.tasks.length === 0 ? 
            <EmptyShow /> :
            <FlatList
                data={this.state.tasks}
                showsVerticalScrollIndicator={false}
                refreshing={this.state.taskRefreshing}
                onRefresh={ () => {
                   this.refreshTask();
                }}
                renderItem={
                    ({ index, item }) => {
                        return (
                            <TouchableOpacity
                                key = {index}
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingVertical: 20,
                                    paddingHorizontal: 14,
                                    marginBottom: 22,
                                    backgroundColor:"#fff",
                                    borderRadius:10,
                                }}
                                onPress={() => {
                                    navigate('TaskDetail',{taskId:item.id})
                                }}
                            >
                                <View style={{
                                    flexBasis: "55%",
                                    justifyContent: "space-between",
                                }}>
                                    <Text style={{fontSize:16,fontWeight:"bold"}}>{item.title}</Text>
                                    <Text style={{ fontSize: 15 }}>{
                                        item.description.length >= 20 ? item.description.substring(0,20)+"..." : item.description
                                    }</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Text
                                            style={{
                                                backgroundColor: "#F2F9F2",
                                                borderRadius: 16,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                color: "#9DD39A",
                                                textAlign: "center",
                                            }}>
                                            #{item.address}
                                        </Text>
                                    </View>
                                </View>
                                <Image source={{ uri: network.CDN + item.background }} style={{ height:120,width:"40%",borderRadius:10 }}/>
                            </TouchableOpacity>
                        )
                    }
                }
                style={{display:this.state.tab === TASK_CENTER ? "flex":"none"}}
            />
       )
    }
    //奖品兑换
    exchange() {
        if(this.state.tab !== EXCHANGE) {
            return
        }
        return (
            this.state.goods.length === 0 ?
            <EmptyShow /> :
            <FlatList
                data={this.state.goods}
                showsVerticalScrollIndicator={false}
                refreshing={this.state.goodsRefreshing}
                onRefresh={ () => {
                    this.refreshGoods();
                }}
                renderItem={
                    ({index,item}) => this.viewItemBuilder(index,item)
                }
            />
        )
    }
    viewItemBuilder(index, item) {
        return (
            <View style={styles.itemBox} key={index}>
                {
                    item.map((value) => {
                        return (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => this.refs.goods.display(this.state.points,value)}
                            >
                                <Image
                                    source={{ uri: network.CDN + value.ptr }}
                                    style={{
                                        height: 180,
                                        borderRadius:10,
                                    }}
                                />
                                <View style={styles.itemMsg}>
                                    <Text style={styles.title}>{value.name}</Text>
                                    <Text style={styles.description}>{value.description}</Text>
                                    <Text style={styles.points}>💰{value.points}</Text>
                                </View>    
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }

    render() {
        return (
            <Container style={{height:"100%"}}>
                <GoodsDetail
                    navigation = {this.props.navigation}
                    ref='goods'
                />
                <View style={styles.header}>
                    <View style={{ flexDirection: "row",alignItems:"baseline" }}>
                        <Text
                            style={this.state.tab == EXCHANGE ? styles.tabCovers : styles.tab}
                            onPress={() => {
                                if(this.state.tab == EXCHANGE) {
                                    return 
                                }
                                this.setState({ tab: EXCHANGE })
                            }}
                        >
                            兑换好礼
                        </Text>
                        <Text
                            style={this.state.tab == TASK_CENTER ? styles.tabCovers : styles.tab}
                            onPress={() => {
                                if(this.state.tab == TASK_CENTER) {
                                    return
                                }
                                this.setState({ tab: TASK_CENTER })
                            }}
                        >
                            任务中心
                        </Text>
                    </View>
                <Text>💰{this.state.points}</Text>
                </View>
                <View style={styles.body}>
                    {
                        this.exchange()
                    } 
                    {
                        this.task()
                    }
                </View>
            </Container>
       )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#F1F3F0",
        alignItems: "baseline",
        paddingVertical:20,
    },
    body: {
        backgroundColor: "#F1F3F0",
        flexGrow:1,
    },
    itemBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom:22,
    },
    item: {
        flex: 0.48,
        backgroundColor: "#fff",
        borderRadius:10,
    },
    itemMsg: {
        padding: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        paddingBottom:4,
    },
    description: {
        color: "#C3C4C4",
        paddingBottom:6,
    },
    points: {
        color: "#C3E5C1",
        fontWeight: "bold",
        fontSize:18,
    },
    tab: {
        fontSize: 20,
        color: "#C3C4C4",
        marginRight:10,
    },
    tabCovers: {
        fontSize: 20,
        marginRight:10,
        fontWeight:"bold",
    }
})