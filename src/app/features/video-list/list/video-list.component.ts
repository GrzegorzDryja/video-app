import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Videos } from '@models/video.model';
import { DataService } from '@services/data.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit, AfterContentInit {  
  
  colsNumber = 1;
  subscription!: Subscription;
  videosList!: Videos;
  pagedList!: Videos;
  length!: number;
  pageSize = 8;
  pageSizeOptions = [8, 16, 24];
  listHeart = "favorite";
  listBucket = "delete_forever"

  constructor(private data: DataService) {
  }

  ngOnInit(): void {   
    this.subscription = this.data.loadVideos().subscribe(
      videos => {
        this.videosList = videos;
        this.pagedList = this.videosList.slice(0, this.pageSize);
        this.length = this.videosList.length;
      })
  }

  ngAfterContentInit(): void {
    this.data.getLocalStorage();
  }

  onChangeGridStyle(colsNum: number): void {
    this.colsNumber = colsNum;
  }
  
  onPageChange(pageEvent: PageEvent): void {
    let startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    let endIndex = startIndex + pageEvent.pageSize;
    
    if(endIndex > this.length){
      endIndex = this.length;
    }
    
    this.pagedList = this.videosList.slice(startIndex, endIndex);
  }
}
