import { Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';
import { AppStateInterface } from '@core/models/appState.interface';
import { videosSelector } from '@core/store/videos.selectors';

import { Videos } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent {
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('paginatorPageSize') paginatorPageSize!: MatPaginator;
  
  protected videosList$: Observable<Videos>;

  protected colsNumber = 1;
  protected pagedList!: Videos;
  protected length!: number;
  protected pageSize = 8;
  protected pageSizeOptions = [8, 16, 24];
  protected listHeart = MaterialIcons.favorite;
  protected listBucket = MaterialIcons.delete_forever;
  public pageEvent!: PageEvent;

  constructor(private store: Store<AppStateInterface>) {
    this.videosList$ = this.store.select(videosSelector)
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
