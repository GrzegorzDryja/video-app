import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInputService } from '@services/user-input.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { VideoPlatform } from '@shared/video-platform.model';
import { DataService } from '@core/services/data.service';
import { ExtrnalErrorStateMatcher } from './external-error-state-matcher';
import { Content } from '@shared/content.model'

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  public inputForm!: FormGroup;
  public externalErrorStateMatcher = new ExtrnalErrorStateMatcher(this.data, this.userInput);

  protected videoIsOnTheList = Content.errorVideoExist;
  protected errorId = Content.errorUrl;

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
    if (this.userInput.validatePath(this.inputForm.value.video)) {
      const dataToFetch = {
        platform: this.userInput.extractPlatform(this.inputForm.value.video),
        id: this.userInput.extractId(this.inputForm.value.video),
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
