import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoadingService } from '../shared/services/loading.service';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  pictures: any[] = [];
  page = 1;
  hasMore = false;

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
      .subscribe(({ page, hasMore, pictures }) => {
        this.page = page;
        this.hasMore = hasMore;
        this.pictures.push(...pictures);
      });
  }

  open(event: Event, index: number) {
    event.preventDefault();
    const modalRef = this.modalService.open(ImageDetailComponent, { size: 'lg' });
    modalRef.componentInstance.pictures = this.pictures;
    modalRef.componentInstance.index = index;
  }

}
