import React, {Component} from 'react';
import {View,Text, Button} from 'react-native';

import Picker from 'react-native-roll-picker'
import cityCode from '../../utils/cityCode'
import { TouchableOpacity, TouchableNativeFeedback } from 'react-native-gesture-handler';

export default class CityPicker extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.rowIndex0 = 0;
        this.rowIndex1 = 0;
        this.rowIndex2 = 0;
    }

    render() {
        return (
            <View>
                <View style = {{height: 225, flexDirection: 'row',marginBottom:40}}>
                    <View style = {{flex: 0.9}}>
                        <Picker 
                            data = {cityCode.CityZoneCode.China.Province}
                            ref = '_Picker0'
                            name = 'name'
                            onRowChange = {index => {
                                this.rowIndex0 = index; 
                                this.rowIndex1 = 0; 
                                this.rowIndex2 = 0; 
                                this.refs._Picker1.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City); 
                                this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[0].Area)}}
                        />
                    </View>
                    <View style = {{flex: 1}}>
                        <Picker 
                            data = {cityCode.CityZoneCode.China.Province[0].City} 
                            ref = '_Picker1'
                            name = 'name'
                            onRowChange = {index => {
                                this.rowIndex1 = index; 
                                this.rowIndex2 = 0; 
                                this.refs._Picker2.setDataSource(cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area)}}
                        />
                    </View>
                    <View style = {{flex: 1}}>
                        <Picker 
                            data = {cityCode.CityZoneCode.China.Province[0].City[0].Area}
                            ref = '_Picker2'
                            name = 'name'
                            onRowChange = {index => this.rowIndex2 = index}
                        />
                    </View>
                </View>
                <Button title="确定" color="#68C066" onPress={()=>this.props.onPressHandle !== undefined && this.props.onPressHandle(
                    cityCode.CityZoneCode.China.Province[this.rowIndex0].name + " " +
                    cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].name + " " +
                    cityCode.CityZoneCode.China.Province[this.rowIndex0].City[this.rowIndex1].Area[this.rowIndex2].name
                )} />
            </View>
        )
    }
}