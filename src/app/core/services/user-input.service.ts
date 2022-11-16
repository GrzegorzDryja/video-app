import { Injectable } from '@angular/core';

import { YOUTUBE_ID, VIMEO_ID, VIMEO_ID_VALIDATION, YOUTUBE_ID_VALIDATION } from '@models/validation.model';
import { VideoPlatform } from '@shared/video-platform.model';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  public extractId(data: string): string {
    if (data.match(YOUTUBE_ID)) {
      return data.match(YOUTUBE_ID)![0];
    }
    if (data.match(VIMEO_ID)) {
      return data.match(VIMEO_ID)![0];
    }
    return 'No ID found';
  }

  public extractPlatform(data: string): string {
    if (data.includes(VideoPlatform.vimeo) || VIMEO_ID_VALIDATION.test(data)) {
      return VideoPlatform.vimeo
    }
    if (data.includes(VideoPlatform.youtube) || YOUTUBE_ID_VALIDATION.test(data)) {
      return VideoPlatform.youtube
    }
    return VideoPlatform.notSupported
  }
}
