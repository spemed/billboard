import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import Modal, {
    ModalTitle,
    ModalFooter,
    ModalButton,
  } from 'react-native-modals';

export default class Prompt extends Component  {
      
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
            rawText:props.text === undefined ? "" : props.text,
            text:props.text === undefined ? "" : props.text,
        }
    }
    
    
    /**
     * 展示
     */
    show() { 
        this.setState({
            visible: true
        }) 
    }
      
    /**
     * 隐藏
     */
    hide() {
        let text = this.state.text
        if (this.state.text.length === 0) {
            text = this.state.rawText
        }
        this.setState({
            visible: false,
            text:text.trim()
        }) 
    }
      
    render() {
        return (
            <Modal
                width={0.9}
                visible={this.state.visible}
                rounded
                actionsBordered
                onTouchOutside={() => {
                    this.hide()
                }}
                modalTitle={
                    <ModalTitle
                        title={this.props.title === undefined ? "请输入" : this.props.title}
                        align="left"
                    />
                }
                footer={
                    <ModalFooter>
                    <ModalButton
                        text="取消"
                        bordered
                        onPress={() => {
                            this.hide()
                        }}
                        key="button-1"
                    />
                    <ModalButton
                        text="确定"
                        bordered
                        onPress={() => {
                            const success = this.props.success
                            if (success != undefined) {
                                if (this.state.text.length === 0) {
                                    alert("输入名称不得为空")
                                    return 
                                }
                                success(this.state.text.trim())
                            }
                            this.hide()
                        }}
                        key="button-2"
                    />
                    </ModalFooter>
                }
                >
                <View style={{
                    alignItems:"center",
                }}>
                    <TextInput
                        value={this.state.text}
                        onChangeText={(text) => {
                            this.setState({
                                text
                            })
                        }}
                        style={{
                            backgroundColor: "#fff",
                            marginVertical: 20,
                            width: "92%",
                            paddingBottom:4,
                            borderBottomWidth: 1,
                            borderBottomColor:"#B3B3B3",
                        }}
                        autoFocus
                    />
                </View>
            </Modal>
        )
    }
}