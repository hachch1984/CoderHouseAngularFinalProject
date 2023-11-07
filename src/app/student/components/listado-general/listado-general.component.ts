import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subject, debounceTime, filter, map, switchMap, tap } from 'rxjs';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { CourseInterface } from 'src/app/store/interfaces/CourseInterface';
import { StudentInterface } from 'src/app/store/interfaces/StudentInterface';
import { CourseService } from 'src/app/store/services/course.service';
import { FormularioInsertarActualizarComponent } from '../formulario-insertar-actualizar/formulario-insertar-actualizar.component';



export const Student_ListadoGeneralComponent_UrlName: string = GenerateUrlName('student-listado-general');

@Component({
  templateUrl: './listado-general.component.html',
  styleUrls: ['./listado-general.component.scss']
})
export class ListadoGeneralComponent implements OnInit, OnDestroy, AfterViewInit {

  studentList: StudentInterface[] = [];
  columnNames: string[] = ['index', 'course', 'area', 'fullName', 'picture', 'actions']; 
  observable_areaList = this.courseService.area_getList()
    .pipe(
      map(value => {
        value.unshift({ id: '', name: '-- Seleccione un area --' });
        return value;
      })
    );
  observable_courseList = new Observable<CourseInterface[]>();
  observable_studentList = new Observable<StudentInterface[]>();

  myForm = this.fb.group({
    areaId: [''],
    courseId: [''],
    fullName: ['']
  });


  constructor(
    private courseService: CourseService,
    private fb: FormBuilder,
    private dialog: MatDialog,) {
  }


  ngOnInit(): void {

    //this.myForm.patchValue({ areaId: '', courseId: '', fullName: '' });

    this.observable_courseList = this.myForm.get('areaId')!.valueChanges
      .pipe(
        switchMap((value) => this.courseService.course_getList_by_areaId(value!)),
        map(value => {
          let name = '';
          if (value.length === 0) {
            name = '-- No hay cursos --';
          } else {
            name = '-- Seleccione un curso --';
          }
          value.unshift({ id: '', name, area_id:'',   area: undefined, description: '' });
          return value;
        }),

      );

 

  }
  ngAfterViewInit(): void {

  }
  ngOnDestroy(): void {

  }

  buscar(): void {
    let areaId = this.myForm.get('areaId')!.value!;
    let courseId = this.myForm.get('courseId')!.value!;
    let fullName = this.myForm.get('fullName')!.value!;

    this.observable_studentList = this.courseService.student_getList_by_courseId_and_fullName(areaId, courseId, fullName);
  }

  bnBuscar_onClick() {
    this.buscar();
  }
  fullName_onKeyup(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.bnBuscar_onClick();
    }
  }


  bnAgregar_onClick() {
    this.dialog.open(FormularioInsertarActualizarComponent, {
      data: undefined,
    })
      .afterClosed()
      .pipe(
        (tap(result => result && this.buscar()))
      );
  }


  bnEditar_onClick(student: StudentInterface) {

  }
  bnEliminar_onClick(student: StudentInterface) {

  }


}
