import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';

import { videosSelector } from '@core/store/videos.selectors';

import { Videos } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '@core/models/appState.interface';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements AfterContentInit, OnDestroy {
  protected videosList$: Observable<Videos>;

  protected colsNumber = 1;
  protected subscription!: Subscription;
  protected pagedList!: Videos;
  protected length!: number;
  protected pageSize = 8;
  protected pageSizeOptions = [8, 16, 24];
  protected listHeart = MaterialIcons.favorite;
  protected listBucket = MaterialIcons.delete_forever;

  constructor(private store: Store<AppStateInterface>) {
    this.videosList$ = this.store.select(videosSelector)
  }

  public ngAfterContentInit(): void {
  }

  public onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
  }

  public onPageChange(pageEvent: PageEvent): void {
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    let endIndex = startIndex + pageEvent.pageSize;

    if (endIndex > this.length) {
      endIndex = this.length;
    }

    // this.pagedList = this.videosList.slice(startIndex, endIndex);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
