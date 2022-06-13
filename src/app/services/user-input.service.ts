import { Injectable } from '@angular/core';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, MAX_LINK_LENGTH, ID_LENGTH } from '../models/validation.model'

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  constructor() { }

  validatePath(data: string): boolean {
    let result = false;

    for (let i = 0; i < SUPPORTED_PATHS.length; i++){
        if( data.length <= MAX_LINK_LENGTH && data.includes(SUPPORTED_PATHS[i]) || data.length == ID_LENGTH && data.match(/^[a-zA-Z0-9_.-]{11}$/) ){
          result = true;
          break;
        }
    }   
    return result;
  }

  extractId(data: string): any {
    if(data.match(YOUTUBE_ID)){
      return data.match(YOUTUBE_ID)
    };
    if(data.match(VIMEO_ID)){
      return data.match(VIMEO_ID)
    }
  }

  extractPlatform(data: string): string {
    let platform = "youtube";
    
    if (data.includes("vimeo")){
      platform = "vimeo"
    }

    return platform;
  }
}
