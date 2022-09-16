import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';

import { UserInputService } from '@services/user-input.service';
import { DataService } from '@core/services/data.service';
import { YoutubeService } from '@services/youtube.service';
import { VimeoService } from '@services/vimeo.service';
import { VideoPlatform } from '@shared/video-platform.model';
import { ErrorTypes } from '@shared/errorsTypes.model';
import { inputValidator } from '@features/input/input.validator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent {
  protected errorMessage = ErrorTypes.errorLength;
  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private data: DataService,
    private youtube: YoutubeService,
    private vimeo: VimeoService
  ) {}

  private ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      video: ['', { validators: [inputValidator()] }],
    });
  }

  public onAddVideo(): void {
    const dataToFetch: { platform: string; videoId: string } = {
      platform: this.userInput.extractPlatform(this.inputForm.value.video),
      videoId: this.userInput.extractId(this.inputForm.value.video),
    };
    const fetchPlatform: any = {
      youtube: () => this.youtube.fetchVideo(`${dataToFetch.videoId}`),
      vimeo: () => this.vimeo.fetchVideo(`${dataToFetch.videoId}`),
    };

    if (!this.data.checkIfVideoIdIsOnTheList(dataToFetch.videoId)) {
      //Po zatwierdzeniu snack bara wyrzucę tu komunikat
    } else {
      fetchPlatform[dataToFetch.platform]();
    }
  }
}
