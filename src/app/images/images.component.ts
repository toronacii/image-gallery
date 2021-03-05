import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Paginator } from '../shared/classes/paginator.class';
import { LoadingService } from '../shared/services/loading.service';
import { Picture } from './classes/picture.class';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  pictures: Picture[] = [];
  hasMore = false;
  page = 1;


  constructor(
    private modalService: NgbModal,
    private imagesService: ImagesService,
    private loadingService: LoadingService) { }

  ngOnInit() {
    this.showMore();
  }

  showMore(page = 1) {
    const showMore$ = this.imagesService.all(page);
    this.loadingService
      .prepare(showMore$)
      .subscribe(({ page, hasMore, items }) => {
        this.page = page;
        this.hasMore = hasMore;
        this.pictures.push(...items);
      });
  }

  open(event: Event, index: number) {
    event.preventDefault();
    const modalRef = this.modalService.open(ImageDetailComponent, { size: 'lg' });
    modalRef.componentInstance.pictures = this.pictures;
    modalRef.componentInstance.index = index;
  }

}
