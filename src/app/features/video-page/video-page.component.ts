import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';

import { Content } from '@shared/content.model';
import { Video, Videos } from '@core/models/video.model';
import { PlayerOptions } from '@shared/player.model';

@Component({
  selector: 'app-video-page',
  templateUrl: './video-page.component.html',
  styleUrls: ['./video-page.component.scss'],
})
export class VideoPageComponent implements OnInit, OnDestroy {
  private video!: Video;
  private videos!: Videos;
  private videosSubscription!: Subscription;
  private link!: string;

  protected videoId!: string;
  protected videoTitle!: string;
  protected displays!: string;
  protected likes!: string;
  protected dateOfAddingVideo!: string | Date;
  protected sanitizerLink!: SafeResourceUrl;
  protected contentDisplays: string = Content.displays;
  protected contentLikes: string = Content.likes;
  protected contentDate: string = Content.dateOfAddingVideo;
  protected playerHeight: string = PlayerOptions.playerHeight;
  protected playerWidth: string = PlayerOptions.playerWidth;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: VideosFacade,
    private sanitizer: DomSanitizer
  ) {
    this.videosSubscription = this.store.videos$.subscribe((videos) => (this.videos = videos));
  }

  public ngOnInit(): void {
    this.videoId = this.route.snapshot.params['id'];
    const index = this.videos.findIndex((video) => video.videoId === this.videoId);
    this.video = this.videos[index];
    this.displays = this.video.viewCount;
    this.likes = this.video.likes;
    this.videoTitle = this.video.title;
    this.dateOfAddingVideo = this.video.date;
    this.link = this.video.playLink;
    this.sanitizerLink = this.sanitizer.bypassSecurityTrustResourceUrl(this.link);
  }

  public isVideoDeleted(isVideoDeleted: boolean): void {
    if (isVideoDeleted) {
      this.router.navigate([''], { relativeTo: this.route });
    }
  }

  public ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}
