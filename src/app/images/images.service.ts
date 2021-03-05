import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/environments/environment';
import { Paginator } from '../shared/classes/paginator.class';
import { DetailedPicture } from './classes/detailed-picture.class';
import { Picture } from './classes/picture.class';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  constructor(private http: HttpClient) { }

  all(page = 1): Observable<Paginator<Picture>> {
    return this.http
      .get<any>(API_URL + `/images?page=${page}`)
      .pipe(map(({ page, hasMore, pictures }) => {
        const _pictures = pictures = pictures.map(({ id, cropped_picture: url }) => new Picture(id, url));
        return new Paginator(page, hasMore, _pictures);
      }));
  }

  one(id: string) {
    return this.http
      .get<any>(API_URL + `/images/${id}`)
      .pipe(map(({ author, camera, tags, full_picture: url }) => new DetailedPicture(author, camera, tags, url)))
  }
}
