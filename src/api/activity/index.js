import HttpClient from "../base";
import network from "../../constants/network"
export default {
    /**
     * 获取已经完成的活动信息
     */
    completed: async () => {
        return (await HttpClient.build(network.ACTIVITIY_COMPLETED)).get()
    },
    /*
    * 获取等待打卡的记录
    * 经纬度
    */
    waiting: async (longitude, latitude) => {
       return (await HttpClient.build(network.ACTIVITIY_WAITING)).get({
           longitude,
           latitude
       })
    },
    publish: async (id,title, description, background) => {
        console.log(network.ACTIVITY+'/'+id)
        return (await HttpClient.build(network.ACTIVITY+'/'+id)).put({
            title,
            description,
            background
        })
    },
    /**
     * 获取商家发布的活动
     */
    business_activities: async (businessId) => {
        return (await HttpClient.build(network.TASK+'/'+businessId)).get()
    },
    /**
     * 获取活动详情
     */
    signUp: async (taskId) => {
        return (await HttpClient.build(network.ACTIVITY_SIGN+'/'+taskId)).get()
    },
    /**
     * 获取用户已经完成的打卡记录
     */
    userCompleted: async () => {
        return (await HttpClient.build(network.ACTIVITIY_USER_COMPLETED)).get()
    },
    /**
     * 获取已经完成的任务详情
     */
    detail:async (activityId) =>{
        return (await HttpClient.build(network.ACTIVITY + '/' + activityId)).get()
    }
}