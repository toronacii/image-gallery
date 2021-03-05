import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule, NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { LoaderComponent } from './components/loader/loader.component';
import { LazyImgDirective } from './directives/lazy-img.directive';

@NgModule({
  declarations: [LoaderComponent, LazyImgDirective],
  imports: [
    CommonModule,
    NgbModule,
    NgbPaginationModule
  ],
  exports: [NgbModule, LoaderComponent, LazyImgDirective]
})
export class SharedModule { }
