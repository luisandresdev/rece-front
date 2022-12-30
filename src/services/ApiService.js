import axios from 'axios'
import _ from 'lodash'
import router from '../router/index'

const ApiService = axios.create({
    baseURL: window.location.protocol + '//' + window.location.hostname, // import.meta.env.VITE_API_URL,
    headers: {
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD",
        "Access-Control-Allow-Headers": "Content-type",
        "cache-control": "no-cache",
    }
})

ApiService.interceptors.request.use(
    (config) => {
        // config.headers.common["Content-type"] = "application/json; charset=utf-8" ;
        // config.headers.common["Access-Control-Allow-Origin"] = "*";
        // config.headers.common["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
        // config.headers.common["Access-Control-Allow-Headers"] = "Content-type";
        // config.headers.common["cache-control"] = "no-cache";
        config.headers["Content-type"] = "application/json; charset=utf-8" ;
        config.headers["Access-Control-Allow-Origin"] = "*";
        config.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD"
        config.headers["Access-Control-Allow-Headers"] = "Content-type";
        config.headers["cache-control"] = "no-cache";
        return config
    },
    (error) => {
        return Promise.reject(error)
    }
);

ApiService.interceptors.response.use(
    (response) => {
        return response
    },
    (error) => {
        //console.log(error);
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            // console.log(error.response.data);
            // console.log(error.response.status);
            // console.log(error.response.headers);
            if (error.response.status === 401 && (router.currentRoute.value.name !== 'login')) {
                //localStorage.removeItem(import.meta.env.VITE_LOCAL_STORAGE);
                // window.location = '/login'
                router.push({ name: "login" });
            }
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
        //console.log(error.config);

        return Promise.reject(error)
    });

ApiService.clearCredentials = function () {
    delete this.defaults.headers.common['Authorization'];
};

ApiService.setCredentials = function (token_type, access_token) {
    this.defaults.headers.common['Authorization'] = token_type + ' ' + access_token;
};


ApiService.params = function (data) {
    return Object.keys(data)
        .map(key => `${key}=${encodeURIComponent(_.isObject(data[key]) ? JSON.stringify(data[key]) : data[key])}`)
        .join('&');
}

export default ApiService;
