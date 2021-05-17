import React, { Component } from 'react'
import {
    FlatList, Text, View, Dimensions,Image,StyleSheet,StatusBar
} from 'react-native'
import Images from '../../constants/images'
import Mock from '../../mock/activity'
import UserMsgHeader from '../user_msg_header'

export default class Record extends Component {
    constructor(props) {
        super(props)
        this.state = {
            records : props.records
        }        
    }
}

