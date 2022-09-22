import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';

import { UserInputService } from '@services/user-input.service';
import { ErrorTypes } from '@shared/errorsTypes.model';
import { inputMatchValidator } from '@features/input/validators/match.validator';
import { VideoPlatform } from '@shared/video-platform.model';
import { ID_LENGTH, MAX_LINK_LENGTH } from '@core/models/validation.model';
import { SnackBar } from '@shared/snack-bar.model';
import { Messages } from '@shared/messages.model';
import { Content } from '@shared/content.model';
import { Videos } from '@core/models/video.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit, OnDestroy {
  protected errorMessageMinLength = ErrorTypes.errorMinLength;
  protected errorMessageMaxLength = ErrorTypes.errorMaxLength;
  protected errorMessageURL = ErrorTypes.errorUrl;
  protected addButton = Content.addButton;
  protected inputLabel = Content.inputLabel;
  protected isLoading$: Observable<boolean>;

  private videosSubsription: Subscription;
  private videosList!: Videos;

  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private snackBar: MatSnackBar,
    private store: VideosFacade
  ) {
    this.isLoading$ = this.store.loading$;
    this.videosSubsription = this.store.videos$.subscribe((videosList) => this.videosList = videosList)
  }

  private checkIsVideoIdIsOnTheList(videoId: string): boolean {
    return this.videosList.every((video) => video.videoId !== videoId)
  }

  public ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      video: ['', [Validators.minLength(ID_LENGTH), Validators.maxLength(MAX_LINK_LENGTH), inputMatchValidator()]],
    });
  }

  public onAddVideo(): void {
    const dataToFetch: { platform: string; videoId: string } = {
      platform: this.userInput.extractPlatform(this.inputForm.value.video),
      videoId: this.userInput.extractId(this.inputForm.value.video),
    };

    if (dataToFetch?.platform === VideoPlatform.notSupported) {
      this.snackBar.open(Messages.video_not_supported, Messages.close, {
        duration: SnackBar.duration,
      });
      return;
    }

    if (this.checkIsVideoIdIsOnTheList(dataToFetch.videoId) === false) {
      this.snackBar.open(Messages.video_is_on_the_list, Messages.close, {
        duration: SnackBar.duration,
      });
      return;
    }

    dataToFetch.platform === VideoPlatform.vimeo
      ? this.store.addVimeoVideo({ videoPlatform: dataToFetch.platform, videoId: dataToFetch.videoId })
      : this.store.addYouTubeVideo({ videoPlatform: dataToFetch.platform, videoId: dataToFetch.videoId });

    this.inputForm.reset();
  }

  public ngOnDestroy(): void {
    this.videosSubsription.unsubscribe()
  }
}
