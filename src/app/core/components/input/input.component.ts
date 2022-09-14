import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { UserInputService } from '@services/user-input.service';
import { DataService } from '@core/services/data.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { VideoPlatform } from '@shared/video-platform.model';
import { ExtrnalErrorStateMatcher } from './external-error-state-matcher';
import { Content } from '@shared/content.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  protected errorMessage = Content.errorDefault;
  public inputForm!: FormGroup;
  public externalErrorStateMatcher = new ExtrnalErrorStateMatcher();

  constructor(
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private data: DataService,
    private youtube: YoutubeService,
    private vimeo: VimeoService
  ) {}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      video: [],
    });
  }

  public onAddVideo(): void {
    this.externalErrorStateMatcher.setErrorStateFalse();

    if (this.userInput.validatePath(this.inputForm.value.video)) {
      const dataToFetch = {
        platform: this.userInput.extractPlatform(this.inputForm.value.video),
        videoId: this.userInput.extractId(this.inputForm.value.video),
      };
      if (!this.data.checkVideoIn(dataToFetch.videoId)){
        this.errorMessage = Content.errorVideoExist;
        this.externalErrorStateMatcher.setErrorStateTrue()
      } 
      if(this.data.checkVideoIn(dataToFetch.videoId) && dataToFetch.platform === VideoPlatform.youtube) {
        this.youtube.fetchVideo(`${dataToFetch.videoId}`);
      }
      if (this.data.checkVideoIn(dataToFetch.videoId) && dataToFetch.platform === VideoPlatform.vimeo) {
        this.vimeo.fetchVideo(`${dataToFetch.videoId}`);
      }
    } else {
      this.errorMessage = Content.errorUrl
      this.externalErrorStateMatcher.setErrorStateTrue();
    }

    this.inputForm.reset();
  }
}
