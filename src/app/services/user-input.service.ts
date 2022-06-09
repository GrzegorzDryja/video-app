import { Injectable } from '@angular/core';
import { platformBrowser } from '@angular/platform-browser';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, MAX_LINK_LENGTH, ID_LENGTH } from '../models/validation.model'

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  constructor() { }

  validatePath(data: string): boolean {
    let result = false;

    for (let i = 0; i < SUPPORTED_PATHS.length; i++){
        if( data.length <= MAX_LINK_LENGTH && data.includes(SUPPORTED_PATHS[i]) || data.length == ID_LENGTH && data.match(/^[a-zA-Z0-9_.-]{11}$/) ){         //Hmm, can I improve this logic? data.length == ID_LENGTH && data.match(YOUTUBE_ID
          console.log(data)
          result = true;
          break;
        }
    }   
    return result;
  }

  extractId(data: string): any {
    let id = data.match(YOUTUBE_ID);

    return id
  }

  extractPlatform(data: string): string {
    let platform = "youtube";
    
    //This could be more central managment
    if (data.includes("vimeo")){
      platform = "vimeo"
    }

    return platform;
  }
}
