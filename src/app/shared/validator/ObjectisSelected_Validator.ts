import { AbstractControl, ControlContainer, ValidationErrors } from "@angular/forms";



export const ObjectIsSelected_Validator = (control: AbstractControl): ValidationErrors | null => {
    
    let obj:any=control.value;
    if (obj && obj.id && obj.id!=='') {
        return null
    }
    else {
        return { objectIsSelected: true, message: 'Debe seleccionar un registro' };
    }
}
