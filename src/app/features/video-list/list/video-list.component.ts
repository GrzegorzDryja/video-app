import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, tap } from 'rxjs';

import { VideosFacade } from '@core/store/videos.facade';

import { Videos } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';
import { Layout } from '@core/models/layout.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  
  protected videosList$: Observable<Videos>;
  protected favorite$: Observable<boolean>
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
    this.videosList$ = this.store.videos$
    this.favorite$ = this.store.favorite$
  }

  public onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
  }

  dataSource = new MatTableDataSource();
  dataSourceWithPageSize = new MatTableDataSource();


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSourceWithPageSize.paginator = this.paginatorPageSize;
  }
}
