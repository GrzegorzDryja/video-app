import { Injectable } from '@angular/core';

import { Videos } from '@core/models/video.model';
import { delay, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorageName = 'video-app';

  public saveToLocalStorage(userVideosList: Videos): void {
    localStorage.setItem(this.localStorageName, JSON.stringify(userVideosList));
  }

  public getLocalStorage(): Observable<Videos>{
   const isLocal = localStorage.getItem(this.localStorageName);
    if(isLocal){
      const local = JSON.parse(isLocal)
      return of(local)  
    }
    return of()
}
}
