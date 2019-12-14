export class User {
    firstName: String;
    lastName: String;
    login: String;
    role: String;

    constructor(firstName: String,
        lastName: String,
        login: String,
        role: String) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.login = login;
        this.role = role;

    }
}