import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { CourseService } from './course.service';

@Injectable()
export class InterceptorHttpInterceptor implements HttpInterceptor {


  constructor(private courseService: CourseService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // console.log("InterceptorHttpInterceptor",new Date);
    // return next.handle(request);


    this.courseService.setLoading(true);
    
    return next.handle(request).pipe(
      finalize(() => {

        this.courseService.setLoading(false);

      })
    );


  }
}
