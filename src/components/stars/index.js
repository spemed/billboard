import React, { Component } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
    View,
} from 'react-native';

export default class Stars extends Component {
    constructor(props) {
        super(props)
        this.state = {
            maxStars : this.props.Stars === undefined ? 5 : this.props.Stars
        }
    }
    render() {
        let stars = this.props.stars //当前星数
        if (stars <= 0) {
            stars = 1
        } else if (stars > 5) {
            stars = 5
        }
        let fillStars = new Array(stars)
        let unfillStars = new Array(this.state.maxStars - stars)
        return (
            <View style={{flexDirection:"row"}}>
                {
                    fillStars = fillStars.fill(
                        <MaterialIcons
                            name={'star'}
                            size={16}
                            color={"#67BF64"}
                        />
                    )
                }
                {
                    unfillStars = unfillStars.fill(
                        <MaterialIcons
                            name={'star'}
                            size={16}
                            color={"#EAECEB"}
                        />
                    )
                }
            </View>
        )
    }
}