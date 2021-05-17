import HttpClient from "../base";
import network from "../../constants/network"
export default {
    getCurrentLocation:async () => {
        return (await HttpClient.build(network.GEO)).get()
    }
}