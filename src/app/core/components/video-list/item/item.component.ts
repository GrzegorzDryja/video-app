import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';

import { VideosFacade } from '@store/videos/videos.facade';
import { environment } from '@environments/environment';
import { Video } from '@models/video.model';
import { PlayerComponent } from '@features/player/player.component';
import { MaterialIcons } from '@shared/material/material-icons.model';
import { VideoPlatform } from '@shared/models/video-platform.model';
import { SnackBar } from '@shared/material/snack-bar.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ItemComponent implements OnInit {
  @Input() video: Video;

  protected platform: string;
  protected thumbnailPath: string;
  protected videoId: string;
  protected title: string;
  protected dateObj: Date | string;
  protected viewCount: string;
  protected isFavorite: boolean;
  protected isInfo = false;
  protected deleteIcon = MaterialIcons.delete_forever;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected checkCircle = MaterialIcons.check_circle;
  protected visibility = MaterialIcons.visibility;
  protected infoIcon = MaterialIcons.info;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private store: VideosFacade,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.platform = this.video.platform;
    this.thumbnailPath = this.video.img;
    this.videoId = this.video.videoId;
    this.title = this.video.title;
    this.dateObj = this.video.date;
    this.viewCount = this.video.viewCount;
    this.isFavorite = this.video.favorite;
    this.favoriteSwitch = this.video.favorite
      ? MaterialIcons.favorite
      : MaterialIcons.favorite_outline;
  }

  public onFavoriteClick(videoId: string): void {
    this.isFavorite = !this.isFavorite;
    this.favoriteSwitch = this.isFavorite
      ? MaterialIcons.favorite
      : MaterialIcons.favorite_outline;
    this.store.loveVideo({ videoId });
    this.snackBar.open(
      this.isFavorite ? this.translate.instant('MESSAGES.LOVED') : this.translate.instant('MESSAGES.UNLOVED'),
      this.translate.instant('CONTENT.CLOSE'),
      {
        duration: SnackBar.duration,
      }
    );
  }

  public onDeleteClick(videoId: string): void {
    this.store.deleteVideo({ videoId });

    this.snackBar
      .open(this.translate.instant('MESSAGES.DELETED'), this.translate.instant('CONTENT.UNDO'), {
        duration: SnackBar.duration,
      })
      .onAction()
      .subscribe(() => this.store.undoLastVideo());
  }

  public playRightPlatform(source: string, id: string): void {
    this.dialog.open(PlayerComponent, {
      data: `${
        source === VideoPlatform.youtube
          ? environment.youTubePlayerURL
          : environment.vimeoPlayerURL
      }${id}`,
      maxWidth: '90dvw',
      maxHeight: '90dvh',
      minWidth: '50dvw',
      minHeight: '50dvh',
    });
  }

  public onShowInfoClick(): void {
    this.isInfo = !this.isInfo;
  }
}
