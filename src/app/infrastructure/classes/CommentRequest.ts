export class CommentRequest {
    activityId: number
    message: string
    date: string

    constructor(
        activityId: number,
        message: string,
        date: string) {
            this.activityId = activityId
            this.message = message
            this.date = date
    }
}