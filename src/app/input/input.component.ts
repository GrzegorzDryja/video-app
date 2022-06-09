import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInputService } from '../services/user-input.service';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(
    private youtube: YoutubeService, 
    private userInput: UserInputService
  ){}

  ngOnInit(): void {
  }

  onAddVideo(form: NgForm){
    //Logic for validation returning object with api source and video ID -- WATCH OUT IF/IF/ELSE !!!
    //And there is too much place to configure new link!!! Work on this!
    if (this.userInput.validatePath(form.form.value.video)){
      let dataToFetch = {
        platform: this.userInput.extractPlatform(form.form.value.video),
        id: this.userInput.extractId(form.form.value.video)
      }

      if (dataToFetch.platform == "youtube"){
        this.youtube.fetchVideo(dataToFetch.id)
      }

      if (dataToFetch.platform == "vimeo"){
        console.log("Wysyłem GET request do Vimeo")
      }

    } else {
      console.log("Nie obsługuję tego linku lub link zawiera błędy")
    }
  }
}
