// src/Models/UserModel.js
export default class UserModel {
    constructor() {
        this.userId = '';
        this.email = '';
        this.hashed_password = '';
        this.name = '';
        this.last_name = '';
        this.address = '';
        this.phone = '';
        this.orders = [];   
        this.cart = []; 
        this.new_password = '';
        this.new_email = '';
    }
}
