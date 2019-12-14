export class ProductRequest {
    name: String;
    cost: Number;
    description: String;

    constructor(name: String,
        cost: Number,
        description: String) {

        this.name = name;
        this.cost = cost;
        this.description = description;

    }

}