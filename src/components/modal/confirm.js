import React, { Component } from 'react';
import { Text,View } from 'react-native'
import Modal, {
    ModalTitle,
    ModalFooter,
    ModalButton,
  } from 'react-native-modals';


const ACCEPT = 1 //确认  
const REFUSE = 2  //拒绝

export default class Confirm extends Component  {
    constructor(props) {
        super(props)
        this.state = {
            visible: false,
        }
    }
    /**
     * 显示弹窗
     */
    show() {
        this.setState({
            visible:true,
        })
    }
    /**
     * 隐藏弹窗
     */
    hidden(handle = null) {
        if (handle != null && typeof(handle) === "function") {
            handle();
        }
        this.setState({
            visible: false,
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
                    this.hidden()
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
                            style={{
                                color:"red"    
                            }}
                            onPress={() => {
                                const success = this.props.success 
                                if (success != undefined) {
                                    success(REFUSE)
                                }
                                this.hidden()
                            }}
                            key="button-1"
                        />
                        <ModalButton
                            text="确定"
                            bordered
                            onPress={() => {
                                const success = this.props.success 
                                if (success != undefined) {
                                    success(ACCEPT)
                                }
                                this.hidden()
                            }}
                            key="button-2"
                        />
                </ModalFooter>
            }
          >
            <View
                style={{
                    backgroundColor: '#fff',
                    width:"90%",
                    alignSelf: "center",
                }}
            >
                <Text style={{
                    fontSize: 16,
                }}>
                    {this.props.primaryMsg === undefined ? "" : this.props.primaryMsg}
                </Text>
                <Text>{this.props.secondMsg === undefined ? "" : this.props.secondMsg}</Text>
            </View>
          </Modal>
        )
    }
}