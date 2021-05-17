import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
} from 'react-native';
import Container from "../../components/container"
import { TouchableOpacity } from 'react-native-gesture-handler';
import Timer from "../../utils/timer";
import ActivityApi from '../../api/activity';
import network from '../../constants/network';


export default class TaskDetail extends Component {

  constructor(props) {
      super(props)
      this.state = {
          id: props.navigation.getParam('taskId', 0),
          task:{},
          num:0,
          isParty:0,
      }  
  }

  async componentDidMount() {
      const response = await (ActivityApi.signUp(this.state.id))    
      let { status, message, data } = response
      if (status !== 0) {
        alert(message)
        return 
      }
      this.setState({
          task: data.activity,
          num:data.numbers,
          isParty:data.isParty,
      })
  }

  render () {
    const {task,isParty,num} = this.state
    let business = task.business
    return (
        <Container
            style={{
                backgroundColor: "white",
                height:"100%"
            }}
        >
        <View style={styles.header}>
            <Text
                style={{
                    fontSize: 24,
                    fontWeight:"bold",
                }}
            >
                {task.title}
            </Text>
            <View style={{flexDirection:"row"}}>
                <Image
                    source={{ uri:business ? business.image : ""}}
                    style={{
                        height: 60,
                        width: 60,
                        borderRadius: 60,
                        margin:10,
                    }}
                />    
                <View style={{justifyContent:"center"}}>
                    <Text style={{fontSize:22}}>{business ? business.name : ""}</Text>
                <Text style={{color:"#CBCDCC"}}>{Timer.cutDown(task.created_at)}</Text>
                </View>
            </View>
        </View>
        <View style={styles.body}>
            <Text style={{color:"#696969",marginHorizontal:15,fontSize:18}}>{task.description}</Text>   
            <Image
                source={{ uri:network.CDN+  task.background}}
                style={{
                    height: 200,
                    borderRadius: 15,
                    marginHorizontal: 15,
                    marginVertical:10,
                }}
            />    
        </View>    
        <View style={styles.footer}>
                <Text style={styles.footerText}>要求人数：{task.participants}</Text>
                <Text style={styles.footerText}>当前人数：{num}</Text>
                <Text style={styles.footerText}>奖励积分: {task.points}</Text>
                <Text style={styles.footerText}>打卡地点: {task.address}</Text>
                <Text style={styles.footerText}>{Timer.timestampToTime(task.created_at)}</Text>
        </View>
        <View style={styles.statusBar}>
            {
                isParty == true ?         
                <TouchableOpacity disabled style={{
                    backgroundColor: "#5CBA6C",
                    paddingVertical:10,
                    borderRadius:20,
                }}>
                    <Text style={{textAlign:"center",color:"#fff",fontSize:16}}>已报名</Text>
                </TouchableOpacity> :
                num == task.participants ?
                <TouchableOpacity disabled style={{
                    backgroundColor: "#5CBA6C",
                    paddingVertical:10,
                    borderRadius:20,
                }}>
                    <Text style={{textAlign:"center",color:"#fff",fontSize:16}}>人数已满</Text> 
                </TouchableOpacity> :
                <TouchableOpacity            
                    style={{
                        backgroundColor: "#5CBA6C",
                        paddingVertical:10,
                        borderRadius:20,
                    }}
                >
                    <Text style={{textAlign:"center",color:"#fff",fontSize:16}}>报名</Text>
                </TouchableOpacity> 
                
            }
        </View>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
    footer: {
        alignItems:"flex-end",
    },
    statusBar: {
        marginTop:10,
    },
    footerText: {
        marginRight: 15,
        marginVertical: 8,
        fontSize:16
    }
})