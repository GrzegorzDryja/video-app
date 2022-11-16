import { Injectable } from '@angular/core';

import { Videos } from '@core/models/video.model';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  private localStorageName = 'video-app';

  public saveToLocalStorage(userVideosList: Videos): void {
    localStorage.setItem(this.localStorageName, JSON.stringify(userVideosList));
  }

  public getLocalStorage(): string | null {
    return localStorage.getItem(this.localStorageName);
  }
}
