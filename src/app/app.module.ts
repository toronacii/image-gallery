import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { onStart } from './on-start';
import { AuthService } from './shared/services/auth.service';
import { TokenInterceptor } from './shared/services/token-interceptor.service';
import { SharedModule } from './shared/shared.module';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, SharedModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }, {
    provide: APP_INITIALIZER,
    useFactory: onStart,
    multi: true,
    deps: [AuthService]
  },],
  bootstrap: [AppComponent],
})
export class AppModule { }
