import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { MAX_LINK_LENGTH, ID_LENGTH } from '@core/models/validation.model';

export function inputValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const hasMinLenght = value.length >= ID_LENGTH;
    const hasMaxLength = value.length <= MAX_LINK_LENGTH;
    const inputValid = hasMinLenght && hasMaxLength;

    return !inputValid ? { inputValid: true } : null;
  };
}
