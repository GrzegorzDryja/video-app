import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';

import { Videos } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnDestroy {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  private favoriteSubscription: Subscription;
  private videosListSubsription: Subscription;
  
  protected videosList: Videos = [];
  protected favorite = false;

  protected colsNumber = 1;
  protected pagedList!: Videos;
  protected length!: number;
  protected pageSize = 8;
  protected pageSizeOptions = [8, 16, 24];
  protected listHeart = MaterialIcons.favorite;
  protected listBucket = MaterialIcons.delete_forever;
  public pageEvent!: PageEvent;

  constructor(private store: VideosFacade) {
    this.videosListSubsription = this.store.videos$.subscribe(el => this.videosList = el)
    this.favoriteSubscription = this.store.favorite$.subscribe(el => this.favorite = el)
  }

  public onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
  }

  dataSource = new MatTableDataSource();
  dataSourceWithPageSize = new MatTableDataSource();


  public ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }

  public ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe()
    this.videosListSubsription.unsubscribe()
  }
}
