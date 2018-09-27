import { Alert, NativeModules } from "react-native";
import { storeData, readData } from '../Storage/Storage'; 
const Network = {
    
    post: (url, data, callback)=>{
        let fetchOptions = {
            method: 'POST',
            body: data
        }
       
        fetch(url, fetchOptions)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err)
        });
    },

    get: (url,params,callback) =>{
        if (params) {  
            let paramsArray = [];  
            //拼接参数  
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))  
            if (url.search(/\?/) === -1) {  
                url += '?' + paramsArray.join('&')  
            } else {  
                url += '&' + paramsArray.join('&')  
            }  
        }  

        readData('data',(data)=>{
            let timer = setInterval(()=>{
                callback(JSON.parse(data));
                clearInterval(timer);
            },1000)
        });

        // fetch(url)
        // .then((response) => response.json())
        // .then((responseData) => {
        //     storeData('data',JSON.stringify(responseData));
        //     if (responseData.error && responseData.error_code === 21332) {
        //         Alert.alert(
        //             '授权信息过期',
        //             '',
        //             [
        //                 {text:'取消',onPress:()=>{}},
        //                 {text:'重新授权', onPress: () =>{
        //                     NativeModules.ThirdLoginModule.getAuthWithUserInfoFromSina((info)=>{
        //                         let base_info = JSON.parse(info.baseJSONStr);
        //                         storeData('token',base_info.accessToken)
        //                     });
        //                 }}
        //             ]
        //         );
        //     }
        //     else {
        //         callback(responseData);
        //     }
        // })
        // .catch(err => {
        //     console.log(err);
        // });
        
    }

}

export { Network }