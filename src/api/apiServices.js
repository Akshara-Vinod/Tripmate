//for creating request configuration

import axiosInstance from "./axiosInstance";

const apiService=async(httpMethod,url,reqBody)=>{
    const reqconfig={
        method:httpMethod,
        url,
        data:reqBody
    }
    try{
        const response=await axiosInstance(reqconfig)
        return response
    }catch(err){
        throw err
    }
}
export default apiService