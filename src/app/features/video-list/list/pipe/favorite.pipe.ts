import { NgIterable, Pipe, PipeTransform } from '@angular/core';
import { Video } from '@core/models/video.model';
import { ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';

@Pipe({
  name: 'favorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: NgIterable<Video> | null | undefined , showLoved: boolean): NgIterable<any> | null | undefined {
      return (value! as Array<Video>).filter((el) => el.favorite === showLoved)
  }
}
