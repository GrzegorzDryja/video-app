import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { VimeoResponse } from '@models/vimeo.model';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class VimeoService {
  constructor(private http: HttpClient) {}

  public fetchVideo(videoId: string): Observable<VimeoResponse> {
    return this.http.get<VimeoResponse>(`${environment.vimeoApiURL}${videoId}`);
  }
}
