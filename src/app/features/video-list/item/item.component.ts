import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'

import { DataService } from '@services/data.service';
import { PlayerComponent } from '@features/player/player.component';
import { Video } from '@models/video.model';
import { MaterialIcons } from '@shared/material-icons.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    @Input() video!: Video;
    
    protected thumnbnailPath!: string;
    protected videoId!: string;
    protected id!: number;
    protected title!: string; 
    protected date!: Date;
    protected viewCount!: string;
    protected favorite!: boolean;
    protected deleteIcon = MaterialIcons.delete_forever;
    protected favoriteSwitch = MaterialIcons.favorite_outline;

    constructor(private data: DataService, private dialog: MatDialog) {}

    public ngOnInit(): void {
        this.thumnbnailPath = this.video.img;
        this.id = this.video.id;
        this.videoId = this.video.videoId
        this.title = this.video.title; 
        this.date = this.video.date;
        this.viewCount = this.video.viewCount;
        this.favorite = this.video.favorite;
    }

    public onFavoriteClick(id: string): void {
        this.favorite = !this.favorite
        this.favoriteSwitch = this.favorite ? MaterialIcons.favorite : MaterialIcons.favorite_outline
        this.data.loveVideo(id)
    }

    public onDeleteClick(id: string): void {
        this.data.deleteVideo(id)
    }

    public play(id: string): void {
        this.dialog.open(PlayerComponent,
            {
                data: { id }
            }
        )
    }
} 
