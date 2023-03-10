import { Pipe, PipeTransform } from '@angular/core';

import { Videos } from '@core/models/video.model';

@Pipe({
  name: 'showFavorite'
})
export class FavoritePipe implements PipeTransform {

  transform(videos: Videos, showLoved: boolean): Videos {
    return showLoved ? videos!.filter((video) => video.favorite === showLoved) : videos
  }
}
