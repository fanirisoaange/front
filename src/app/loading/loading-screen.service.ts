import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {NgxSpinnerService} from 'ngx-spinner';
import {Observable} from 'rxjs';
import {finalize} from 'rxjs/operators';

@Injectable()
export class LoadingScreenService implements HttpInterceptor {

  activeRequests = 0;

  constructor(private spinner: NgxSpinnerService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.activeRequests === 0) {
      this.spinner.show();
    }

    this.activeRequests++;
    return next.handle(req).pipe(
      finalize(() => {
        this.activeRequests--;
        if (this.activeRequests === 0) {
          this.spinner.hide();
        }
      })
    );
  }
}
