export class EditActivityRequest {
    category: string
    subCategory: string
    description: string
    countPerson: number
    date: Date
    id: number


    constructor(
        category: string,
        subCategory: string,
        description: string,
        countPerson: number,
        date: Date,
        id: number
    ) {
            this.id = id
            this.category = category
            this.subCategory = subCategory
            this.description = description
            this.countPerson = countPerson
            this.date = date

    }

}