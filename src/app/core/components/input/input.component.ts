import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { UserInputService } from '@services/user-input.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service'
import { Platform } from '@shared/platform.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {

  constructor(
    private youtube: YoutubeService, 
    private userInput: UserInputService,
    private vimeo: VimeoService
  ){}

  public onAddVideo(form: NgForm): void {
    if (this.userInput.validatePath(form.form.value.video)){
      const dataToFetch = {
        platform: this.userInput.extractPlatform(form.form.value.video),
        id: this.userInput.extractId(form.form.value.video)
      }
      if (dataToFetch.platform === Platform.youtube){
        this.youtube.fetchVideo(`${dataToFetch.id}`)
      }
      if (dataToFetch.platform === Platform.vimeo){
        this.vimeo.fetchVideo(`${dataToFetch.id}`)
      }
    }
  }
}
