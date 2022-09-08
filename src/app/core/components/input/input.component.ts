import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserInputService } from 'src/app/core/services/user-input.service';
import { YoutubeService } from 'src/app/core/services/youtube.service';
import { VimeoService } from 'src/app/core/services/vimeo.service'
@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(
    private youtube: YoutubeService, 
    private userInput: UserInputService,
    private vimeo: VimeoService
  ){}

  ngOnInit(): void {
  }

  onAddVideo(form: NgForm){
    if (this.userInput.validatePath(form.form.value.video)){
      let dataToFetch = {
        platform: this.userInput.extractPlatform(form.form.value.video),
        id: this.userInput.extractId(form.form.value.video)
      }
    if (dataToFetch.platform == "youtube"){
        this.youtube.fetchVideo(dataToFetch.id)
      }
    if (dataToFetch.platform == "vimeo"){
        this.vimeo.fetchVideo(dataToFetch.id)
      }
    } else {

      console.log("Nie obsługuję tego linku lub link zawiera błędy!")

    }
  }
}
