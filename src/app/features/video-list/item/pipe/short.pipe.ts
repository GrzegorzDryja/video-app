import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short'
})
export class ShortPipe implements PipeTransform {

  transform(videoTitle: string): string {
    return `${videoTitle.slice(0,55)}...`;
  }

}
