import { Component, OnInit } from '@angular/core';
import { Content } from '@shared/content.model';

@Component({
  selector: 'app-sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.scss']
})
export class StickyMenuComponent implements OnInit {
  protected showAllVideos = Content.showAllVideos;
  protected showFavoriteVideos = Content.showFavoriteVideos

  constructor() { }

  ngOnInit(): void {
  }

}
