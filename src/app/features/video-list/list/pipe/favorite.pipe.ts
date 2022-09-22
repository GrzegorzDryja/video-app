import { Pipe, PipeTransform } from '@angular/core';
import { Videos } from '@core/models/video.model';

@Pipe({
  name: 'showFavorite'
})
export class FavoritePipe implements PipeTransform {

  transform(value: Videos, showLoved: boolean): Videos {
    return showLoved ? value!.filter((el) => el.favorite === showLoved) : value
  }
}
