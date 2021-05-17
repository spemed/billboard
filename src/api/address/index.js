import HttpClient from "../base";
import network from "../../constants/network"
export default {

    /**
     * 获取用户地址信息
     */
    address: async () => {
        return (await HttpClient.build(network.ADDRESS)).get()
    },
   
    /**
     * 添加地址记录
     */
    add: async (name,phone,address,description) => {
       return (await HttpClient.build(network.ADDRESS)).post({
            name,
            phone,
            address,
            description,
       })
    },

    /**
     * 修改地址记录
     */
    modify: async (id,name,phone,address,description) => {
        return (await HttpClient.build(network.ADDRESS+'/'+id)).put({
            name,
            phone,
            address,
            description,
        })
    },

    /**
     * 删除地址记录
     */
    delete: async (id) => {
        return (await HttpClient.build(network.ADDRESS+'/'+id)).delete()
    },
}