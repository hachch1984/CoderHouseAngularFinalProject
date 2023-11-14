import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { InterceptorHttpInterceptor } from './store/services/interceptor-http.interceptor';
 

@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [    
    AppRoutingModule,
    BrowserAnimationsModule,  
    SharedModule,
  ],
 
  bootstrap: [AppComponent],
  providers: [
      { provide: HTTP_INTERCEPTORS, useClass: InterceptorHttpInterceptor, multi: true }
  ]
})
export class AppModule { }
