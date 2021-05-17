import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';

export default class TaskList extends Component {
    render() {
        return (
            <FlatList
                refreshing={this.props.refreshing}
                onRefresh={this.props.onRefresh.bind(this)}
                style={styles.taskBody}
                data={this.props.tasks}
                showsVerticalScrollIndicator={false}
                renderItem={
                    ({ index, item }) => {
                        return (
                            <TouchableOpacity
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingVertical: 20,
                                    paddingHorizontal: 14,
                                    marginBottom: 22,
                                    backgroundColor:"#fff",
                                    borderRadius:10,
                                }}
                                onPress={() => {
                                    const handle = this.props.onPressHandle
                                    if (handle != undefined) {
                                        handle(item.id)
                                    }
                                }}
                            >
                                <View style={{
                                    flexBasis: "55%",
                                    justifyContent: "space-between",
                                }}>
                                    <Text style={{fontSize:16,fontWeight:"bold"}}>{item.activity.title}</Text>
                                    <Text style={{ fontSize: 15 }}>{
                                        item.activity.description.length >= 20 ? item.activity.description.substring(0,20) + "..." : item.activity.description
                                    }</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Text
                                            style={{
                                                backgroundColor: "#F2F9F2",
                                                borderRadius: 16,
                                                paddingVertical: 5,
                                                paddingHorizontal: 10,
                                                color: "#9DD39A",
                                                textAlign: "center",
                                            }}>
                                            #{item.activity.address}
                                        </Text>
                                    </View>
                                </View>
                                <Image source={{ uri: item.activity.background }} style={{ height:120,width:"40%",borderRadius:10 }}/>
                            </TouchableOpacity>
                        )
                    }
                }
            />
        )
    }
}

const styles = StyleSheet.create({
    taskBody: {
        backgroundColor: "#F1F3F0",  
    },
})

