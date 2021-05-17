export default Timer = {
    //时间戳转日期字符串
     timestampToTime:(timestamp) => {
	    var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
	    var Y = date.getFullYear() + '-';
	    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
	    var D = date.getDate() + ' ';
	    var h = date.getHours() + ':';
	    var m = date.getMinutes() + ':';
	    var s = date.getSeconds();
	    return Y + M + D + h + m + s;
	},
   	// 注:时间戳转时间（ios手机NaN）
    getTime :(nS) => {
        var date=new Date(parseInt(nS)* 1000);
        var year=date.getFullYear();
        var mon = date.getMonth()+1;
        var day = date.getDate();
        var hours = date.getHours();
        var minu = date.getMinutes();
        var sec = date.getSeconds();
        return year+'/'+mon+'/'+day+' '+hours+':'+minu+':'+sec;
    },
    //计算倒数时间
    cutDown:(timestamp) => {
        let interval =  (new Date()).getTime() / 1000 - timestamp;
        if(interval < 0) {
            return ""
        }
        let day =  Math.floor(interval / 86400)
        if(day > 0) {
            return day+'天前'
        }
        let hour = Math.floor(interval / 3600) 
        if(hour > 0) {
            return hour+'小时前'
        }
        let minute = Math.floor(interval / 60)
        if(minute > 0) {
            return minute+'分钟前'
        }
        let seconds = Math.floor(interval / 1) 
        if(seconds >= 0) {
            return seconds+'秒前'
        }
    }
}