import HttpClient from "../base";
import network from "../../constants/network"
export default {
    business: async () => {
        return (await HttpClient.build(network.BUSINESS)).get()
    }
}