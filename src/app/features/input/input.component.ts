import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as VideosActions from '@core/store/videos.actions';
import { AppStateInterface } from '@core/models/appState.interface';
import { isLoadingSelector } from '@core/store/videos.selectors';

import { UserInputService } from '@services/user-input.service';
import { DataService } from '@core/services/data.service';
import { ErrorTypes } from '@shared/errorsTypes.model';
import { inputMatchValidator } from '@features/input/validators/match.validator';
import { VideoPlatform } from '@shared/video-platform.model';
import { ID_LENGTH, MAX_LINK_LENGTH } from '@core/models/validation.model';
import { SnackBar } from '@shared/snack-bar.model';
import { Messages } from '@shared/messages.model';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  protected errorMessageMinLength = ErrorTypes.errorMinLength;
  protected errorMessageMaxLength = ErrorTypes.errorMaxLength;
  protected errorMessageURL = ErrorTypes.errorUrl;
  protected isLoading$: Observable<boolean>;

  public inputForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private data: DataService,
    private snackBar: MatSnackBar,
    private store: Store<AppStateInterface>
  ) {
    this.isLoading$ = this.store.select(isLoadingSelector);
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

    if (!this.data.checkIfVideoIdIsOnTheList(dataToFetch.videoId)) {
      this.snackBar.open(Messages.video_is_on_the_list, Messages.close, {
        duration: SnackBar.duration,
      });
      return;
    }

    dataToFetch.platform === VideoPlatform.vimeo
      ? this.store.dispatch(
          VideosActions.addVimeoVideo({ videoPlatform: dataToFetch.platform, videoId: dataToFetch.videoId })
        )
      : this.store.dispatch(
          VideosActions.addYouTubeVideo({ videoPlatform: dataToFetch.platform, videoId: dataToFetch.videoId })
        );

    this.inputForm.reset();
  }
}
