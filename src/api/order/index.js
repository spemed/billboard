import network from "../../constants/network"
import HttpClient from "../../api/base"

/**
 * 用户相关接口
 */
export default {
    /**
     * 创建订单
     */
    create: async (params) => {
        return (await HttpClient.build(network.ORDER)).post(params)
    },
    /**
     * 创建订单
     */
    order: async () => {
        return (await HttpClient.build(network.ORDER)).get()
    },
}