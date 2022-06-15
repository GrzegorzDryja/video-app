import { Component, Input, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

import { Video } from '../../models/video.model';

@Component({
    selector: 'app-item',
    templateUrl: './item.component.html',
    styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    @Input() video!: Video;
    
    thumnbnailPath!: string;
    id!: number;
    title!: string; 
    date!: Date;
    viewCount!: number;
    favorite!: string;

    constructor(private data: DataService) { }

    ngOnInit(): void {
        //This if logic will be removed to service
        this.thumnbnailPath = this.video.appData.platform === 'youtube' ? this.video.video.items[0].snippet.thumbnails.default.url : this.video.video.thumbnail_url;
        this.id = this.video.appData.platform === 'youtube' ? this.video.video.items[0].id : "1";
        this.title = this.video.appData.platform === 'youtube' ? this.video.video.items[0].snippet.title :  this.video.video.title; 
        this.date = this.video.appData.date;
        this.viewCount = this.video.appData.platform === 'youtube' ? this.video.video.items[0].statistics.viewCount : "Not known";    
        this.favorite = this.video.appData.favorite ? "favorite" : "favorite_outline"
    }

    onFavoriteClick(id: number){
        console.log("Dodam do ulubionych film: " + id);
        this.data.loveVideo(id)
    }

    onDeleteClick(id: number){
        console.log("Usunę film: " + id);
        this.data.deleteVideo(id)
    }

    play(id: number){
        console.log("Zagram w modalu film: " + id);
        // this.dialog.open(PlayerComponent, {data: {id: id}})
        }
    }
