import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import { YOUTUBE_ID, VIMEO_ID } from '@core/models/validation.model';

export function inputMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value; 

    if (!value) {
      return null;
    }
    if (value.includes('vimeo') || value.includes('youtube')) {
      return null
    }
    if (YOUTUBE_ID.test(value) || VIMEO_ID.test(value)) {
      return null
    }
    return { matchValid: true }
  };
}
