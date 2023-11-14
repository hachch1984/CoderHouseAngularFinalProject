import { Component } from '@angular/core';
import { CourseService } from './store/services/course.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {

  constructor(private courseService: CourseService) {
  }




  loading() {
   return  this.courseService.getLoading();

  }


}
