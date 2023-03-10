import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';

import { Videos } from '@models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;

  private videosListSubsription: Subscription;
  private showFavoriteSubsription: Subscription;

  protected videosList: Videos = [];
  protected showFavorite: boolean = false;
  protected sortSwitch: boolean = true;
  protected gridSwitch: boolean = false;
  protected pageIndex: number = 0;
  protected pageSize: number = 20;
  protected firstPage: number = this.pageIndex * this.pageSize;
  protected secondPage: number = (this.pageIndex + 1) * this.pageSize;
  protected pageSizeOptions: number[] = [10, 20, 40];
  protected pageEvent: PageEvent;

  constructor(private store: VideosFacade) {
    this.videosListSubsription = this.store.videos$.subscribe((el) => (this.videosList = el));
    this.showFavoriteSubsription = this.store.showLovedVideosSwitch$.subscribe(
      (showLoved) => (this.showFavorite = showLoved)
    );
    this.pageEvent = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.videosList.length,
    };
  }

  public onChangeGridStyle(gridSwitch: boolean): void {
    this.gridSwitch = gridSwitch;
  }

  public onSortSwitch(sortSwitch: boolean): void {
    this.sortSwitch = sortSwitch;
  }

  public setPaginaotor(pageEvent: PageEvent): PageEvent {
    this.firstPage = pageEvent.pageIndex * pageEvent.pageSize;
    this.secondPage = (pageEvent.pageIndex + 1) * pageEvent.pageSize;
    return pageEvent;
  }

  public ngAfterViewInit(): void {
    this.pageEvent = new PageEvent();
  }

  public ngOnDestroy(): void {
    this.showFavoriteSubsription.unsubscribe();
    this.videosListSubsription.unsubscribe();
  }
}
