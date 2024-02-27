import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';
import { Videos } from '@core/models/video.model';
import { ID_LENGTH, MAX_LINK_LENGTH } from '@core/models/validation.model';
import { UserInputService } from '@services/user-input.service';
import { VideoPlatform } from '@app/shared/models/video-platform.model';
import { ErrorTypes } from '@app/shared/models/errors-types.model';
import { SnackBar } from '@app/shared/material/snack-bar.model';
import { Messages } from '@app/shared/models/messages.model';
import { Content } from '@app/shared/models/content.model';
import { inputMatchValidator } from './validators/match.validator';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnDestroy {
  protected errorMessageMinLength = ErrorTypes.errorMinLength;
  protected errorMessageMaxLength = ErrorTypes.errorMaxLength;
  protected errorMessageURL = ErrorTypes.errorUrl;
  protected addButton = Content.addButton;
  protected inputLabel = Content.inputLabel;
  protected isLoading$: Observable<boolean>;

  private videosSubscription: Subscription;
  private videosList: Videos;

  public inputForm: FormGroup;

  constructor (
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private snackBar: MatSnackBar,
    private store: VideosFacade
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.store.loading$;
    this.videosSubscription = this.store.videos$.subscribe((videosList) => this.videosList = videosList)
    this.inputForm = this.formBuilder.group({
      video: ['', [Validators.minLength(ID_LENGTH), Validators.maxLength(MAX_LINK_LENGTH), inputMatchValidator()]],
    });
  }

  private checkIsVideoIdIsOnTheList(videoId: string): boolean { 
    return this.videosList.every((video) => video.videoId !== videoId)
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

    if (!this.checkIsVideoIdIsOnTheList(dataToFetch.videoId)) {
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
    this.videosSubscription.unsubscribe()
  }
}
