
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

        fetch(url)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

}

export { Network }