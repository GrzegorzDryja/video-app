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
    private userInput: UserInputService) { }

  ngOnInit(): void {
  }

  onAddVideo(form: NgForm){
    //Logic for validation returning object with api source and video ID -- WATCH OUT IF/IF/ELSE !!!
    if (this.userInput.validate(form.form.value.video)){
      let dataToFetch = this.userInput.separate(form.form.value.video)

      if (dataToFetch.id?.input){
        this.youtube.fetchVideo(dataToFetch.id.input)
      }

    } else {
      console.log("Nie obsługuję tego linku lub link zawiera błędy")
    }
  }
}
