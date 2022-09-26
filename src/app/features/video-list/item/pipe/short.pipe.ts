import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(videoTitle: string): string {
    return videoTitle.length > 54 ? `${videoTitle.slice(0,54)}...` : videoTitle;
  }

}
