import { Injectable } from '@angular/core';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, ID_LENGTH } from '@models/validation.model';
import { VideoPlatform } from '@shared/video-platform.model';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  public validatePath(data: string): boolean {
    return (
      SUPPORTED_PATHS.some((path) => data.includes(path)) ||
      (data.length === ID_LENGTH && typeof data.match(YOUTUBE_ID)![0] === 'string')
    );
  }

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
    return data.includes(VideoPlatform.vimeo) ? VideoPlatform.vimeo : VideoPlatform.youtube;
  }
}
