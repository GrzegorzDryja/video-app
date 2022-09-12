import { Injectable } from '@angular/core';
import { last, Observable, Subject } from 'rxjs';
import { DEMO_VIDEOS } from '../models/demo.model';

import { Videos } from '../models/video.model';
import { VimeoResponse } from '../models/vimeo.model';
import { YouTubeResponse } from '../models/youtube.model';

@Injectable({
    providedIn: 'root'
})
export class DataService {
    private lastVideo: Videos = [];
    userVideosList: Videos = [];
    userVideosCounter = this.userVideosList.length;
    subject = new Subject<Videos>();
    love = false;

    constructor() { 
    }
    
    addYouTubeVideo(resp: YouTubeResponse){
        this.userVideosList.push(
            {
                platform: "youtube",
                id: ++this.userVideosCounter,
                favorite: false,
                date: new Date(),
                videoId: resp.items[0].id,
                playerLink: `http://www.youtube.com/embed/${resp.items[0].id}`,
                title: resp.items[0].snippet.title,
                img: resp.items[0].snippet.thumbnails.default.url,
                viewCount: resp.items[0].statistics.viewCount
            }
        );
        this.subject.next(this.userVideosList)
        localStorage.setItem("video-app", JSON.stringify(this.userVideosList));
    }
    
    addVimeoVideo(resp: VimeoResponse){
        this.userVideosList.push(
            {
                platform: "vimeo",
                id: ++this.userVideosCounter,
                favorite: false,
                date: new Date(),
                videoId: resp.video_id.toString(),
                playerLink: resp.html.split('\"')[1], //This take http://... from Vimeo respons with <iframe...
                title: resp.title,
                img: resp.thumbnail_url,
                viewCount: "Brak danych"
            }
        );
        this.subject.next(this.userVideosList)
        localStorage.setItem("video-app", JSON.stringify(this.userVideosList));
    }

    loveVideo(id: number){
        let lovedVideo = this.userVideosList.find(video => video.id === id);
                lovedVideo!.favorite = !lovedVideo!.favorite
        this.subject.next(this.userVideosList);
    }

    showFavorite(){
        this.love = !this.love;
        let lovedVideos = this.userVideosList.filter(video => video.favorite === true);
        this.subject.next(this.love ? lovedVideos : this.userVideosList)
    }
    
    deleteVideo(videoId: string){     

        this.lastVideo = this.userVideosList.filter((video, index) => {
            if(video.videoId === videoId){
                video.id = index
                return true
            }
            return false
        });
        
        this.userVideosList = this.userVideosList.filter(video => video.videoId !== videoId);
        this.subject.next(this.userVideosList);
    }

    deleteVideos(){
        this.userVideosList = [];
        this.subject.next(this.userVideosList);
    }

    undoVideo(){
        this.userVideosList.splice(this.lastVideo[0].id, 0, this.lastVideo[0]);
        this.subject.next(this.userVideosList);
    }

    sortByDate(){
        let sortedByDateVideos = this.userVideosList.reverse();     
        this.subject.next(sortedByDateVideos)
    }

    loadVideos(): Observable<Videos> {
        return this.subject.asObservable();
    }

    demoVideos(){
            // this.userVideosList = DEMO_VIDEOS;
            this.subject.next(this.userVideosList);
    }

    getLocalStorage() {
        const local = localStorage.getItem("video-app");
        if (local){
            this.userVideosList = JSON.parse(local);
        }
        this.subject.next(this.userVideosList);
    }
}
