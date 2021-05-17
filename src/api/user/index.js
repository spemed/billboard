import network from "../../constants/network"
import HttpClient from "../../api/base"

/**
 * 用户相关接口
 */
export default {
    login: async (phone, password) => {
        return (await HttpClient.build(network.LOGIN)).get({
            phone,
            password
        })
    },

    /**
     * 注册操作
     */
    register: async (phone, password, rePassword) => {
        return (await HttpClient.build(network.REGISTER)).post({phone, password, rePassword})
    },

    /**
     * 登出操作
     */
    logout: async () => {
        return (await HttpClient.build(network.LOGOUT)).get()
    },

    users: async () => {
        return (await HttpClient.build(network.USER)).get()
    },

    /**
     *  用户信息修改
     */
    userSave: async (params) => {
        return (await HttpClient.build(network.USER)).put(params)
    },

    /**
     * 获取用户在当前商家的积分
     */
    points: async (businessId) => {
        return (await HttpClient.build(network.USER_POINTS + '/' + businessId)).get()
    }
}