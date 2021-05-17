import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, DeviceEventEmitter, TouchableOpacity } from 'react-native';
import AddressApi from "../../api/address"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyShow from '../../components/emptyShow';
import Confirm from '../../components/modal/confirm';

export default class Address extends Component {

    constructor(props) {
        super(props)
        this.state = {
            records : [],
        }
        if(props.navigation.state.params === undefined) {
            this.needJump = false
        } else {
            this.needJump = props.navigation.state.params.needJump
        }
        this.selectedIndex = 0
    }

    async componentDidMount() {
        const {status,message,data} = await AddressApi.address()
        if(0 != status) {
            alert(message)
            return  
        }
        this.setState({
            records:data.addresses
        })
    }

    /**
     * 
     * @param {*} index 
     * @param {*} item 
     * 视图构造
     */
    viewItemBuilder(index, item) {
        const navigation = this.props.navigation
        return (
            <TouchableOpacity
                style={styles.addressItem}
                key={index}
                onPress={
                    this.needJump ? () => {
                        navigation.goBack()
                        DeviceEventEmitter.emit("ChooseAddress",this.state.records[index])
                    } : () => {
                        navigation.navigate('ModifyAddress',{address:this.state.records[index],afterModifyNewRecordSuccessfully:this.afterModifyNewRecordSuccessfully.bind(this)})
                    }
                }
                onLongPress={()=>{
                    this.selectedIndex = index
                    this.refs.confirm.show()
                }}
            >
                <View style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginBottom:10,
                }}>
                    <Text style={{fontSize:22}}>{item.name}</Text>
                    <Text style={{fontSize:18}}>{item.phone}</Text>
                </View>
                <Text style={{fontSize:16}}>{item.address + " " + item.description}</Text>
            </TouchableOpacity>
        )
    }

    /**
     * add页面添加地址记录成功后
     */
    afterAddNewRecordSuccessfully(address) {
        this.setState({
            records:[address,...this.state.records]
        })
    }

    /**
     * 修改记录成功后
     */
    afterModifyNewRecordSuccessfully(address) {
        this.setState({
            records:this.state.records.map((item)=>{
                if(item.id === address.id) {
                    item.name = address.name
                    item.phone = address.phone
                    item.address = address.address
                    item.description = address.description
                    return item
                }
                return item
            })
        })
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    {/* <Text style={{backgroundColor: "#F2F2F2",paddingVertical:10}}>当前配送至</Text>
                    <View style={{
                        flexDirection: "row", alignItems: "center",marginLeft:10
                    }}>
                        <MaterialIcons
                            size={26}
                            name={'location-on'}
                        />
                        <Text style={{fontSize:18,paddingVertical:6}}>广州市 番禺区 大石街道</Text>
                    </View> */}
                </View>
                <View style={styles.body}>
                    <Text style={{
                            backgroundColor: "#F2F2F2",
                            paddingVertical:10,
                        }}
                    >
                            从我的收货地址中选择
                    </Text>
                    <View style={{flexGrow:1}}>
                        {
                            this.state.records.length === 0 ? 
                                <EmptyShow/> :
                                <FlatList
                                    data={this.state.records}
                                    showsVerticalScrollIndicator={false}
                                    style={{backgroundColor:"#fff",flexGrow:1}}
                                    renderItem={
                                        ({index,item}) => this.viewItemBuilder(index,item)
                                    }
                                />
                        }
                        <TouchableOpacity style={styles.addButtom} >
                            <Text style={{textAlign:"center",fontSize:16,color:"#FFF"}} onPress={()=>{
                                this.props.navigation.navigate('AddAddress', {afterAddNewRecordSuccessfully: this.afterAddNewRecordSuccessfully.bind(this)})
                            }}>
                                添加地址
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/*确认框 */}
                <Confirm
                    ref="confirm"
                    title="删除"
                    primaryMsg="确认删除吗?"
                    success={async (confirm) => { 
                            if (confirm == 1) {
                                const {status,message} = await AddressApi.delete(this.state.records[this.selectedIndex].id)
                                if(0 != status) {
                                    alert(message)
                                    return 
                                }
                                this.setState({
                                    records: [...this.state.records.slice(0,this.selectedIndex),...this.state.records.slice(this.selectedIndex+1,this.state.records.length)] 
                                })
                            }
                        }
                    }
                />
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container:{
        height:"100%",
    },
    header: {
        backgroundColor:"#fff",
    },
    body: {
        flexGrow:1,
    },
    addressItem: {
        width: "90%",
        alignSelf: "center",
        borderBottomWidth: 1,
        borderColor: "#B3B3B3",
        paddingVertical: 10,
    },
    addButtom:{
        backgroundColor:"#68C066",
        justifyContent:"center",
        paddingVertical:10,
    }
})