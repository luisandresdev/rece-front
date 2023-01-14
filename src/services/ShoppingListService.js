import ApiService from './ApiService';

const ShoppingListService = {
    url: '/api/shopping_lists',

    async index() {
        return ApiService.get(this.url);
    },
    async store(data) {
        return ApiService.post(this.url, data);
    },
    async show(id) {
        return ApiService.get(this.url + '/' + id);
    },
    async update(data) {
        return ApiService.put(this.url + '/' + data.id, data);
    },
    async delete(id) {
        return ApiService.delete(this.url + '/' + id);
    },
    async empty(id) {
        return ApiService.delete(this.url + '/' + id+ '/empty');
    },
}

export default ShoppingListService;