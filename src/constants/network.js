const HOST = "http://192.168.1.4/tob_billboard/public"
const API = HOST + "/api/"
const CDN = HOST
const LOGIN = API + "login"
const REGISTER = API + "register"
const LOGOUT = API + "logout"
const USER = API + "user"
const ACTIVITIY_COMPLETED = API + "activity/completed"
const ACTIVITIY_WAITING = API + "activity/waiting"
const ACTIVITIY_USER_COMPLETED = API + "activity/user_completed"
const BUSINESS = API + "business"
const AWARDS = API + "awards"
const AWARDS_DETAIL = API + "awards/detail"
const TASK = API + "task"
const ACTIVITY = API + "activity"
const ACTIVITY_SIGN = API + "activity/sign_up"
const GEO = API + "geo"
const ADDRESS = API + "address"
const USER_POINTS = USER + "/points"
const ORDER = API + "order"
const UPLOAD = API + "upload"



export default {
    LOGIN,
    REGISTER,
    LOGOUT,
    USER,
    BUSINESS,
    AWARDS,
    AWARDS_DETAIL,
    CDN,
    ACTIVITY,
    TASK,
    ACTIVITIY_COMPLETED,
    ACTIVITIY_WAITING,
    GEO,
    ADDRESS,
    USER_POINTS,
    ORDER,
    UPLOAD,
    ACTIVITIY_USER_COMPLETED,
    ACTIVITY_SIGN
}