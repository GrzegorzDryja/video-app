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
        //Hmm, can I improve this logic?
        if(
          data.length <= MAX_LINK_LENGTH && data.match(SUPPORTED_PATHS[i]
          ||  //MAGIC!!
          data.length == ID_LENGTH && data.match(YOUTUBE_ID)
        )){          
          result = true;
          break;
        }
    }   
    return result;
  }

  separate(data: string): { platform: string, id: string } {    
    let id = data.match(YOUTUBE_ID);

    return { platform: "youtube", id: "3bR4gly5PSE" }
  }
}
