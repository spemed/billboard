import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Image,
    DeviceEventEmitter,
} from "react-native"
import BottomDraw from "../../components/bottomDraw"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import OrderApi from '../../api/order';
import network from '../../constants/network';

export default class GoodsDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //地址详情
            express: {
                id: 0,
                name:"",
                address: "",
                phone:"",
            },
            goods: {
                ptr: "",//图片
                used: 0,//消耗积分
                limit : 10, //限购数量,默认无限制
            },
            nums: 1,//购买数量
            points:0,//当前用户积分
        }
    }

    async componentDidMount() {
        // 这里的`param`可以不写
        this.subscription = DeviceEventEmitter.addListener("ChooseAddress", (express) => {
            this.setState({
                express
            })
            this.refs.purchase.show()
        });
    }
    
    componentWillUnmount() {
        this.subscription.remove();
    }
    
    //增加
    increase() {
        const { limit } = this.state.goods
        let nums = this.state.nums
        if (nums + 1 > limit) {
            return 
        }
        nums++
        this.setState({
            nums
        })
    }

    //减少
    decrease() {
        let nums = this.state.nums
        if (nums - 1 <= 0) {
            nums = 1 
        } else {
            nums--
        }
        this.setState({
            nums
        })
    }

    //购物操作
    async buy(){
        const {nums,points,goods,express} = this.state
        if(nums > goods.limit) {
            alert("购买数目超过限额");
            return 
        }

        if(nums * goods.points > points) {
            alert("积分不足");
            return 
        }
        const {status,message} = await OrderApi.create({
            award_id:goods.id,
            address_id:express.id,
            cost:goods.points,
            exchangeNum:nums,
        }) 
        if(status !== 0) {
            alert(message)
            return 
        }
        alert(message)
        this.refs.purchase.setState({ visible: false })
    }

    viewBuilder() {
        const { navigate } = this.props.navigation
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Image
                        source={{ uri:network.CDN + this.state.goods.ptr }}
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 5,
                            marginRight:10,
                        }}
                    />
                    <View>
                        <Text style={{fontSize:22,marginTop:14,color:"#89C47E"}}>${this.state.goods.points}</Text>
                        <Text style={{color:"#9C9C9C",marginVertical:4}}>库存{this.state.goods.stock}件</Text>
                        {/* <Text style={{color:"#3E4241"}}>配送至番禺</Text> */}
                    </View>
                </View>
                <View style={styles.address}>
                    <Text style={{color:"#00080b"}}>配送区域</Text>
                    <TouchableOpacity
                        style={{ flexDirection: 'row', justifyContent: "space-between" }}
                        onPress={() => {
                            this.refs.purchase.setState({ visible: false })
                            navigate('Address',{needJump:true})
                        }}
                    >
                        <View style={{flexDirection:"row",marginVertical:10}}>
                            <MaterialIcons
                                name={"location-on"}
                                size={28}
                                style={{marginRight:4}}
                            />
                            <Text style={{fontSize:16,alignSelf:"center",color:"#7D7D7D"}}>{this.state.express.address.length === 0 ? "请选择配送地址" : this.state.express.address}</Text>
                        </View>
                        <MaterialIcons
                            style={{alignSelf:"center"}}
                            name={"keyboard-arrow-right"}
                            size={28}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.purchase}>
                    <Text style={{ color: "#00080b" }}>
                        购买数量
                        {
                            this.state.goods.limit != Infinity ? `(限购${this.state.goods.limit}件)` : "" 
                        }
                    </Text>
                    <View style={{flexDirection:"row",alignItems:"center"}}>
                        <MaterialCommunityIcons
                            name={"minus"}
                            size={26}
                            style={{
                                backgroundColor: "#F5F5F5",
                                color:"#C8C8C8",
                            }}
                            onPress={()=>this.decrease()}
                        />
                        <Text style={{
                            backgroundColor: "#F5F5F5",
                            alignSelf: "stretch",
                            textAlignVertical:"center",
                            marginHorizontal: 6,
                            textAlign:'center',
                            paddingHorizontal: 12,
                            color:"#C8C8C8",
                        }}>
                            {this.state.nums}
                        </Text>
                        <MaterialIcons
                            name={"add"}
                            size={26}
                            style={{
                                backgroundColor: "#F5F5F5",
                                color:"#C8C8C8",
                            }}
                            onPress={()=>this.increase()}
                        />
                    </View>
                </View>
                <TouchableOpacity style={{
                        backgroundColor: "#FF6902",   
                        paddingVertical: 10,
                        borderRadius: 20,
                        width: "100%",
                        marginTop:190,
                    }}
                    onPress={()=>this.buy()}
                >
                    <Text style={{  color: "#F3FFEF",textAlign:"center"}}>确定</Text>
                </TouchableOpacity>
            </View>
        )
    }
    display(points,goods) {
        this.setState({
            points,
            goods
        })
        this.refs.purchase.show()
    }
    render() {
        return (
            <BottomDraw
                ref='purchase'
                translateY={Dimensions.get('window').height * 0.75}
                content={this.viewBuilder()}
            />
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 15,
    },
    header: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderColor: "#FAFAFA",
        paddingBottom:10,
    },
    address: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderColor: "#FAFAFA",
    },
    purchase: {
        marginTop: 10,
        paddingBottom:10,
        borderBottomWidth: 1,
        borderColor: "#FAFAFA",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-between",
    }
})