import React, { Component } from 'react'
import { View, StyleSheet, Text,Image } from 'react-native'
import UserMsgHeader from '../../components/user_msg_header'
import ActivityApi from '../../api/activity'
import Container from '../../components/container'
import network from '../../constants/network'
import timer from '../../utils/timer'

export default class ActivityDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activity:{},
        }
    }

    async componentDidMount() {
        const taskId = this.props.navigation.state.params.taskId
        const {status,message,data} = await ActivityApi.detail(taskId)
        if(status !== 0) {
            alert(message)
            return 
        }
        const activity = data.activity
        this.setState(
            activity,
        )
    }

    render() {
        const {background,created_at,title,description,user} = this.state
        return (
            <Container style={{backgroundColor:"#fff",height:"100%"}}>
                <UserMsgHeader 
                    ptr={user ? network.CDN + user.ptr : ""}
                    name={user ? user.name : ""}
                    description={user ? user.description : ""}
                />
                <View style={styles.article}>
                    <Text style={styles.header}>
                        {title}
                    </Text>
                    <Text style={styles.content}>
                        {description}
                    </Text>
                    <View>
                        <Image
                            style={{
                                height:200,
                                borderRadius:15,
                            }}
                            source={{uri:network.CDN + background}} 
                        />
                    </View>
                </View>
                <View style={styles.footer}>
                    <Text style={{textAlign:"right"}}>发布时间: {timer.timestampToTime(created_at)}</Text>
                </View>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    article:{
        marginTop:20,
    },
    content:{
        marginTop:10,
        fontSize:18,
        flexBasis:"40%",
    },
    header:{
        textAlign:"left",
        fontSize:30,
        fontWeight:"bold"
    },
    footer:{
        marginTop:15,
    }
})