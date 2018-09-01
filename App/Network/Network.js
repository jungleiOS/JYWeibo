import forge from 'node-forge';
class NetworkType {
    constructor(API) {
        this.API = API;
    }
    getAPI() {
        return this.API;
    }
}

NetworkType.TEST = new NetworkType('http://testa-app.51h99.net/api/');
NetworkType.FORMAL = new NetworkType('https://apia.jiumaster.com/api/');

Object.freeze(NetworkType);

const Network = {
    
    post: (url, data, callback)=>{
        let fetchOptions = {
            method: 'POST',
            body: data
        }
        let completeURL = NetworkType.FORMAL + url;
        fetch(url, fetchOptions)
        .then((response) => response.json())
        .then((responseData) => {
            callback(responseData);
        })
        .catch(err => {
            console.log(err)
        });
    },

    get: (callback) =>{
        let completeURL = NetworkType.FORMAL.API+'/WineMarket/GetProductList?PageIndex=0&PageSize=20&SortRule=1&SortType=3';
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