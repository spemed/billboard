import React, { Component } from 'react'
import ActivityApi from "../../api/activity"
import EmptyShow from '../../components/emptyShow'
import Container from '../../components/container'
import TaskList from '../../components/taskList'
import {StatusBar} from 'react-native'
export default class CompletedRecord extends Component {
    constructor(props) {
        super(props)
        this.state = {
            activities : [],
            refreshing:true,
        }
    }

    async componentDidMount() {
        const {status,message,data} = await ActivityApi.userCompleted()
        if(status !== 0) {
            alert(message)
            return 
        }
        this.setState({
            activities:data.activities,
            refreshing:false,
        })
    }

    async refresh() {
        try {
          let response = await activityApi.userCompleted()
          const { status, message, data } = response
          if (status !== 0) {
            alert(message)
            return 
          }
          this.setState({
            activities:data.activities,
            refreshing:false,
          })
        } catch (err) {
           console.log(err)
         }
      }
    
      onPressHandle(id) {
        const { navigate } = this.props.navigation
        navigate('ActivityDetail', {taskId: id})
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