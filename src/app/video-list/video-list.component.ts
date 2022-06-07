import { Component, OnInit } from '@angular/core';

import { DEMO_VIDEOS } from '../models/demo.model';

@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {

  videos = [ ...DEMO_VIDEOS ]

  constructor() { }

  ngOnInit(): void {
  }

}
