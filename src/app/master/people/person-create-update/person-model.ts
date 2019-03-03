export class PeopleResponse {
  result: Person[];
}

export class Person {
  id: number;
  firstName: string;
  lastName: string;
  street: string;
  zipcode: number;
  city: string;
  phoneNumber: string;
  mail: string;

  get name() {
    let name = '';

    if (this.firstName && this.lastName) {
      name = this.firstName + ' ' + this.lastName;
    } else if (this.firstName) {
      name = this.firstName;
    } else if (this.lastName) {
      name = this.lastName;
    }

    return name;
  }

  set name(value) { }

  get address() {
    return `${this.street}, ${this.zipcode} ${this.city}`;
  }

  set address(value) { }

  constructor(person) {
    this.id = person.id;
    this.firstName = person.firstName;
    this.lastName = person.lastName;
    this.street = person.street;
    this.zipcode = person.zipcode;
    this.city = person.city;
    this.phoneNumber = person.phoneNumber;
    this.mail = person.mail;
  }
}

export class APIException {
  ClassName: string;
}