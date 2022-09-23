import { Pipe, PipeTransform } from '@angular/core';

import { Videos } from '@core/models/video.model';

@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {
  transform(videos: Videos, sortSwitch: boolean): Videos {
    return sortSwitch
      ? [...videos].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      : [...videos].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }
}
