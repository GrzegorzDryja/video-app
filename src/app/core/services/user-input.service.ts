import { Injectable } from '@angular/core';

import { SUPPORTED_PATHS, YOUTUBE_ID, VIMEO_ID, MAX_LINK_LENGTH, ID_LENGTH } from '@models/validation.model'
import { Platform } from '@shared/platform.model';

@Injectable({
    providedIn: 'root'
})
export class UserInputService {

    public validatePath(data: string): boolean {
        let result = false;

        for (let i = 0; i < SUPPORTED_PATHS.length; i++){
            if( data.length <= MAX_LINK_LENGTH && data.includes(SUPPORTED_PATHS[i])
                || data.length == ID_LENGTH && data.match(YOUTUBE_ID)
            ){
                result = true;
                break;
            }
        }     
        return result;
    }

    public extractId(data: string): string {   
        return data.match(YOUTUBE_ID)![0] || data.match(VIMEO_ID)![0];
    }

    public extractPlatform(data: string): string {
        return data.includes("vimeo") ? Platform.vimeo : Platform.youtube;
    }
}
