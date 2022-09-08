import { AfterContentInit, Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog'
import { Subscription } from 'rxjs';

import { Videos } from '../../../core/models/video.model';
import { DataService } from '../../../core/services/data.service';
import { PlayerComponent } from '../../player/player.component';

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
  pageSizeOptions = [8, 16, 24]; //This could by dynamaic depending on grid layout and videos, issue: on grid list 3, 5 items dosn't look to good
  listHeart = "favorite";
  listBucket = "delete_forever"

  constructor(private data: DataService, private dialog: MatDialog) {
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

  onChangeGridStyle(colsNum: number){
    this.colsNumber = colsNum;
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
