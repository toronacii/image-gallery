import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ImagesService } from '../images.service';

@Component({
  selector: 'app-image-detail',
  templateUrl: './image-detail.component.html',
  styleUrls: ['./image-detail.component.scss']
})
export class ImageDetailComponent implements OnInit {

  index: number;
  pictures: any[] = [];
  picture: any;

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

    const _pricing = this.pictures[this.index];
    if (_pricing.full) {
      this.picture = _pricing.full;
      return;
    }

    this.isLoading = true;
    this.imagesService.one(_pricing.id)
      .subscribe(picture => {
        picture.tags = (picture.tags || '').split(' ');
        this.picture = _pricing.full = picture;
        this.isLoading = false;
      });
  }

}
