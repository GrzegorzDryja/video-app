import { NgIterable, Pipe, PipeTransform } from '@angular/core';
import { Video } from '@core/models/video.model';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Pipe({
  name: 'showFavorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: NgIterable<Video> | null | undefined , showLoved: any): NgIterable<any> | null | undefined {
    return showLoved ? (value! as Array<Video>).filter((el) => el.favorite === showLoved) : value
  }
}
