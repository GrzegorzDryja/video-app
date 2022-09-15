import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, Subscription, tap } from 'rxjs';

import { Videos } from '@models/video.model';
import { DataService } from '@services/data.service';
import { MaterialIcons } from '@shared/material-icons.model';
import { select, Store } from '@ngrx/store';

import * as VideosActions from '@core/store/actions'
import { isLoadingSelector, videosSelector } from '@core/store/selectors';
import { AppStateInterface } from '@core/models/appState.interface';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss'],
})
export class VideoListComponent implements OnInit, AfterContentInit, OnDestroy {
  protected colsNumber = 1;
  protected subscription!: Subscription;
  protected videosList!: Videos;
  protected pagedList!: Videos;
  protected length!: number;
  protected pageSize = 8;
  protected pageSizeOptions = [8, 16, 24];
  protected listHeart = MaterialIcons.favorite;
  protected listBucket = MaterialIcons.delete_forever;

  public isLoading$: Observable<boolean>;
  public videosListObservable$: Observable<Videos>;

  constructor(private data: DataService, private store: Store<AppStateInterface>) {
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.videosListObservable$ = this.store.pipe(select(videosSelector))
  }

  public ngOnInit(): void {
      this.videosListObservable$.pipe(tap(res => this.videosList = res));  
      this.pagedList = this.videosList.slice(0, this.pageSize);
      this.length = this.videosList.length;
  }

  public ngAfterContentInit(): void {
    this.store.dispatch(VideosActions.getVideosFromLocalStorage()) 
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

    this.pagedList = this.videosList.slice(startIndex, endIndex);
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
