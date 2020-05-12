export class RegistrationRequest {
    firstName: String;
    secondName: String;
    login: String;
    password: String;

    constructor(firstName: String,
        secondName: String,
        login: String,
        password: String) {

        this.firstName = firstName;
        this.secondName = secondName;
        this.login = login;
        this.password = password;

    }

}