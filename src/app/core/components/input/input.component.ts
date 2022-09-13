import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserInputService } from '@services/user-input.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { VideoPlatform } from '@shared/video-platform.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  constructor(private youtube: YoutubeService, private userInput: UserInputService, private vimeo: VimeoService) {}

  public onAddVideo(form: NgForm): void {
    if (this.userInput.validatePath(form.form.value.video)) {
      const dataToFetch = {
        platform: this.userInput.extractPlatform(form.form.value.video),
        id: this.userInput.extractId(form.form.value.video),
      };
      if (dataToFetch.platform === VideoPlatform.youtube) {
        this.youtube.fetchVideo(`${dataToFetch.id}`);
      }
      if (dataToFetch.platform === VideoPlatform.vimeo) {
        this.vimeo.fetchVideo(`${dataToFetch.id}`);
      }
    }
  }
}
