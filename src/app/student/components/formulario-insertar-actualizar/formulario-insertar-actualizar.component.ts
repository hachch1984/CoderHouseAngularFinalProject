import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AreaInterface } from 'src/app/store/interfaces/AreaInterface';
import { CourseInterface } from 'src/app/store/interfaces/CourseInterface';
import { StudentInterface } from 'src/app/store/interfaces/StudentInterface';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { CourseService } from 'src/app/store/services/course.service';

export const FormularioInsertarActualizarComponent_UrlName: string = 'formulario-insertar-actualizar';

@Component({
  templateUrl: './formulario-insertar-actualizar.component.html',
  styleUrls: ['./formulario-insertar-actualizar.component.scss']
})
export class FormularioInsertarActualizarComponent implements OnInit {
  objArea_selectOneOption: AreaInterface = { id: '', name: '-- Seleccione un area --' };
  objCourse_selectOneOption: CourseInterface = { id: '', name: '-- Seleccione un curso --',area_id:'', area: undefined, description: '' };
  objCourse_noData: CourseInterface = { id: '', name: '-- No hay cursos --', area_id:'',area: undefined, description: '' };
  observable_areaList = this.courseService.area_getList()
    .pipe(
      map(value => {
        value.unshift(this.objArea_selectOneOption)
        return value;
      })
    );
  observable_courseList = new Observable<CourseInterface[]>();
  title = '';
  myForm = this.fb.group({
    id: [''],
    area: [{} as AreaInterface, [Validators.required]],
    course_id: [''],
    course: [{} as CourseInterface, [Validators.required]],
    user_id: [''],
    user: [{} as UserInterface, [Validators.required]],
  });
  columnNames: string[] = ['fullName', 'picture'];
  observable_user_getList_onlyStudents = new Observable<UserInterface[]>;


  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentInterface,
  ) { }

  ngOnInit(): void {
    if (!this.data) {
      this.title = 'Nuevo Estudiante';
      this.myForm.get('area')!.patchValue(this.objArea_selectOneOption);
    } else {
      this.title = 'Actualizar Estudiante';

      this.myForm.patchValue(this.data)
      this.myForm.get('area')!.patchValue(this.data.course?.area!);
    }

    this.observable_courseList = this.myForm.get('area')!.valueChanges
      .pipe(
        switchMap(result => this.courseService.course_getList_by_areaId(result!.id!)),
        map(result => {
          if (result.length === 0) {
            result.unshift(this.objCourse_noData);
          } else {
            result.unshift(this.objCourse_selectOneOption);
          }
          return result;
        }),
        tap(result => this.myForm.get('course')!.patchValue(result[0]))
      )

    this.observable_user_getList_onlyStudents = this.myForm.get('course')!.valueChanges
      .pipe(
        switchMap(value => this.courseService.user_getList_onlyStudents(this.myForm.get('area')!.value?.id!, value?.id!)),
      );
  }

  isInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);

    return (control && control.touched && control.invalid) ? true : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.myForm.get(controlName);
    if (control && control.touched && control.invalid) {
      if (control.hasError('required')) {
        return 'Este campo es requerido';
      }
    }
    return '';
  }

  bnAceptar_onClick() {

  }
  bnCancelar_onClick() {

  }


}
