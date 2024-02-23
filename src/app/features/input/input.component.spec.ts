import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AbstractControl, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { VideosFacade } from '@store/videos.facade';
import { MaterialModule } from '@app/material.module';
import { AppStateInterface } from '@core/models/appState.interface';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  const STORE_MOCK = {
    initialState: {
      videos: {
        error: '',
        isLoading: false,
        lastDeletedVideo: [],
        videos: [
          {
            videoId: 'c57llB8QA2E',
            date: '',
            favorite: false,
            img: '',
            platform: '',
            title: '',
            viewCount: '0',
          },
        ],
      },
    },
  };

  const createVideo = (value: string): AbstractControl => {
    const video = component.inputForm.controls['video'];
    video.setValue(value);
    video.markAsTouched();
    return video;
  };

  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [MaterialModule, ReactiveFormsModule, BrowserAnimationsModule],
      declarations: [InputComponent],
      providers: [
        VideosFacade,
        provideMockStore<AppStateInterface>(STORE_MOCK),
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Input field should be there', () => {
    expect(component).toBeTruthy();
  });

  it('Full youtube link should be validated correctly', () => {
    const video = createVideo('https://www.youtube.com/watch?v=c57llB8QA2E')

    expect(video.errors).toBeFalsy();
  });

  it('Broken youtube link should be validated correctly', () => {
    const video = createVideo('https://www.yeuetube.com/watch?v=c57llB8QA2E');

    expect(video.errors).toBeTruthy();
  });

  it('Full vimeo link should be validated correctly', () => {
    const video = createVideo('https://vimeo.com/286686563');

    expect(video.errors).toBeFalsy();
  });

  it('Broken vimeo link should be validated correctly', () => {
    const video = createVideo('https://vimea.com/286686563');

    expect(video.errors).toBeTruthy();
  });

  it('Should not add video if it is already in the data', () => {
    const LINK = 'https://www.youtube.com/watch?v=c57llB8QA2E';
    const video = createVideo(LINK);
    component.onAddVideo();

    //If video will bee added, form will be reset
    expect(video.value === LINK).toBeTruthy();
  });
});
