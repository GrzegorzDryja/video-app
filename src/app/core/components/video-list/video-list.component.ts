import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@app/store/videos/videos.facade';
import { Videos } from '@models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  private videosListSubscription!: Subscription;

  protected videosList: Videos = [];
  protected isLineView = false;
  protected rowHeightRatio = '9rem';
  protected showFavorite = false;
  protected sortSwitch = true;
  protected pageIndex = 0;
  protected pageSize = 9;
  protected firstPage = this.pageIndex * this.pageSize;
  protected secondPage = (this.pageIndex + 1) * this.pageSize;
  protected pageSizeOptions = [9, 18, 27];
  protected pageEvent!: PageEvent;

  constructor(private store: VideosFacade) {}

  public ngOnInit(): void {
    this.videosListSubscription = this.store.videos$.subscribe(
      (videos) => (this.videosList = videos)
    );
    this.pageEvent = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.videosList.length,
    };
  }

  public onChangeGridStyle(colsNum: number): void {
    if (colsNum === 3) {
      this.isLineView = true;
      return;
    }

    this.isLineView = false;
  }

  public onShowFavoriteSwitch(showFavorite: boolean): void {
    this.showFavorite = showFavorite;
  }

  public onSortSwitch(sortSwitch: boolean): void {
    this.sortSwitch = sortSwitch;
  }

  public setPaginator(pageEvent: PageEvent): PageEvent {
    this.firstPage = pageEvent.pageIndex * pageEvent.pageSize;
    this.secondPage = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    return pageEvent;
  }

  public ngAfterViewInit(): void {
    this.pageEvent = new PageEvent();
  }

  public ngOnDestroy(): void {
    this.videosListSubscription.unsubscribe();
  }
}
