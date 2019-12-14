export class RegistrationRequest {
    firstName: String;
    lastName: String;
    username: String;
    password: String;

    constructor(firstName: String,
        lastName: String,
        login: String,
        password: String) {

        this.firstName = firstName;
        this.lastName = lastName;
        this.username = login;
        this.password = password;

    }

}