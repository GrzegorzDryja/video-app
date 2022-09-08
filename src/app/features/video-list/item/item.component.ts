import { Component, Input, OnInit } from '@angular/core';
import { DataService } from '@services/data.service';
import { MatDialog } from '@angular/material/dialog'

import { PlayerComponent } from '@features/player/player.component';
import { Video } from '@models/video.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    @Input() video!: Video;
    
    thumnbnailPath!: string;
    videoId!: string;
    id!: number;
    title!: string; 
    date!: Date;
    viewCount!: string;
    favorite!: boolean;
    favoriteSwitch = "favorite_outline";

    constructor(private data: DataService, private dialog: MatDialog) {
     }

    ngOnInit(): void {
        this.thumnbnailPath = this.video.img;
        this.id = this.video.id;
        this.videoId = this.video.videoId
        this.title = this.video.title; 
        this.date = this.video.date;
        this.viewCount = this.video.viewCount;
        this.favorite = this.video.favorite;
    }

    onFavoriteClick(id: number): void {
        this.favorite = !this.favorite
        this.favoriteSwitch = this.favorite ? "favorite" : "favorite_outline"
        this.data.loveVideo(id)
    }

    onDeleteClick(id: number): void {
        console.log("Usunę film: " + id);
        this.data.deleteVideo(id)
    }

    play(id: string): void {
        this.dialog.open(PlayerComponent, {data: {id: id}})
        }
    }
