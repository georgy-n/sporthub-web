export class User {
    firstName: String;
    secondName: String;
    login: String;
    id: String;
    constructor(firstName: String,
        lastName: String,
        login: String,
        id: String) {

        this.firstName = firstName;
        this.secondName = lastName;
        this.login = login;
        this.id = id;
    }
}