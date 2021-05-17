import React, {Component} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  StatusBar
} from 'react-native';
import Container from "../../components/container"
import Stars from "../../components/stars"
import Enum from "../../constants/enum"
import BusinessApi from "../../api/business"
import { TouchableOpacity } from 'react-native-gesture-handler';


export default class Merchants extends Component {
  constructor(props) {
    super(props)
    this.state = {
      records : [],
      refreshing:true,
    }
  }
  
  async componentDidMount() {
    const response = await BusinessApi.business()
    const { status, message, data } = response
    if (status === Enum.STATUS_CODE.FATAL_ERROR) {
        alert(message)
        return 
    }
    this.setState({
      records:data.business,
      refreshing:false
    })
  }

  async _onRefresh() {
    const response = await BusinessApi.business()
    const { status, message, data } = response
    if (status === Enum.STATUS_CODE.FATAL_ERROR) {
        alert(message)
        return 
    }
    this.setState({
      records:data.business
    })
  }

  viewItemBuilder(index, item) {
    const {navigate} = this.props.navigation
    console.log(item.image)
    return (
      <View style={styles.container} key={index}>
        <View style={styles.header}>
          <Text style={{
            fontSize: 24,
            fontWeight:"bold",
          }}>{item.name}</Text>
          <Stars stars={item.stars}/>
        </View>
        <View style={styles.body}>
          <Text style={{color:"#C3C4C4",paddingBottom:10}}>{item.description}</Text>
          <View style={{flexDirection:"row",justifyContent:"space-between"}}>
              {/* {
                  item.images.map((item) => {
                    return (
                      // <View style={{flex:1,marginRight:8}}>
                      //     <Image source={{ uri: item }} style={{height:120,borderRadius:14}}/>
                      // </View>
                      <Image source={{ uri: item }} style={{flex:0.3,height:120,borderRadius:14}}/>
                    )
                  })
              } */}
            <Image source={{ uri:item.image }} style={{flex:1,height:160,borderRadius:14}}/>
          </View>
        </View>
        <View style={styles.footer}>
          <View style={styles.msgContainer}>
            <Image source={{ uri: item.ptr }} style={{ width: 40, height: 40, borderRadius: 50 }} />
                <TouchableOpacity style={{
                    borderRadius: 10,
                    backgroundColor:"#56B66F"
                  }}
                  onPress={() => {
                    navigate('Goto',{businessId:item.id})
                  }}
                >
                    <Text style={{textAlign:"center",fontSize:16,paddingVertical:6,paddingHorizontal:15,color:"#fff"}}>进店</Text>
                </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }
  render() {
    return (
      <Container style={{ backgroundColor: "#F1F3F0", paddingTop: StatusBar.currentHeight }}>
        <FlatList
            data={this.state.records}
            style={{
              backgroundColor: "#F1F3F0",
            }}
            refreshing={this.state.refreshing}
            onRefresh={ () => {
              this._onRefresh();
            }}
            showsVerticalScrollIndicator={false}
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
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingHorizontal:20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical:10,
  },
  footer: {
    paddingVertical:20,
  },
  msgContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent:"space-between",
  }
})