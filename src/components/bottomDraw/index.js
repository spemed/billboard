import React, { Component } from 'react';
import {
    View,Animated,Modal,ScrollView,TouchableOpacity,StyleSheet,Text
} from 'react-native';
  
export default class BottomDraw extends Component {

    constructor(props) { 
        super(props); 
        this.translateY = this.props.translateY === undefined ? 150 : this.props.translateY; 
        this.state = {
            visible: false,
            sheetAnim: new Animated.Value(this.translateY)
        }
        this.cancel = this.cancel.bind(this); 
    }

    /**
     *  Modal为最外层，ScrollView为内容层
     */
    render() { 
        const { visible, sheetAnim } = this.state; 
        return( 
                <Modal 
                    visible={ visible } 
                    transparent={ true } 
                    animationType="none"
                > 
                    <View style={ styles.wrapper } > 
                        <TouchableOpacity style={styles.overlay}  onPress={this.cancel} />
                        <Animated.View 
                            style={[styles.bd, {height: this.translateY, transform: [{translateY: sheetAnim}]}]}> 
                            <ScrollView 
                                // horizontal={ true } 
                                // showsHorizontalScrollIndicator={false}
                            > 
                                {this._renderContainer()} 
                            </ScrollView> 
                        </Animated.View> 
                    </View> 
                </Modal> 
            ) 
    }

    /**
     * 内容布局
     */
    _renderContainer() { 
      const { content } = this.props; 
      return ( 
        <View style={styles.container}> 
          { content } 
        </View> 
      ) 
    }

    /**
     * 展示
     */
    show() { 
        this.setState({visible: true}) 
            Animated.timing(this.state.sheetAnim, { 
                toValue: 0, 
                duration: 750,
        }).start(); 
    }

    /**
     * 隐藏
     */
    hide() { 
        Animated.timing(this.state.sheetAnim, { 
            toValue: this.translateY, 
            duration: 250 
        }).start(({ finished }) => {
            this.setState({ visible: false }) 
        })
    }

    cancel() { 
        this.hide(); 
    }
}
    

const styles = StyleSheet.create({
    wrapper: {
        height: "100%",
        justifyContent: "flex-end",
        backgroundColor: "#323232",
    },
    overlay: {
        flex: 1,
    },
    bd: {
        backgroundColor: "white", 
        borderRadius: 20,
        zIndex:1000,
    },
    container: {
        width: "90%",
        alignSelf: "center",
    }
})