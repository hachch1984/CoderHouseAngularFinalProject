import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { InterceptorHttpInterceptor } from './store/services/interceptor-http.interceptor';
import { StoreModule } from '@ngrx/store';
import { appReducer } from './store/services/redux/CourseIndex';
import { EffectsModule } from '@ngrx/effects';
import { CourseEffect } from './store/services/redux/CourseEffect';
 

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [    
    AppRoutingModule,
    BrowserAnimationsModule,  
    SharedModule,
     StoreModule.forRoot(appReducer, {}), EffectsModule.forRoot([]),
     EffectsModule.forFeature([CourseEffect]),
  ],
 
  bootstrap: [AppComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpInterceptor, multi: true }
  ]
})
export class AppModule { }
