import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { MaterialIcons } from '@shared/material-icons.model';
import { PlayerComponent } from '@features/player/player.component';
import { Video } from '@models/video.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./grid-item.component.scss'],
})
export class ItemComponent implements OnInit {
  @Input() video!: Video;
  @Input() gridSwitch: boolean = true;

  protected platform!: string;
  protected thumnbnailPath!: string;
  protected videoId!: string;
  protected title!: string;
  protected dateObj!: Date | string;
  protected viewCount!: string;
  protected likes!: string;
  protected favorite!: boolean;

  protected deleteIcon = MaterialIcons.delete_forever;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected contentLikesText = MaterialIcons.check_circle;
  protected contentViewsText = MaterialIcons.visibility;

  constructor(private dialog: MatDialog) {}

  public ngOnInit(): void {
    this.platform = this.video.platform;
    this.thumnbnailPath = this.video.img;
    this.videoId = this.video.videoId;
    this.title = this.video.title;
    this.dateObj = this.video.date;
    this.viewCount = this.video.viewCount;
    this.likes = this.video.likes;
    this.favorite = this.video.favorite;
  }

  public play(playLink: string): void {
    this.dialog.open(PlayerComponent, {
      data: playLink,
    });
  }
}
