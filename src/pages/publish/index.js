import React, { Component } from 'react';
import { View,Text, TextInput, StyleSheet,TouchableOpacity,Image } from "react-native"
import DashedLine from "../../components/dashedLine"
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import ActivityApi from '../../api/activity';
import upload from '../../api/upload';
import network from '../../constants/network';

export default class Publish extends Component {

    constructor(props) {
        super(props)
        this.state = {
            id:props.navigation.getParam('taskId', 0),
            title: "",
            content: "",
            selectedImage:"",
        }
        console.log(props.navigation.getParam('taskId', 0))
    }

    componentDidMount() {
        this.getPermissionAsync();
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
            this.setState({ selectedImage: url});
        }
    }

    imageBuilder() {
        console.log(network.CDN + this.state.selectedImage)
        return (
            <TouchableOpacity onPress={()=>this.album()} style={{flexGrow: 1}}>
                <Image
                    source={{ uri:network.CDN + this.state.selectedImage }}
                    style={styles.imageShower}
                />
            </TouchableOpacity>
        )
    }

    selectedBoxBuilder() {
        return (
            <TouchableOpacity
                style={styles.imagePickerBox}
                onPress={() => this.album()}
            >
                <MaterialIcons
                    name="add"
                    size={60}
                    style={{ color: "#B1B1B1", }}
                />
            </TouchableOpacity> 
        )
    }

    //提交操作
    async publish() {
        let { id,title, content, selectedImage } = this.state
        title = title.trim()
        content = content.trim()
        if (title === "") {
            alert("标题不得为空");
            return
        }
        if (content === "") {
            alert("正文内容不得为空");
            return
        }
        if (selectedImage === "") {
            alert("请上传打卡图片");
            return
        }
        try {
            const response = await ActivityApi.publish(id,title, content, selectedImage)
            const { status, message } = response
            if (status !== 0) {
                alert(message)
                return
            }
            alert(message)
            this.props.navigation.state.params.updateAfterPublish()
            this.props.navigation.navigate('SignUp')
        } catch (err) {
            alert(err)
        }
    }
    
    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.header}
                    value={this.state.title}
                    placeholder="请输入标题"
                    //autoFocus
                    placeholderTextColor="#B1B1B1"
                    onChangeText={(title) => {
                        this.setState({ title })
                    }}
                />
                <DashedLine backgroundColor='#D5D5D5' len={22} />
                <View style={styles.body}>
                    <TextInput
                        style={styles.content}
                        value={this.state.content}
                        placeholder="请输入正文"
                        placeholderTextColor="#B1B1B1"
                        multiline={true}
                        textAlignVertical="top"
                        onChangeText={(content) => {
                            this.setState({ content })
                        }}
                    />
                    {
                         this.state.selectedImage === "" ? this.selectedBoxBuilder() : this.imageBuilder()
                    }
                </View>
                <View style={{flexGrow:1,justifyContent:"center"}}>
                    <TouchableOpacity style={{
                        alignItems: 'center',
                        width: "100%",
                        backgroundColor: "#F1887A",
                        borderRadius:5,
                    }}
                        onPress={
                            ()=>this.publish()
                        }
                    >
                        <Text style={{paddingVertical:8,fontSize:16,color:"#fff"}}>发布</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#fff",
        height: "100%",
        paddingHorizontal:"5%",
    },
    header: {
        paddingVertical: 10,
        fontSize: 20,
    },
    body: {  
        // flexGrow: 1,
        flexBasis:"80%",
        //backgroundColor:"green",
    },
    content: {
        marginTop: 10,
        fontSize: 16,
        flexBasis: "65%",
       // flex:10,
        //backgroundColor:"red",
    },
    imageShower: {
        flexGrow: 1,
        borderRadius:10,
    },
    imagePickerBox: {
        backgroundColor: "#F8F8F8",
        alignItems: "center",
        flexGrow: 1,
        justifyContent: "center",
    }
})