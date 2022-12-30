import ApiService from "./ApiService";


const ProfileService = {
    url: '/api/profile',

    async profile() {
        return ApiService.get(this.url);
    },

    async profileEdit(data) {
        return ApiService.put(this.url, data);
    },

    async changePassword(data) {
        return ApiService.post(this.url + '/change-password', data);
    },
}


export default ProfileService;