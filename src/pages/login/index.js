import React, { Component } from 'react';
import {
    StyleSheet, Text, TextInput,
    View, Dimensions, StatusBar, TouchableOpacity
} from 'react-native';
import User from "../../api/user"
import Utils from '../../utils';
import Enum from "../../constants/enum"
import DeviceStorage from  "../../utils/storage"
import UserStorage from '../../utils/token';
import Geo from '../../utils/geo';

export default class Login extends Component {
    constructor(props) {
        // (async function () {
        //     console.log(await Geo._getLocationAsync())
        // })()
        super(props)
        this.state = {
            tab: 0,
            phone: "",
            password: "",
            rePassword:"",
        }
    }
    changeTab(tab) {
        if (tab == this.state.tab) {
            return 
        }
        this.setState({
            tab,
            phone: "",
            password: "",
            rePassword:"",
        })
    }
    getActivitedTab() {
        if (this.state.tab == 0) {
            return (
                <View style={styles.tab}>
                    <View><Text style={styles.tabFontCover} onPress={()=>this.changeTab(0)}>登录</Text></View>
                    <View><Text style={styles.tabFont} onPress={()=>this.changeTab(1)}>注册</Text></View>
                </View>
            )
        } else {
            return (
                <View style={styles.tab}>
                    <View><Text style={styles.tabFont} onPress={()=>this.changeTab(0)}>登录</Text></View>
                    <View><Text style={styles.tabFontCover} onPress={()=>this.changeTab(1)}>注册</Text></View>
                </View>
            )
        }
    }
    /**
     *  登录操作
     */
    async login() {
        /**
         * 直接跳转
         */
        const {phone,password} = this.state
        if (!Utils.isValidPhone(phone)) {
            alert("请输入11位合法手机号!")
            return 
        }
        try {
            let response = await User.login(phone, password.trim())
            const { status, message, data } = response
            if (status === Enum.STATUS_CODE.FATAL_ERROR) {
                alert(message)
            } else {
                await UserStorage.setUserStorage(data.token)
                this.props.navigation.navigate('StackRouter')
            }
        } catch(e) {
            console.log(e)
            alert("服务端内部错误")
        }
    }

    /**
     * 注册操作
     */
    async register() {
        let {phone,password,rePassword} = this.state
        /**
         * 直接跳转
         */
        if (!Utils.isValidPhone(phone)) {
            alert("请输入11位合法手机号!")
            return 
        }
        if (!password) {
            alert("请输入密码!")
            return 
        }
        if (!rePassword) {
            alert("请确认密码!")
            return 
        }
        if (password != rePassword) {
            alert("两次输入密码不一致!")
            return 
        }
        try {
            let response = await User.register(phone, password.trim(), rePassword.trim())
            const { status, message, data } = response
            if (status != Enum.STATUS_CODE.SUCCESS) {
                alert(message)
            } else {
                const token = data.token
                if (token === undefined) {
                    throw new Error("token签发失败")
                }
                DeviceStorage.save("user", { token })
                this.props.navigation.navigate('StackRouter')
            }
        } catch(e) {
            alert(e) 
        }
    }

    /**
     *  渲染
     */
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}></View>
                {this.getActivitedTab()}
                <View style={styles.loginBar}>
                    <TextInput
                        keyboardType="numeric"
                        placeholder="请输入手机号"
                        style={styles.input}
                        onChangeText={(phone) => {
                            this.setState({
                                phone
                            })
                        }}
                        value={this.state.phone} />
                    <TextInput
                        password
                        placeholder="请输入密码"
                        style={styles.input}
                        secureTextEntry
                        onChangeText={(password) => {
                            this.setState({
                                password
                            })
                        }}
                        value={this.state.password}
                    />
                    <TextInput
                        password
                        placeholder="再次输入密码"
                        style={[styles.input, { display: this.state.tab === 1 ? "flex" : "none" }]}
                        secureTextEntry
                        onChangeText={(rePassword) => {
                            this.setState({
                                rePassword
                            })
                        }}
                        value={this.state.rePassword}
                    />
                </View>
                <View style={styles.loginButtonContainer}>
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.tab === 0) {
                                this.login()
                            } else {
                                this.register();
                            }
                        }}
                        style={styles.loginButton}>
                        <Text style={{ textAlign: "center", color: "white", fontSize: 16 }}>
                            {this.state.tab === 0 ? "登录" : "注册"}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex:1,
      flexDirection:'column',
      backgroundColor: '#fff',
      width: Dimensions.get('window').width * 0.8,
      marginLeft: Dimensions.get('window').width * 0.1,
    },
    header: {
      height: Dimensions.get('window').height * 0.15,
      marginTop: StatusBar.height
    },
    tab: {
        flexDirection: 'row',
    },
    tabFont: {
        fontSize: 18,
        color: "#c1c6c6",
        marginRight:10,
    },
    tabFontCover: {
        fontSize: 28,
        fontWeight:"bold",
        color: "black",
        marginRight: 10,
    },
    loginBar: {
      marginTop:20
    },
    bottom: {
      marginTop:Dimensions.get('window').height * 0.5,
      alignSelf: "center",
    },
    loginButton: {
        backgroundColor: "#68C066",  
        justifyContent: "center",
        borderRadius: 16,
        height: 40,
        width:Dimensions.get('window').width * 0.8,
    },
    loginButtonContainer: {
       marginTop:60,
    },
    input: {
        height: 50,
        borderBottomWidth: 1,
        borderBottomColor: "#C1C6CA",
        marginBottom: 20
    }
  });