import React, { Component } from 'react';
import {View,Text} from 'react-native';
import Geo from '../../api/geo';


export default class Test extends Component {
  constructor(props) {
    super(props);
    (async function() {
        try {
          const response = await Geo.getCurrentLocation()
          console.log(response)
        } catch (err) {
          alert(err)
        }
    })()
  }
   render() {
      return (
        <View>
          <Text>12312</Text>
        </View>
      )
   }
}
