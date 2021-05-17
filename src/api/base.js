import Enum from "../constants/enum"
import ReactNativeRestart from 'react-native-restart'
import UserStorage from "../utils/token"



export default class HttpClient {

    static async build (url = "", headers = {}) {
        const token = await UserStorage.getToken()
        return new HttpClient(url,{...headers,token});
    }

    constructor(url = "", headers = {}) {
       if( url == "" ){
          throw Error("invalid url")
       }
       this.url = url
       this.headers = {
            Accept: 'application/json',
           'Content-Type': 'application/json',
           ...headers,
       }
    }

    //私有方法get handle
    _get(params = {}) {
        let str = ""
        for (let key in params) {
            str += `${key}=${params[key]}&`
        }
        str = this.url + "?" + str.substring(0, str.length - 1)
        return fetch(str, {
            method: "get",
            headers: this.headers,
        }).then(res=>res.json())
    }

    //私有方法post handle
    _post(params = {}) {
        return fetch(this.url, {
            method:"POST",
            headers: this.headers,
            body: JSON.stringify(params),
        }).then(res=>res.json())
    }

    //私有方法delete handle
    _delete(params = {}) {
        return fetch(this.url, {
            method:"delete",
            headers: this.headers,
            body: JSON.stringify(params),
        }).then(res=>res.json())
    }

    //私有方法put handle
    _put(params = {}) {
        return fetch(this.url, {
            method:"put",
            headers: this.headers,
            body: JSON.stringify(params),
        }).then(res=>res.json())
    }

    /**
     * get方法
     */
    async get(params = {}) {
        return this._requestHandle(Enum.HTTP_METHOD.GET,params)
    }

    /**
     * post方法
     */
    async post(params = {}) {
        return this._requestHandle(Enum.HTTP_METHOD.POST,params)
    }

    /**
     * put方法
     */
    async put(params = {}) {
        return this._requestHandle(Enum.HTTP_METHOD.PUT,params)
    }

    /**
     * delete方法
     */
    async delete(params = {}){
        return this._requestHandle(Enum.HTTP_METHOD.DELETE,params)
    }

    /**
     * 请求统一处理函数
     */
    async _requestHandle(method = Enum.HTTP_METHOD.GET, params = {}) {
        let handle = () => { }
        switch (method) {
            case Enum.HTTP_METHOD.GET:
                handle = this._get
                break
            case Enum.HTTP_METHOD.POST:
                handle = this._post
                break
            case Enum.HTTP_METHOD.PUT:
                handle = this._put
                break
            case Enum.HTTP_METHOD.DELETE:
                handle = this._delete
                break
            default:
                throw new Error("invalid request method")
        }
        handle = handle.bind(this)
        const response = await handle(params)
        return new Promise(async (resolved) => {
            if (response.status === Enum.STATUS_CODE.FORBIDDEN) {
                alert("登录态过期!")
                res = await UserStorage.clear()
                if(res) {
                    ReactNativeRestart.Restart()
                }
                return
            }
            resolved(response)
        })
    }
}
