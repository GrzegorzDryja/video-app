import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Videos } from '@models/video.model';
import { DataService } from '@services/data.service';
import { MaterialIcons } from '@shared/material-icons.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
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

  constructor(private data: DataService) {
  }

  public ngOnInit(): void {   
    this.subscription = this.data.loadVideos().subscribe(
      videos => {
        this.videosList = videos;
        this.pagedList = this.videosList.slice(0, this.pageSize);
        this.length = this.videosList.length;
      })
  }

  public ngAfterContentInit(): void {
    this.data.getLocalStorage();
  }

  public onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
  }
  
  public onPageChange(pageEvent: PageEvent): void {
    const startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    let endIndex = startIndex + pageEvent.pageSize;
    
    if(endIndex > this.length){
      endIndex = this.length;
    }
    
    this.pagedList = this.videosList.slice(startIndex, endIndex);
  }

  public ngOnDestroy(): void{
    this.subscription.unsubscribe()
  }
}
