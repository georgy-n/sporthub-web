import { DateRaw } from './DateRaw';

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

export class ActivityInfoRaw {
    id: number;
    description: string;
    category: string;
    subCategory: string;
    owner: string;
    countPerson: number;
    status: string;
    date: DateRaw;
    countFreeSpace: number;
    participants: Array<string>;

    constructor(id: number,
        description: string,
        category: string,
        subCategory: string,
        owner: string,
        countPerson: number,
        status: string,
        date: DateRaw,
        countFreeSpace: number,
        participants: Array<string>
        ) {
            this.id= id;
            this.description= description;
            this.category= category;
            this.subCategory= subCategory;
            this.owner= owner;
            this.countPerson= countPerson;
            this.status= status;
            this.date= date;
            this.countFreeSpace = countFreeSpace;
            this.participants = participants;
    }
}
export class ActivityInfo {
    id: number;
    description: string;
    category: string;
    subCategory: string;
    owner: string;
    countPerson: number;
    status: string;
    date: Date;
    countFreeSpace: number;
    participants: Array<string>;

    constructor(id: number,
        description: string,
        category: string,
        subCategory: string,
        owner: string,
        countPerson: number,
        status: string,
        date: Date,
        countFreeSpace: number,
        participants: Array<string>
        ) {
            this.id= id;
            this.description= description;
            this.category= category;
            this.subCategory= subCategory;
            this.owner= owner;
            this.countPerson= countPerson;
            this.status= status;
            this.date= date;
            this.countFreeSpace = countFreeSpace;
            this.participants = participants;
    }
}