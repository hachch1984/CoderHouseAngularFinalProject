import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { CourseInterface } from 'src/app/store/interfaces/CourseInterface';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { CourseService } from 'src/app/store/services/course.service';
import { selectorCourseState } from 'src/app/store/services/redux/CourseSelector';


export const Teacher_ListadoGeneralCursosInscritosComponent_UrlName: string = 'listado-general-cursos-inscritos';


@Component({
  selector: 'app-listado-general-cursos-inscritos',
  templateUrl: './listado-general-cursos-inscritos.component.html',
  styleUrls: ['./listado-general-cursos-inscritos.component.scss']
})
export class ListadoGeneralCursosInscritosComponent implements OnInit, OnDestroy {


  user: UserInterface | undefined = undefined;
  courses: CourseInterface[] = [];

  columnNames: string[] = ['index', 'area', 'course'];


  constructor(private courseService: CourseService,
    private store: Store) {
    this.store.select(selectorCourseState).subscribe((state) => {
      this.user = state.user;
    });
  }


  subscription_courses = new Subscription();

  ngOnInit(): void {
    this.subscription_courses =
      this.courseService.student_getCourses(this.user?.id!)
        .subscribe((courses) => {
          this.courses = courses;
        });
  }

  ngOnDestroy(): void {
    this.subscription_courses.unsubscribe();
  }
}
