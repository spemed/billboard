import HttpClient from "../base";
import network from "../../constants/network"
export default {
    awards: async (businessId) => {
        return (await HttpClient.build(network.AWARDS + '/' + businessId)).get()
    },
    detail: async (id) => {
        return (await HttpClient.build(network.AWARDS_DETAIL + '/' + id)).get()
    },
}