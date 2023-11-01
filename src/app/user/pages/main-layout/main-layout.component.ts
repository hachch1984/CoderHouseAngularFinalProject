import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GenerateUrl } from 'src/app/shared/utilCode/Code';
import { ListadoGeneralComponent_UrlName } from '../../components/listado-general/listado-general.component';
import { ReporteUsuariosPorTipoComponent_UrlName } from '../../components/reporte-usuarios-por-tipo/reporte-usuarios-por-tipo.component';
import { User_UrlName } from '../../user.module';


export const User_MainLayoutComponent_UrlName = 'main-layout';



interface LinkItem {
  url: string,
  title: string,
}

@Component({
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent   {

  linkItems: LinkItem[] = [
    { url:GenerateUrl(User_UrlName,ListadoGeneralComponent_UrlName), title: 'Listado General' },
    { url: GenerateUrl(User_UrlName,ReporteUsuariosPorTipoComponent_UrlName), title: 'Reporte Usuarios Por Tipo' }
  ];

  activeLink=this.linkItems[0];

  constructor(private router: Router) { }
   
  linkClick(linkItem: LinkItem) {
    this.activeLink = linkItem; 
    this.router.navigate([this.activeLink.url]);
  }

}