import { Pipe, PipeTransform } from '@angular/core';
 
@Pipe({
  name: 'pascalCaseWithEndPoint'
})
export class PascalCaseWithEndPoint implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value ? value.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()) + '.' : '';
  }

}
