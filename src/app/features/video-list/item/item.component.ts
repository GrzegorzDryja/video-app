import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { VideosFacade } from '@store/videos.facade';

import { environment } from '@environments/environment';
import { MaterialIcons } from '@shared/material-icons.model';
import { DataService } from '@services/data.service';
import { PlayerComponent } from '@features/player/player.component';
import { Video } from '@models/video.model';
import { VideoPlatform } from 'app/shared/video-platform.model';
import { Messages } from '@shared/messages.model';
import { SnackBar } from '@shared/snack-bar.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() video!: Video;

  protected platform!: string;
  protected thumnbnailPath!: string;
  protected videoId!: string;
  protected title!: string;
  protected dateObj!: Date;
  protected viewCount!: string;
  protected favorite!: boolean;

  protected deleteIcon = MaterialIcons.delete_forever;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected check_circle = MaterialIcons.check_circle;
  protected visibility = MaterialIcons.visibility;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: VideosFacade
  ) {}

  public ngOnInit(): void {
    this.platform = this.video.platform;
    this.thumnbnailPath = this.video.img;
    this.videoId = this.video.videoId;
    this.title = this.video.title;
    this.dateObj = this.video.date;
    this.viewCount = this.video.viewCount;
    this.favorite = this.video.favorite;
    this.favoriteSwitch = this.video.favorite ? MaterialIcons.favorite : MaterialIcons.favorite_outline;
  }

  public onFavoriteClick(videoId: string): void {
    this.favorite = !this.favorite;
    this.favoriteSwitch = this.favorite ? MaterialIcons.favorite : MaterialIcons.favorite_outline;
    this.store.loveVideo({ videoId });
    this.snackBar.open(Messages.video_loved, Messages.close, {
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
  }

  public playRightPlatform(source: string, id: string): void {
    this.dialog.open(PlayerComponent, {
      data: `${source === VideoPlatform.youtube ? environment.youTubePlayerURL : environment.vimeoPlayerURL}${id}`,
    });
  }
}
