import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImagesComponent } from './images.component';
import { ImagesRoutingModule } from './images-routing.module';
import { ImageDetailComponent } from './image-detail/image-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [ImagesComponent, ImageDetailComponent],
  imports: [
    CommonModule,
    ImagesRoutingModule,
    SharedModule
  ]
})
export class ImagesModule { }
