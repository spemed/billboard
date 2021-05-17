import network from "../../constants/network";

export default async function upload(resource) {
    let formData = new FormData();//如果需要上传多张图片,需要遍历数组,把图片的路径数组放入formData中
    let file = {uri: resource, type: 'multipart/form-data', name: 'image.png'};   //这里的key(uri和type和name)不能改变,
    formData.append("img",file);   //这里的files就是后台需要的key
    try {
        const {status,message,data} = await (
            fetch(network.UPLOAD,{
                method:'POST',
                headers:{
                    'Content-Type':'multipart/form-data',
                },
                body:formData,
            }).then((response) => response.json())
        )
        if(status !== 0) {
            console.log(message)
            return false
        }
        return data.url;
    } catch(err) {
        console.log(err)
        return false;
    }
}