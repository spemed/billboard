import React, {Component} from 'react';
import {
  View, Image,Text,StyleSheet,TouchableOpacity,Platform,StatusBar
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import Prompt from "../../components/modal/prompt"
import upload from '../../api/upload';
import UserApi from "../../api/user"
import network from '../../constants/network';

export default class Myself extends Component {
    
    constructor(props) {
        super(props)
        this.state = {
            users: {}
        }
    }

    async componentDidMount() {
        this.getPermissionAsync();
        const response = await UserApi.users()
        const { status, message, data } = response
        if (status !== 0) {
            alert(message)
            return 
        } 
        this.setState({
            users:data.user
        })
    }
    
    getPermissionAsync = async () => {
        if (Platform.OS === "ios") {
          const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        }
    }
    
    album = async () => {  
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
         });
    
         if (!result.cancelled) {
            let url = await upload(result.uri)
            if(!url) {
                alert("图片上传失败,请重试!");
                return
            }
            const users = this.state.users
            users.ptr = url
            this.setState({users});

            await UserApi.userSave({ptr:url})
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.item} onPress={()=>this.album()}>
                    <Text>头像</Text>
                    <View style={styles.right}>
                        <Image
                            source={{ uri: network.CDN + this.state.users.ptr }}
                            style={{width:80,height:80,borderRadius:5}}
                        />
                        <MaterialIcons
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                <Prompt
                    ref="prompt"
                    title="请输入新的用户名"
                    success={async (name) => { 
                        const response = await UserApi.userSave({ name })
                        const { status, message } = response
                        if (status !== 0) {
                            alert(message)
                            return 
                        }
                        this.setState({
                            name
                        })
                    }}
                    text={this.state.users.name}
                />
                <TouchableOpacity
                    style={styles.item}
                    onPress={()=>this.refs.prompt.show()}
                >
                    <Text>昵称</Text>
                    <View style={styles.right}>
                        <Text style={{color:"#B3B3B3"}}>{this.state.users.name}</Text>
                        <MaterialIcons 
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.item}
                    onPress={()=>this.refs.prompt.show()}
                >
                    <Text>简介</Text>
                    <View style={styles.right}>
                        <Text style={{color:"#B3B3B3"}}>{this.state.users.description}</Text>
                        <MaterialIcons 
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </TouchableOpacity>
                <View style={styles.item}>
                    <Text>微信</Text>
                    <View style={styles.right}>
                        <Text>已绑定</Text>
                        <MaterialIcons 
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </View>
                <View style={styles.item}>
                    <Text>qq</Text>
                    <View style={styles.right}>
                        <Text>已绑定</Text>
                        <MaterialIcons 
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </View>
                <View style={styles.item}>
                    <Text>手机号</Text>
                    <View style={styles.right}>
                        <Text>已绑定</Text>
                        <MaterialIcons 
                            size={26}
                            name="keyboard-arrow-right"
                            style={styles.icon}
                        />
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: "#FAFAFA",
        paddingLeft: 10,
        backgroundColor: "white",
    },
    right: {
        flexDirection: "row",
        alignItems:"center",
    },
    icon: {
        color:"#EEEEEE",
    }
})