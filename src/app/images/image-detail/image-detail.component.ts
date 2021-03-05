import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  id: string;
  picture: any;

  constructor(
    private activeModal: NgbActiveModal,
    private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.imagesService.one(this.id)
      .subscribe(picture => {
        picture.tags = (picture.tags || '').split(' ');
        this.picture = picture;
        console.log(picture);
      });
  }

  close() {
    this.activeModal.close();
  }

}
