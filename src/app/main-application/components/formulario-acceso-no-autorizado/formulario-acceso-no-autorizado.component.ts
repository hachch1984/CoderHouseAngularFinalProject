import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of, timer, concatMap, tap, interval } from 'rxjs';

export const FormularioAccesoNoAutorizadoComponent_UrlName: string = 'formulario-acceso-no-autorizado';

@Component({
  selector: 'app-formulario-acceso-no-autorizado',
  templateUrl: './formulario-acceso-no-autorizado.component.html',
  styleUrls: ['./formulario-acceso-no-autorizado.component.scss']
})
export class FormularioAccesoNoAutorizadoComponent implements OnInit, OnDestroy {
  constructor(private router: Router) { }
  ngOnDestroy(): void {
    this.intervalo.unsubscribe();
  }
  ngOnInit(): void {
  }

  contadorDescendente = 10;

  intervalo = interval(1000)
    .pipe(tap(() =>  this.contadorDescendente-- ))
    .subscribe(value=>{

      if(this.contadorDescendente === 0){
        this.bnRegresar_onClick();
      }
    });


  bnRegresar_onClick() {
    this.router.navigate(['/']);
  };

}
