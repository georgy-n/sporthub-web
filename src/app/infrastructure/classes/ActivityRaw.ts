export class ActivityRaw {
    id: Number;
    description: String;
    category: String;
    subCategory: String;
    owner: String;
    countPerson: String;
    status: String;
    date: DateRaw;
}

export class DateRaw {
    seconds: number;
}

export class Activity {
    id: Number;
    description: String;
    category: String;
    subCategory: String;
    owner: String;
    countPerson: String;
    status: String;
    date: Date;

    constructor(id: Number,
        description: String,
        category: String,
        subCategory: String,
        owner: String,
        countPerson: String,
        status: String,
        date: Date) {
            this.id= id;
            this.description= description;
            this.category= category;
            this.subCategory= subCategory;
            this.owner= owner;
            this.countPerson= countPerson;
            this.status= status;
            this.date= date;
    }
}