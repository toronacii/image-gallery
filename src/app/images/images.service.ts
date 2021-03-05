import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  all(page = 1) {
    return this.http.get<any>(API_URL + `/images?page=${page}`)
  }

  one(id: string) {
    return this.http.get<any>(API_URL + `/images/${id}`)
  }
}
