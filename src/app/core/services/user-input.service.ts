import { Injectable } from '@angular/core';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, MAX_LINK_LENGTH, ID_LENGTH } from '@models/validation.model';
import { VideoPlatform } from '@shared/video-platform.model';

@Injectable({
  providedIn: 'root',
})
export class UserInputService {
  public validatePath(data: string): boolean {
    let result = false;

      if (SUPPORTED_PATHS.some(path => data.includes(path)) || data.length === ID_LENGTH && data.match(YOUTUBE_ID)) {    
        result = true;
      }
    
    return result;
  }

  public extractId(data: string): string {
    return data.match(YOUTUBE_ID)![0] || data.match(VIMEO_ID)![0];
  }

  public extractPlatform(data: string): string {
    return data.includes(VideoPlatform.vimeo) ? VideoPlatform.vimeo : VideoPlatform.youtube;
  }
}
