import { Component, Input } from '@angular/core';

@Component({
  selector: 'shared-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent {



  @Input() 
  spinnerText: string='Loading data...';
}
