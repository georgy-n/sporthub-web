export class OrderRequest {
    email: String;
    productIds: Array<Number>;

    constructor(email: String,
        productIds: Array<Number>) {

        this.email = email;
        this.productIds = productIds;

    }

}