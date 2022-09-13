import { AbstractControl, FormGroupDirective, NgForm } from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";

export class ExtrnalErrorStateMatcher implements ErrorStateMatcher {
    private valid = false;

    public isErrorState(
        control: AbstractControl<any, any> | null,
        form: FormGroupDirective | NgForm | null): boolean {

        return this.valid
    }

    public setErrorStateTrue() {
        this.valid = true
    }

    public setErrorStateFalse() {
        this.valid = false
    }
}
