import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VideosFacade } from '@store/videos.facade';

import { Content } from '@shared/content.model';
import { Messages } from '@shared/messages.model';
import { SnackBar } from '@shared/snack-bar.model';
import { Subscription } from 'rxjs';
import { Videos } from '@core/models/video.model';

@Component({
  selector: 'app-actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss'],
})
export class ActionsComponent implements OnInit, OnDestroy {
  @Input() videoId!: string;
  @Output() isVideoDeleted = new EventEmitter<boolean>();

  private videosSubscription: Subscription;
  private videos!: Videos;

  protected loveIcon: string = Content.loveIcon;
  protected deleteIcon: string = Content.deleteIcon;
  protected favorite!: boolean;

  constructor(private snackBar: MatSnackBar, private store: VideosFacade) {
    this.videosSubscription = this.store.videos$.subscribe((videos) => (this.videos = videos));
  }

  public ngOnInit(): void {
    this.favorite = this.videos[this.videos.findIndex((video) => video.videoId === this.videoId)].favorite;
  }

  public onFavoriteClick(videoId: string): void {
    this.favorite = !this.favorite;
    this.store.loveVideo({ videoId });
    this.snackBar.open(this.favorite ? Messages.video_loved : Messages.video_unloved, Messages.close, {
      duration: SnackBar.duration,
    });
  }

  public onDeleteClick(videoId: string): void {
    this.store.deleteVideo({ videoId });

    this.snackBar
      .open(Messages.video_deleted, Messages.undo, {
        duration: SnackBar.duration,
      })
      .onAction()
      .subscribe(() => this.store.undoLastVideo());
    
    this.isVideoDeleted.emit(true)
  }

  public ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}
