import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, Observable } from 'rxjs';

import { VideosFacade } from '@store/videos/videos.facade';
import { Videos } from '@core/models/video.model';
import { ID_LENGTH, MAX_LINK_LENGTH } from '@core/models/validation.model';
import { UserInputService } from '@services/user-input.service';
import { VideoPlatform } from '@shared/models/video-platform.model';
import { inputMatchValidator } from './validators/match.validator';
import { SnackBar } from '@shared/material/snack-bar.model';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent implements OnInit, OnDestroy {
  protected buttonBreakpoint = true;
  protected isLoading$: Observable<boolean>;

  private videosSubscription: Subscription;
  private breakpointSubscription: Subscription;
  private videosList: Videos;

  public inputForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userInput: UserInputService,
    private snackBar: MatSnackBar,
    private store: VideosFacade,
    private breakpointObserver: BreakpointObserver,
    private cr: ChangeDetectorRef,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.isLoading$ = this.store.loading$;
    this.setVideos();
    this.buildInputForm();
    this.setBreakpointObserver();
  }

  private setVideos(): void {
    this.videosSubscription = this.store.videos$.subscribe(
      (videosList) => (this.videosList = videosList)
    );
  }

  private buildInputForm(): void {
    this.inputForm = this.formBuilder.group({
      video: [
        '',
        [
          Validators.minLength(ID_LENGTH),
          Validators.maxLength(MAX_LINK_LENGTH),
          inputMatchValidator(),
        ],
      ],
    });
  }

  private setBreakpointObserver(): void {
    this.breakpointSubscription = this.breakpointObserver
      .observe(['(max-width: 700px)'])
      .subscribe((result) => {
        result.matches
          ? (this.buttonBreakpoint = false)
          : (this.buttonBreakpoint = true);

        this.cr.markForCheck();
      });
  }

  private checkIsVideoIdIsOnTheList(videoId: string): boolean {
    return this.videosList.every((video) => video.videoId !== videoId);
  }

  public onAddVideo(): void {
    const dataToFetch: { platform: string; videoId: string } = {
      platform: this.userInput.extractPlatform(this.inputForm.value.video),
      videoId: this.userInput.extractId(this.inputForm.value.video),
    };

    if (dataToFetch?.platform === VideoPlatform.notSupported) {
      this.snackBar.open(
        this.translate.instant('ERRORS.NOT_SUPPORTED'),
        this.translate.instant('CONTENT.CLOSE'),
        {
          duration: SnackBar.duration,
        }
      );
      return;
    }

    if (!this.checkIsVideoIdIsOnTheList(dataToFetch.videoId)) {
      this.snackBar.open(
        this.translate.instant('ERRORS.VIDEO_EXIST'),
        this.translate.instant('CONTENT.CLOSE'),
        {
          duration: SnackBar.duration,
        }
      );
      return;
    }

    dataToFetch.platform === VideoPlatform.vimeo
      ? this.store.addVimeoVideo({
          videoPlatform: dataToFetch.platform,
          videoId: dataToFetch.videoId,
        })
      : this.store.addYouTubeVideo({
          videoPlatform: dataToFetch.platform,
          videoId: dataToFetch.videoId,
        });

    this.inputForm.reset();
  }

  public ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
    this.breakpointSubscription.unsubscribe();
  }
}
