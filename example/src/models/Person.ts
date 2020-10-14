export class Person
{
    constructor(fName: string, lName: string) {
        this.firstName = fName;
        this.lastName = lName;
    }

    public firstName = "";
    public lastName = "";
    get fullName() {
        return `${this.firstName} ${this.lastName}`;
    }
}