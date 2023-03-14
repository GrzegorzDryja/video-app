import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';
import { Videos } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';

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
  protected colsNumber = 1;
  protected rowHeightRatio = '7rem';
  protected showFavorite = false;
  protected sortSwitch = true;
  protected pageIndex = 0;
  protected pageSize = 9;
  protected firstPage = this.pageIndex * this.pageSize;
  protected secondPage = (this.pageIndex + 1) * this.pageSize;
  protected pageSizeOptions = [9, 18, 27];
  protected listHeart = MaterialIcons.favorite;
  protected listBucket = MaterialIcons.delete_forever;
  protected pageEvent!: PageEvent;

  constructor(private store: VideosFacade) {}

  public ngOnInit(): void {
    this.videosListSubscription = this.store.videos$.subscribe(
      (el) => (this.videosList = el)
    );
    this.pageEvent = {
      pageIndex: this.pageIndex,
      pageSize: this.pageSize,
      length: this.videosList.length,
    };
  }

  public onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
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
