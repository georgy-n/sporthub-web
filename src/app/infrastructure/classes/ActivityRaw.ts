export class ActivityRaw {
    id: number;
    description: string;
    category: string;
    subCategory: string;
    owner: string;
    countPerson: string;
    status: string;
    date: DateRaw;
}

export class DateRaw {
    seconds: number;
}

export class Activity {
    id: number;
    description: string;
    category: string;
    subCategory: string;
    owner: string;
    countPerson: string;
    status: string;
    date: Date;

    constructor(id: number,
        description: string,
        category: string,
        subCategory: string,
        owner: string,
        countPerson: string,
        status: string,
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