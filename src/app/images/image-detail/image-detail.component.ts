import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DetailedPicture as DetailedPicture } from '../classes/detailed-picture.class';
import { Picture } from '../classes/picture.class';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  index: number;
  pictures: Picture[] = [];
  picture: DetailedPicture;

  isLoading = false;

  constructor(
    private activeModal: NgbActiveModal,
    private imagesService: ImagesService) { }

  ngOnInit(): void {
    this.load();
  }

  close() {
    this.activeModal.close();
  }

  prev(event: Event) {
    event.preventDefault();
    this.index--;
    this.load();
  }

  next(event: Event) {
    event.preventDefault();
    this.index++;
    this.load();
  }

  showPrev() {
    return this.index > 0;
  }

  showNext() {
    return this.index < this.pictures.length - 1;
  }

  private load() {

    const _picture = this.pictures[this.index];
    if (_picture.full) {
      this.picture = _picture.full;
      return;
    }

    this.isLoading = true;
    this.imagesService.one(_picture.id)
      .subscribe(picture => {
        this.picture = _picture.full = picture;
        this.isLoading = false;
      });
  }

}
