// class NetworkType {
//     constructor(API) {
//         this.API = API;
//     }
//     getAPI() {
//         return this.API;
//     }
// }

// NetworkType.TEST = new NetworkType('http://testa-app.51h99.net/api/');
// NetworkType.FORMAL = new NetworkType('https://apia.jiumaster.com/api/');

// Object.freeze(NetworkType);

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

    get: (url,data,callback) =>{
        fetch(completeURL)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err);
        });
        
    }

}

export { NetworkType, Network }