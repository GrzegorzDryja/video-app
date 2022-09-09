import { Injectable } from '@angular/core';

import { Videos } from '@core/models/video.model';

@Injectable({
	providedIn: 'root'
})
export class LocalStorageService {

	public saveToLocalStorage(userVideosList: Videos){
		localStorage.setItem("video-app", JSON.stringify(userVideosList));
  	}

	public getLocalStorage(): string | null {
    	return localStorage.getItem("video-app");
	}
}
