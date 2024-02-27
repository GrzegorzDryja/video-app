import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

import {
  YOUTUBE_ID_VALIDATION,
  VIMEO_ID_VALIDATION,
} from '@core/models/validation.model';
import { VideoPlatform } from '@app/shared/models/video-platform.model';

export function inputMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }
    if (
      value.includes(VideoPlatform.vimeo) ||
      value.includes(VideoPlatform.youtube)
    ) {
      return null;
    }
    if (YOUTUBE_ID_VALIDATION.test(value) || VIMEO_ID_VALIDATION.test(value)) {
      return null;
    }
    return { matchValid: true };
  };
}
