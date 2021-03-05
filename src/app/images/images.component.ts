import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { ImagesService } from './images.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit {

  pictures: any[] = [];
  pageCount: number;
  page = 1;
  hasMore = false;

  constructor(
    private imagesService: ImagesService,
    private modalService: NgbModal) { }

  ngOnInit() {
    this.paginate();
  }

  paginate(page = 1) {
    this.imagesService.all(page)
      .subscribe(({ pageCount, page, hasMore, pictures }) => {
        this.pageCount = pageCount;
        this.page = page;
        this.hasMore = hasMore;
        this.pictures = pictures;
      });
  }

  open(event: Event, id: string) {
    event.preventDefault();
    const modalRef = this.modalService.open(ImageDetailComponent);
    modalRef.componentInstance.id = id;
  }

}
