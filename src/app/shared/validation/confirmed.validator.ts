import { FormGroup } from '@angular/forms';

    
// check if the password equal to confirm password
export function ConfirmedValidator(controlName: string, matchingControlName: string){

    return (formGroup: FormGroup) => {
        // password control
        const control = formGroup.controls[controlName];
        // confirm password control
        const matchingControl = formGroup.controls[matchingControlName];
        // check for errors 
        if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
            return;
        }
        
        // check if password's value and confirm password's value are the same 
        // if not confirmedValidator to true
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmedValidator: true });
        } else {
            matchingControl.setErrors(null);
        }

    }

}