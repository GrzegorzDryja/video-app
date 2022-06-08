import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';

import { DEMO_VIDEOS } from '../models/demo.model';
import { Video } from '../models/video.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  
  videosList = DEMO_VIDEOS;
  pagedList: Video[] = [];
  length = this.videosList.length;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20]; //This could by dynamaic depending on grid layout and videos, issue: on grid list 3, 5 items dosn't look to good

  constructor() { }

  ngOnInit(): void {
    this.pagedList = this.videosList.slice(0, this.pageSize);
  }
  
  OnPageChange(pageEvent: PageEvent){
    let startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    let endIndex = startIndex + pageEvent.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    
    this.pagedList = this.videosList.slice(startIndex, endIndex);
  }
}
