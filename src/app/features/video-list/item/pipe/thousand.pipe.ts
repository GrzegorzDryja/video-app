import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'thousand',
})
export class ThousandPipe implements PipeTransform {
  transform(videoStats: string): string {
    if (videoStats.length > 3) {
      return `${videoStats.slice(0, -3)}.${videoStats.slice(-3, -2)}k`;
    }

    return videoStats;
  }
}
