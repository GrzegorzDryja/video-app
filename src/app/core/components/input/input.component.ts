import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { UserInputService } from '@services/user-input.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { VideoPlatform } from '@shared/video-platform.model';
import { DataService } from '@core/services/data.service';
import { ExtrnalErrorStateMatcher } from './external-error-state-matcher';
import { Content } from '@shared/content.model';

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
  protected errorEmpty = Content.errorEmpty;

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
  private switcher = false;    

  public onAddVideo(): void {
    if (this.inputForm.value.video === null) {
      this.switcher = !this.switcher
      this.switcher ? this.inputForm.markAllAsTouched() : this.inputForm.markAsUntouched()
    } else if (this.userInput.validatePath(this.inputForm.value.video)) {
      const dataToFetch = {
        platform: this.userInput.extractPlatform(this.inputForm.value.video),
        id: this.userInput.extractId(this.inputForm.value.video),
      };
      if (dataToFetch.platform === VideoPlatform.youtube && this.data.checkVideoIn(dataToFetch.id)) {
        this.youtube.fetchVideo(`${dataToFetch.id}`);
      }
      if (dataToFetch.platform === VideoPlatform.vimeo && this.data.checkVideoIn(dataToFetch.id)) {
        this.vimeo.fetchVideo(`${dataToFetch.id}`);
      }
    } else {
      this.inputForm.reset();
    }
  }
}
