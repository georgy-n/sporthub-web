export class OrderRequest {
    email: String;
    productIds: {[id: string]: number};

    constructor(email: String,
        productIds: {[id: string]: number}) {

        this.email = email;
        this.productIds = productIds;

    }

}