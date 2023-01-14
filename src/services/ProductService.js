import ApiService from './ApiService';

const ProductService = {
    url: '/api/products',

    async index(context) {
        return ApiService.get(this.url + '?' + ApiService.params(context));
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
    async completed(id) {
        return ApiService.patch(this.url + '/' + id + '/completed');
    },
}

export default ProductService;