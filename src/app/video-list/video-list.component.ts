import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

import { Video, Videos } from '../models/youtube.model';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {  
  subscription!: Subscription;
  videosList!: Videos;
  pagedList!: Videos;
  length!: number;
  pageSize = 5;
  pageSizeOptions = [5, 10, 20]; //This could by dynamaic depending on grid layout and videos, issue: on grid list 3, 5 items dosn't look to good
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

  onFavoriteClick(id: string){
    this.data.loveVideo(id)
  }

  onDeleteClick(video: Video){
    this.data.deleteVideo(video)
  }

  onPageChange(pageEvent: PageEvent){
    let startIndex = pageEvent.pageIndex * pageEvent.pageSize;
    let endIndex = startIndex + pageEvent.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    
    this.pagedList = this.videosList.slice(startIndex, endIndex);
  }
}
