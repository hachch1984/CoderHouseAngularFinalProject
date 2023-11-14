import { NgModule } from '@angular/core';
 
import { SharedModule } from '../shared/shared.module';
import { GenerateUrlName } from '../shared/utilCode/Code';
import { FormInicialComponent } from './components/form-inicial/form-inicial.component';
import { FormNoExisteComponent } from './components/form-no-existe/form-no-existe.component';
import { MainApplicationRoutingModule } from './main-application-routing.module';
import { MainLayoutComponent } from './pages/main-layout/main-layout.component';
import { FormularioLoginComponent } from './components/formulario-login/formulario-login.component';
import { FormularioAccesoNoAutorizadoComponent } from './components/formulario-acceso-no-autorizado/formulario-acceso-no-autorizado.component';


export const MainApplication_UrlName = GenerateUrlName('main-application');


@NgModule({
  declarations: [
    MainLayoutComponent,
    FormInicialComponent,
    FormNoExisteComponent,FormularioLoginComponent,
     FormularioAccesoNoAutorizadoComponent
  ],
  imports: [  
    MainApplicationRoutingModule,
    SharedModule,
  ],
  exports: [
    MainApplicationRoutingModule,
    MainLayoutComponent,
  ],

})
export class MainApplicationModule { }
