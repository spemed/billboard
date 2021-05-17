import React, { Component } from 'react'
import {View,Text,StyleSheet,Dimensions} from 'react-native'
import CityPicker from '../../components/cityPicker'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import BottomDraw from "../../components/bottomDraw"
import AddressApi from '../../api/address';
import utils from '../../utils';


export default class AddAddress extends Component {

    constructor(props) {
        super(props)
        this.state = {
            phone:"",
            name:"",
            address:"",
            description:"",
        }
        
    }
    render() {
        return (
            <View style={{height:"100%"}}>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        placeholderTextColor="#A5A5A5" style={styles.inputItem} placeholder="收货人" value={this.state.name}
                        onChangeText={(name)=>this.setState({name:name.trim()})} 
                    />  
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput 
                        keyboardType="numeric" placeholderTextColor="#A5A5A5" style={styles.inputItem} placeholder="手机号码"
                        value={this.state.phone}
                        onChangeText={(phone)=>this.setState({phone:phone.trim()})} 
                    />
                </View>
                <View style={[styles.inputWrapper]}>
                    <TouchableOpacity 
                        style={[styles.inputItem,{flexDirection:"row",alignItems:"center",justifyContent:"space-between"}]}
                        onPress={()=>this.refs.citySelector.show()}
                    >
                        <Text style={this.state.address === "" ? {color:"#A5A5A5"} : {color:"black"}}>
                            {this.state.address === "" ? "所在地区" : this.state.address }
                        </Text>
                        <MaterialIcons 
                            name={"keyboard-arrow-right"}
                            size={26}
                            color="#A5A5A5"
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.inputWrapper}>
                    <TextInput 
                         placeholderTextColor="#A5A5A5" 
                         style={{
                            width:"90%",
                            alignSelf:"center",
                            paddingBottom:60,
                        }} 
                        placeholder="详细地址：如道路，门牌号，小区号，楼栋号，单元室等等"
                        value={this.state.description}
                        onChangeText={(description)=>this.setState({description})} 
                    />
                </View>
                <BottomDraw
                    ref='citySelector'
                    translateY={Dimensions.get('window').height * 0.5}
                    content={<CityPicker onPressHandle={(address)=>{
                        this.setState({address})
                        this.refs.citySelector.hide()
                    }}/>}
                />
                <View style={{flexGrow:1,justifyContent:"flex-end"}}>
                    <TouchableOpacity 
                        style={{paddingVertical:10,backgroundColor:"#68C066"}}
                        onPress={async ()=>{
                         
                            const {name,phone,address,description} = this.state
                        
                            if(name.length === 0) {
                                alert('名称必须填写')
                                return 
                            }

                            if(name.length > 20) {
                                alert('名称不得大于20个字符')
                                return 
                            }

                            if(!utils.isValidPhone(phone)) {
                                alert('请输入合法手机号')
                                return 
                            }

                            if(address.length === 0) {
                                alert('请选择省市区')
                                return 
                            }

                            if(description.length === 0) {
                                alert('具体地址必须填写')
                                return 
                            }

                            if(description.length > 255) {
                                alert('具体地址不得超过255个字符')
                                return 
                            }

                            const response = await AddressApi.add(name,phone,address,description.trim())
                            const {status,message,data} = response
                            if(status != 0) {
                                alert(message)
                                return 
                            }
                            const navigation = this.props.navigation
                            navigation.state.params.afterAddNewRecordSuccessfully(data.address)
                            navigation.goBack();
                        }}
                    >
                        <Text style={{textAlign:"center",color:"#fff",fontSize:16}}>确认</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputWrapper:{
        borderBottomWidth:1,
        borderBottomColor:"#EDEDED",
        backgroundColor:"#fff",
    },
    inputItem:{
        paddingVertical:10,
        width:"90%",
        alignSelf:"center",
    },
})