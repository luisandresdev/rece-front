import Error from '../classes/Errors';

class Form {
    constructor(data) {
        this.set(data);
        this.__errors = new Error()
    }

    data() {
        let data = {}
        for (let field in this.__originalData) {
            if(field.slice(0,2) !== '__' ) {
                data[field] = this[field];
            }
        }
        return data;
    }

    set(data, field) {
        delete data['data'];
        if(field){
            this.__originalData[field] = data;
            this[field] = data;
        } else {
            this.__originalData = data;
            this.undo();
        }
    }

    attach(data) {
        delete data['data'];
        for (let attr in data) {
            if (this.__originalData.hasOwnProperty(attr)) {
                this.__originalData[attr] = data[attr];
                this[attr] = data[attr];
            }
        }
    }

    undo() {
        for (let field in this.__originalData) {
            this[field] = this.__originalData[field];
        }
    }

    // Valid tristate por el comportamiento requerido de boostrap-vue
    valid(field){
        if( this.__errors.any() ) {
            return !this.__errors.has(field)
        }
        return null;
    }

    errorMessage(field){
        return this.__errors.get(field);
    }

    setErrors(errors){
        this.__errors.record(errors);
    }

    clearErrors(field){
        this.__errors.clear(field);
    }

    reset() {
        for (let field in this.__originalData) {
            switch (typeof this.__originalData) {
                case 'boolean':
                    this[field] = true
                    break;
                case 'number':
                    this[field] = 0
                    break;
                case 'object':
                    this[field] = []
                    break;
                default:
                    this[field] = ''
                    break;
            }
        }
        this.__errors.clear();
    }
}
export default Form;