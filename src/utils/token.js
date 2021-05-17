import storage from "./storage"
export default class UserStorage {

    /**
     * 返回token信息
     */
    static async getToken() {
        const data = (await storage.get('user'))
        if (data === null) {
            return ""
        }
        token = data.token
        return  token === undefined ? "" : token
    }

    /**
     * 保存token
     * @param {string}} token 
     */
    static async setUserStorage(token){
        await storage.save('user', {token})
        return true
    }

    /**
     * 清除缓存数据
     */
    static async clear(){
        await storage.delete('user')
        return true
    }
}