import React, {Component} from 'react';
import Enum from "../../constants/enum"
import UserMsgHeader from "../../components/user_msg_header"
import {
  StatusBar, 
  StyleSheet,
  FlatList,
  View,
  Text,
  Image,
  Dimensions
} from 'react-native';

import Container from '../../components/container';
import ActivityApi from '../../api/activity';
import { TouchableOpacity } from 'react-native-gesture-handler';
import network from '../../constants/network';
import timer from '../../utils/timer';

export default class Activity extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activities : [],
      refreshing : true,
    }
  }

  async activityDataLoad() {
    const response = await ActivityApi.completed()
    const { status, message, data } = response
    if (status === Enum.STATUS_CODE.FATAL_ERROR) {
      //抛出异常
      throw new Error(message)
    } else {
      return data.activities.map(item=>{
        if(item.user === null) {
          item.user = {
            'name':"",
            'ptr':"",
          }
        }
        return item
      });
    }
  }

  async componentDidMount() {
    try {
      const activities = await this.activityDataLoad()
      this.setState({
          activities,
          refreshing:false,
      })
    } catch (err) {
      alert(err)
    }
  }

  async refresh() {
    try {
      const activities = await this.activityDataLoad()
      this.setState({
          activities,
          refreshing:false,
      })
    } catch (err) {
      alert(err)
    }
  }

  //视图构造器
  viewItemBuilder(index, item) {
      return (
          <TouchableOpacity style={styles.itemBox}
            onPress={()=>{
               this.props.navigation.navigate('ActivityDetail',{taskId:item.id})
            }}
          >
              <UserMsgHeader
                  ptr={ item.user === null ? "" : network.CDN +item.user.ptr }
                  name={item.user === null ? "" : item.user.name }
                  description={timer.cutDown(item.created_at)}
              />
              <View style={styles.body}>
                  <Text
                      style={{
                          color: "#979B9A",
                          fontSize: 16,
                          paddingVertical:16,
                      }}
                  >
                      {item.description.length >= 20 ? item.description.substring(0,20)+'...' : item.description}
                  </Text>
                  <Image
                      source={{uri:network.CDN + item.activity.background}}
                      style={styles.bodyImage}
                  />
                  <Text
                      style={{
                          backgroundColor: "#F2F9F2",
                          borderRadius: 16,
                          paddingVertical: 5,
                          paddingHorizontal: 10,
                          color: "#9DD39A",
                          textAlign: "center",
                          marginVertical:15,
                      }}>
                      #地点:{item.activity.address}
                  </Text>
              </View>
          </TouchableOpacity>
      )
  }

  render () {
    return (
      <Container style={{
        backgroundColor: "#F1F3F0",
        paddingTop:StatusBar.currentHeight,
      }}>
        <FlatList
            style={styles.container}
            data={
                this.state.activities
            }
            showsVerticalScrollIndicator={false}
            refreshing={this.state.refreshing}
            onRefresh={ () => {
                this.refresh();
            }}
            renderItem={
                ({index,item}) => this.viewItemBuilder(index,item)
            }
        />
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  container: {
      backgroundColor: "#F1F3F0",   
      flexDirection: "column",
  },
  itemBox: {
      flex:1,
      flexDirection:'column',
      backgroundColor: "#FFFFFF",
      marginBottom: 15,
      borderRadius: 10,
      paddingHorizontal:20,
  },
  header: {
      flexDirection: 'row',
      alignItems: "center",
      paddingTop:18,
      paddingBottom:2,
  },
  body: {
      flexDirection:'column',
      alignItems: "flex-start",
  },
  bodyImage: {
      width: Dimensions.get('window').width * 0.7,
      height: 180,
      borderRadius: 12,
  }
});