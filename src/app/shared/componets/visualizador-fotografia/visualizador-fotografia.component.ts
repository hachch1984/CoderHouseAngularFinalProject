import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
 





@Component({
  selector: 'user-visualizador-fotografia',
  templateUrl: './visualizador-fotografia.component.html',
  styleUrls: ['./visualizador-fotografia.component.scss']
})
export class VisualizadorFotografiaComponent {


  @Input()
  image_base64:string | undefined|null;
  @Input()
  width = 200;
  @Input()
  height = 200;
  
  loadingPicture = true;

  constructor(private sanitizer: DomSanitizer,) { }


  getPicture(): SafeResourceUrl | string {
    if (this.image_base64 ) {
      return this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpg;base64,' + this.image_base64);
    } else {
      return "/assets/images/noUser.jpg";
    }

  }

}
