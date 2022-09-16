import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { YOUTUBE_ID_VALIDATION, VIMEO_ID_VALIDATION } from '@core/models/validation.model';

export function inputMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value; 

    if (!value) {
      return null;
    }
    if (value.includes('vimeo') || value.includes('youtube')) {
      return null
    }
    if (YOUTUBE_ID_VALIDATION.test(value) || VIMEO_ID_VALIDATION.test(value)) {
      return null
    }
    return { matchValid: true }
  };
}
