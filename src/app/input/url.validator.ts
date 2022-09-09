import { AbstractControl } from '@angular/forms';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, MAX_LINK_LENGTH, ID_LENGTH } from '../models/validation.model'

export function ValidateUrl(control: AbstractControl) {
    
    if (control.value.length >= MAX_LINK_LENGTH && (control.value.match(YOUTUBE_ID) || control.value.match(VIMEO_ID))) {
        return { invalidUrl: true };
    }
    return null;
}
