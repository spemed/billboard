import React, {Component} from 'react';
import TaskList from "../../components/taskList"
import Container from "../../components/container"
import activityApi from "../../api/activity"
import EmptyShow from '../../components/emptyShow';
import { StatusBar } from 'react-native';
import network from '../../constants/network';
export default class SignUp extends Component {
  constructor(props) {
    super(props)
    this.state = {
       activities:[],
       refreshing:true,
    }
  }

  async componentDidMount() {
    try {
      let response = await activityApi.waiting()
      const { status, message, data } = response
      if (status !== 0) {
        alert(message)
        return 
      }
      const activities = data.activities.map(item=>{
        if(item.activity !== null || item.activity !== undefined) {
           item.activity.background = network.CDN + item.activity.background
        }
        return item
      })
      this.setState({
        activities,
        refreshing:false,
      })
    } catch (err) {
      console.log(err)
     }
  }

  onPressHandle(id) {
    const { navigate } = this.props.navigation
    navigate('Publish', {taskId: id,updateAfterPublish:this.refresh.bind(this)})
  }

  async refresh() {
    try {
      let response = await activityApi.waiting()
      const { status, message, data } = response
      if (status !== 0) {
        alert(message)
        return 
      }
      const activities = data.activities.map(item=>{
        if(item.activity !== null || item.activity !== undefined) {
           item.activity.background = network.CDN + item.activity.background
        }
        return item
      })

      this.setState({
        activities,
        refreshing:false,
      })
    } catch (err) {
       console.log(err)
     }
  }
  
  render() {
    return (
          this.state.activities.length === 0 ? 
          <EmptyShow style={{marginTop:StatusBar.currentHeight}}/>:
          <Container>
              <TaskList
                  navigation={this.props.navigation}
                  tasks={this.state.activities}
                  refreshing={this.state.refreshing}
                  onRefresh={()=>{
                    this.refresh()
                  }}
                  onPressHandle={(id)=>this.onPressHandle(id)}
              />
          </Container>
    )
  }
}