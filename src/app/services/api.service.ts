import { Injectable, computed, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  public users: any;
  public cartCount: any;
  public users$: any;
  public usersCount = signal(0);
  public changeData = signal("Header");

  constructor(private http: HttpClient) {}
  async getUserList() {
    this.users = toSignal<IProduct[]>(
      this.http.get<IProduct[]>('https://jsonplaceholder.typicode.com/users')
    );

    this.users$ = toObservable(this.users);
    this.cartCount = computed(() => this.users());
  }
  userCount: number = 0;

  addNewUser() {
    this.userCount++;
    let lastUser = [...this.users()]
      .reverse()
      .filter((user, index) => index === 0)[0];
    const [prefix, domain] = lastUser.email.split('@');
    const [webprefix, webdomain] = lastUser.website.split('.');
    const lastPhoneNumericPart = lastUser.phone.match(/\d+$/)[0];
    const newPhoneNumericPart = +lastPhoneNumericPart + 1;

    let newUser = {
      id: lastUser.id + 1,
      name: `${lastUser.name.replace(/\d+$/, '')}${this.userCount}`,
      email: `${prefix.replace(/\d+$/, '')}${this.userCount}@${domain}`,
      website: `${webprefix.replace(/\d+$/, '')}${this.userCount}.${webdomain}`,
      phone: lastUser.phone.replace(/\d+$/, '') + newPhoneNumericPart,
    };
    this.users().push(newUser);
    this.usersCount.set(this.users().length);
  }

  removeUser(data: number) {
    this.users().splice(data - 1, 1);
  }
  count = 0;
  getFilteredAndMappedRecord(records?: number) {
    if (records) {
      let filteredUser = this.users().filter((x: { id: number }) => x.id <= 5);
      console.log('filteredUser', filteredUser);
    } else if (this.count == 0) {
      this.count++;
      this.users().map((x: { id: number }) => (x.id = x.id * 5));
    } else {
      {
        this.count--;
        this.users().map((x: { id: number }) => (x.id = x.id / 5));
      }
    }
  }
}

export interface IProduct {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
}

interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: IGeo;
}

interface IGeo {
  lat: string;
  long: string;
}
