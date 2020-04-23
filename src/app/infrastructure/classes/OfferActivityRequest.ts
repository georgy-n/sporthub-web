export class OfferActivityRequest {
    category: string
    subCategory: string
    description: string
    countPerson: number
    date: Date


    constructor(category: string,
        subCategory: string,
        description: string,
        countPerson: number,
        date: Date) {

            this.category = category
            this.subCategory = subCategory
            this.description = description
            this.countPerson = countPerson
            this.date = date

    }

}