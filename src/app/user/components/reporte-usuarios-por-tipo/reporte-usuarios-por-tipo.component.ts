import { Component, OnInit } from '@angular/core';
import { GenerateUrlName } from 'src/app/shared/utilCode/Code';
import { UserInterface } from 'src/app/store/interfaces/UserInterface';
import { UserTypeEnum } from 'src/app/store/interfaces/UserTypeEnum';
import { CourseService } from 'src/app/store/services/course.service';



export const User_ReporteUsuariosPorTipoComponent_UrlName =GenerateUrlName( 'reporte-usuarios-por-tipo');


@Component({
  selector: 'app-reporte-usuarios-por-tipo',
  templateUrl: './reporte-usuarios-por-tipo.component.html',
  styleUrls: ['./reporte-usuarios-por-tipo.component.scss']
})
export class ReporteUsuariosPorTipoComponent implements OnInit {
 
  loadingData = true;
  usersAdminList: UserInterface[] = [];
  usersStudentList: UserInterface[] = [];


  constructor(private courseService: CourseService) { }

  ngOnInit(): void {
    this.refresh_observable_userGetList();
  }

  refresh_observable_userGetList(): void {
    this.loadingData = true;
    this.courseService.user_getList()
      .subscribe(users => {
        this.usersAdminList = users.filter(x => x.userType == UserTypeEnum.admin);
        this.usersStudentList = users.filter(x => x.userType == UserTypeEnum.student);
        this.loadingData = false;
      });
  }



}
