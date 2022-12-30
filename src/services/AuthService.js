
import ApiService from './ApiService';

const AuthService = {

    token_type: null,
    access_token: null,

    async login(data) {
        this.clearParams();
        return ApiService.post('/api/login', data)
            .then(res => {
                this.setParams(res.data);
                return res;
            })
    },

    async register(data) {
        return  ApiService.post('/api/register', data);
    },

   async logout() {
        try {
            try {
                return await ApiService.delete('/api/logout');
            } catch (err) {
                return err;
            }
        } finally {
            this.clearParams();
        }
    },
    // async refresh() {
    //     const credentials = {
    //         grant_type: 'refresh_token',
    //         client_id: import.meta.env.VITE_CLIENT_ID,
    //         client_secret: import.meta.env.VITE_CLIENT_SECRET,
    //         refresh_token: this.refresh_token,
    //     };

    //     return ApiService.post('/oauth/token/refresh', credentials)
    //         .then(res => {
    //             return res;

    //         }).catch((_e) => {
    //             this.clearParams()
    //         });
    // },

    // async logout() {
    //     try {
    //         try {
    //             return await ApiService.delete('/api/logout');
    //         } catch (err) {
    //             return err;
    //         }
    //     } finally {
    //         this.clearParams();
    //     }
    // },

    // setIntended(to) {
    //     if (this.intended === null) {
    //         this.intended = to
    //     }
    // },

    // getIntended(clear = true) {
    //     const result = this.intended
    //     if (clear) {
    //         this.clearIntended()
    //     }
    //     return result
    // },

    // clearIntended() {
    //     this.intended = null
    // },

    clearParams() {
        console.log('******* reset credentials ******************************');
        localStorage.removeItem('token');
        this.token_type = null;
        this.access_token = null;
        ApiService.clearCredentials();
    },

    setParams(data) {
        this.token_type = data.token_type;
        this.access_token = data.access_token;
        ApiService.setCredentials('Bearer', data.access_token);
        this.storeParams();
    },

    getParams() {
        return {
            token_type: this.token_type,
            access_token: this.access_token,
        }
    },

    storeParams() {
        const params = this.getParams();
        localStorage.setItem('token',
            this.crypt(JSON.stringify(params), 'token'));
    },

    // loadParams() {
    //     const params = localStorage.getItem(
    //         import.meta.env.VITE_LOCAL_STORAGE);
    //     if (params !== null) {
    //         const k = this.crypt(params,
    //             import.meta.env.VITE_LOCAL_STORAGE)
    //         this.setParams(JSON.parse(k));
    //     }
    // },

    crypt(input, key) {
        var output = [];
        var charCode;
        for (var i = 0; i < input.length; i++) {
            charCode = input.charCodeAt(i) ^ key[i % key.length].charCodeAt(0);
            output.push(String.fromCharCode(charCode));
        }
        return output.join("");
    },

    // loggedIn() {
    //     if (this.access_token == null) {
    //         this.loadParams();
    //     }
    //     return !!this.access_token;
    // }
}

export default AuthService;
