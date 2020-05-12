import { DateRaw } from './DateRaw'

export class Comment {
    activityId: number
    message: string
    date: Date
    id: number
    commentOwner: string

    constructor(
        activityId: number,
        message: string,
        date: Date,
        id: number,
        commentOwner: string

    ) {
            this.activityId = activityId
            this.message = message
            this.date = date
            this.id = id
            this.commentOwner = commentOwner
    }

}

export class CommentRaw {
    activityId: number
    message: string
    date: DateRaw
    commentOwner: string
    id: number

    constructor(
        activityId: number,
        message: string,
        date: DateRaw,
        commentOwner: string,
        id: number
    ) {
            this.activityId = activityId
            this.message = message
            this.date = date
            this.id = id
            this.commentOwner = commentOwner
    }

}