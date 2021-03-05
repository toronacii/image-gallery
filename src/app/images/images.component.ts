import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  pictures$: Observable<any[]>;

  constructor(private imagesService: ImagesService) { }

  ngOnInit() {
    this.pictures$ = this.imagesService.all()
      .pipe(tap(console.log), map(page => page.pictures));
  }

}
