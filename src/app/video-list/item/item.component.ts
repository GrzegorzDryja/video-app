import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'
import { MatSnackBar } from "@angular/material/snack-bar";

import { DataService } from 'src/app/services/data.service';
import { Video } from '../../models/video.model';
import { PlayerComponent } from '../player/player.component';
import { Messages } from 'src/app/shared/messages.model';

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
    playerLink!: string;
    title!: string; 
    date!: Date;
    viewCount!: string;
    favorite!: boolean;
    favoriteSwitch = "favorite_outline";

    constructor(
        private data: DataService,
        private dialog: MatDialog,
        private snackBar: MatSnackBar) {
     }

    ngOnInit(): void {
        this.thumnbnailPath = this.video.img;
        this.id = this.video.id;
        this.videoId = this.video.videoId
        this.playerLink = this.video.playerLink;
        this.title = this.video.title; 
        this.date = this.video.date;
        this.viewCount = this.video.viewCount;
        this.favorite = this.video.favorite;
    }

    onFavoriteClick(id: number){
        this.favorite = !this.favorite
        this.favoriteSwitch = this.favorite ? "favorite" : "favorite_outline"
        this.data.loveVideo(id)
        this.snackBar.open(Messages.dodales_film_do_ulubionych, Messages.zamknij, {
            duration: 5000
          });
    
    }

    onDeleteClick(id: number){
        this.data.deleteVideo(id)
        this.snackBar.open(Messages.usunales_film, Messages.zamknij, {
            duration: 5000
        })
    }

    play(id: string){
        this.dialog.open(PlayerComponent, {data: {id: this.playerLink}})
        }
    }
