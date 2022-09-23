import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';

import { Content } from '@shared/content.model';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss']
})
export class VideoPageComponent implements OnInit, OnDestroy {
  private videoId!: string;
  private paramsSubscription!: Subscription;

  protected videoTitle!: string;
  protected displays!: string;
  protected likes!: string;
  protected dateOfAddingVideo!: string;
  protected loveIcon: string = Content.loveIcon;
  protected deleteIcon: string = Content.deleteIcon;
  protected contentDisplays: string = Content.displays
  protected contentLikes: string = Content.likes;
  protected contentDate: string = Content.dateOfAddingVideo

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.videoId = this.route.snapshot.params['id'];
    this.paramsSubscription = this.route.params.subscribe(
      (params: Params) => {
        this.videoId = params['id']
      }
    )
  }

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe()
  }
}
