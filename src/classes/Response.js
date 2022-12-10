class Response {
    constructor(response) {
        if (response.hasOwnProperty('data')) {
            this.status = response.data.status
            this.message = response.data.message
            this.data = response.data.data
        } else {
            this.status = 500
            this.message = 'Error de servidor'
            this.data = []
        }
    }
    isOk() {
        return this.status >= 200 && this.status < 300
    }
}

export default Response;