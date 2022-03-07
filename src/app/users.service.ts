import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

export interface UserData {
  results: [
    {
      gender:string;
      name: {
        title:string;
        first: string;
        last: string;
      };
      location: {
        street: string;
        city: string;
        state: string;
        postcode: string;
        coordinates: {
          latitude: string;
          longitude: string;
        };
        timezone: {
          offset: string;
          description: string;
        };
      };
      email: string;
      login: {
        uuid: string;
        username: string;
        password: string;
        salt: string;
        md5: string;
        sha1: string;
        sha256: string;
      };
      dob: {
        date: string;
        age: number;
      };
      registered: {
        date: string;
        age: number;
      };
      phone: string;
      cell: string;
      id: {
        name: string;
        value: string;
      };
      picture: {
        large: string;
        medium: string;
        thumbnail: string;
      };
      nat: string;
    }
  ];
  info: {
    seed: string;
    results: number;
    page: number;
    version: string;
  };
}

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private http: HttpClient) {}

  getUserData() {
    return this.http.get<UserData>('https://randomuser.me/api/').pipe(
      map((responseData) => {
        return responseData.results[0]
      })
    );
  }
}
