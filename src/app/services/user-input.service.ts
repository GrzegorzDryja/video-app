import { Injectable } from '@angular/core';

import { SUPPORTED_PATHS, YOUTUBE_ID } from '../models/validation.model'

@Injectable({
  providedIn: 'root'
})
export class UserInputService {

  constructor() { }

  validate(data: string): boolean {
    let result = true;
    const BreakError = {};

    try {
      SUPPORTED_PATHS.forEach(regex => {
        // TO DO LATER
        if(data.match(regex) !== null){
          console.log("Match!")
        };
      });  
    } catch (err) {
      if (err !== BreakError) throw err;
    }

    return result;
  }

  separate(data: string): {platform: RegExpMatchArray | null, id: RegExpMatchArray | null} {    
    let id = data.match(YOUTUBE_ID);
    let platform = data.match("youtu | vimeo ");

    return { platform: platform, id: id }
  }
}
