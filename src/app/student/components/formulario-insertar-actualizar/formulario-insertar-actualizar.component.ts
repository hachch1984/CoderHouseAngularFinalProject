import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, switchMap, tap } from 'rxjs';
import { ObjectIsSelected_Validator } from 'src/app/shared/validator/ObjectisSelected_Validator';
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
  objCourse_selectOneOption: CourseInterface = { id: '', name: '-- Seleccione un curso --', area_id: '', area: undefined, description: '' };
  objCourse_noData: CourseInterface = { id: '', name: '-- No hay cursos --', area_id: '', area: undefined, description: '' };

  areaList: AreaInterface[] = [];
  courseList: CourseInterface[] = [];
  title = '';
  myForm = this.fb.group({
    id: [''],
    area: [{} as AreaInterface, [Validators.required, ObjectIsSelected_Validator]],
    course_id: [''],
    course: [{} as CourseInterface, [Validators.required, ObjectIsSelected_Validator]],
    user_id: [''],
    user: [{} as UserInterface, [Validators.required, ObjectIsSelected_Validator]],
    fullName: [''],
  });
  columnNames: string[] = ['fullName', 'picture'];
  esNuevoEstudiante = false;
  observable_user_getList_onlyStudents =   this.courseService.user_getList_onlyStudents()  ;



  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<FormularioInsertarActualizarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: StudentInterface,
  ) { }



  subscripciones() {

    this.courseService.area_getList().subscribe(result => {

      this.areaList = result;
      this.areaList.unshift(this.objArea_selectOneOption);
    });

    this.myForm.get('area')!.valueChanges.pipe(
      tap(value => {
        this.courseList = [];
      }),
    ).subscribe(value => {
      this.courseService.course_getList_by_areaId(value?.id!)
        .subscribe(result => {
          this.courseList = result;
          if (result.length > 0) {
            this.courseList.unshift(this.objCourse_selectOneOption);
            if (this.esNuevoEstudiante) {
              this.myForm.get('course')!.patchValue(this.objCourse_selectOneOption);
            } else {
              this.myForm.get('course')!.patchValue(this.courseList.find(x => x.id === this.data.course_id)!);
            }
          }
        });
    })
  }


  ngOnInit(): void {
    this.subscripciones();

    if (!this.data) {
      this.esNuevoEstudiante = true;
      this.title = 'Nuevo Estudiante';

      this.myForm.get('area')!.patchValue(this.objArea_selectOneOption);
    } else {
      this.esNuevoEstudiante = false;
      this.title = 'Actualizar Estudiante';
 
      this.myForm.get('user')!.clearValidators();
      this.myForm.patchValue(this.data);
      this.myForm.get('fullName')!.patchValue(this.data.user!.fullName);
      this.myForm.get('area')!.patchValue(this.data.course!.area!); 
      this.myForm.markAllAsTouched();
    }


  }

  openSnackBar(message: string) {
    this.snackBar.open(message, undefined, { duration: 3 * 1000, data: true });
  }


  isInvalid(controlName: string): boolean {
    const control = this.myForm.get(controlName);

    return (control && control.touched && control.invalid) ? true : false;
  }

  getErrorMessage(controlName: string): string {
    const control = this.myForm.get(controlName);
    if (control && control.touched && control.invalid) {

      if (control.hasError('required')) {
        return 'Este valor es requerido';
      } else if (control.hasError('objectIsSelected')) {
        return control.getError('message');
      }
    }
    return '';
  }
  clickedRows = new Set<UserInterface>();

  row_onClick(row: UserInterface) {
    this.myForm.get('user')!.patchValue(row);
  }
  row_isSelected(row: UserInterface): boolean {
    return this.myForm.get('user')!.value!.id === row.id ? true : false;
  }


  bnAceptar_onClick() {

    this.myForm.markAllAsTouched();

    if (this.myForm.invalid) { return; }

    let objStudent:StudentInterface = this.myForm.value as StudentInterface;

 

    if (!objStudent.id) {
      this.courseService.student_add(objStudent)
        .subscribe(result => {
          this.openSnackBar(result.message);
          result.isSuccess && this.dialogRef.close(true);
        });
    } else {
      this.courseService.student_update(objStudent)
        .subscribe(result => {
          this.openSnackBar(result.message);
          result.isSuccess && this.dialogRef.close(true);
        });
    }
  }
  bnCancelar_onClick() {
    this.dialogRef.close(false);
  }


}
function tab(): import("rxjs").OperatorFunction<AreaInterface | null, unknown> {
  throw new Error('Function not implemented.');
}

