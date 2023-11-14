import { Component } from '@angular/core';
import { CourseService } from 'src/app/store/services/course.service';

@Component({
  selector: 'shared-spinner-principal',
  templateUrl: './spinner-principal.component.html',
  styleUrls: ['./spinner-principal.component.scss']
})
export class SpinnerPrincipalComponent {
  constructor(private courseService: CourseService) { }

  loading(): boolean {
    return this.courseService.getLoading();
  }

}
