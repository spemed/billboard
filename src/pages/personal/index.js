import React, {Component} from 'react';
import {
  StyleSheet,View,Text,StatusBar,TouchableOpacity
} from 'react-native';
import UserMsgHeader from '../../components/user_msg_header'
import Container from '../../components/container'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Confirm from "../../components/modal/confirm"
import UserStorage from '../../utils/token';
import UserApi from "../../api/user"
import Enum from "../../constants/enum"
import network from '../../constants/network';

export default class Personal extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: "",
      description: "",
      ptr:"",
    }
  }
  async componentDidMount() {
    const response = await UserApi.users()
    const { status, message, data} = response
    const user = data.user
    const { name, ptr, description } = user
    if (status === Enum.STATUS_CODE.FATAL_ERROR) {
        alert(message)
    } else {
        this.setState({
           name,
           ptr,
           description,
        })
    }
  }
  /**
   *  构造视图列表
   */
  listViewBuilder() {
    const {navigate} = this.props.navigation
    return (
      <View>
        <Confirm
          ref="confirm"
          title="注销"
          primaryMsg="确定要退出登录吗?"
          success={async (confirm) => { 
            if (confirm == 1) {
                await UserApi.logout()
                await UserStorage.clear()
                navigate('Login')
              }
          }}
        />
        {
          [
            { icon: "assignment", title: "打卡记录",nextPage:"ActivityCompleted",withoutJump:false },
            { icon: "favorite-border", title: "兑换记录",nextPage:"ExchangeRecord" ,withoutJump:false},
            { icon: "settings", title: "基本信息",nextPage:"Myself" ,withoutJump:false},
            { icon: "bookmark-border", title: "地址管理",nextPage:"Address",withoutJump:false },
            { icon: "exit-to-app", title: "退出登录" ,nextPage:"Exit",withoutJump:true},
          ].map((item,index) => {
            return (
              <TouchableOpacity
                key={index}
                style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}
                onPress={
                   item.withoutJump == false ? () => navigate(item.nextPage) : () => this.refs.confirm.show()
                }
              >
                <View
                  color="red"
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 20
                  }}
                >
                  <MaterialIcons
                      name={item.icon}
                      size={26}
                  />
                  <Text
                    style={{
                      fontWeight: "bold",
                      fontSize: 18,
                      paddingLeft:8,
                    }}
                  >
                      {item.title}
                  </Text>
                </View>
                  <MaterialIcons
                      name={'keyboard-arrow-right'}
                      size={26}
                  />
                </TouchableOpacity>
              )
          })
        }
      </View>
    )
  }
  render () {
    return (
      <Container style={{backgroundColor:"#fff",height:"100%"}}>
        <UserMsgHeader
           ptr={network.CDN + this.state.ptr}
           name={this.state.name}
           description={this.state.description}
        />
        <View style={{flexDirection:"row",justifyContent:"space-around",marginVertical:20}}>
          <View>
            <Text style={styles.itemBox}>15</Text>
            <Text style={styles.itemTitle}>打卡次数</Text>
          </View>
          <View>
            <Text style={styles.itemBox}>15</Text>
            <Text style={styles.itemTitle}>兑换次数</Text>
          </View>
       </View>
        {
          this.listViewBuilder()
        }
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  itemBox: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "bold",
    paddingVertical: 4,
    color:"#343635",
  },
  itemTitle: {
    color:"#c1c6c6"
  }
});