import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockStore } from '@ngrx/store/testing';

import { VideosFacade } from '@store/videos.facade';
import { MaterialModule } from '@app/material.module';
import { InputComponent } from './input.component';
import { AppStateInterface } from '@app/core/models/appState.interface';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
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
    const video = component.inputForm.controls['video'];
    video.setValue('https://www.youtube.com/watch?v=c57llB8QA2E');
    video.markAsTouched();

    expect(video.errors).toBeFalsy();
  });

  it('Broken youtube link should be validated correctly', () => {
    const video = component.inputForm.controls['video'];
    video.setValue('https://www.yeuetube.com/watch?v=c57llB8QA2E');
    video.markAsTouched();

    expect(video.errors).toBeTruthy();
  });

  it('Full vimeo link should be validated correctly', () => {
    const video = component.inputForm.controls['video'];
    video.setValue('https://vimeo.com/286686563');
    video.markAsTouched();

    expect(video.errors).toBeFalsy();
  });

  it('Broken vimeo link should be validated correctly', () => {
    const video = component.inputForm.controls['video'];
    video.setValue('https://vimea.com/286686563');
    video.markAsTouched();

    expect(video.errors).toBeTruthy();
  });

  it('Should not add video if it is already in the data', () => {
    const video = component.inputForm.controls['video'];
    video.setValue('https://www.youtube.com/watch?v=c57llB8QA2E');
    video.markAsTouched();
    component.onAddVideo();
    console.log(video.value);

    //If video will bee add form will be reset
    expect(
      video.value === 'https://www.youtube.com/watch?v=c57llB8QA2E'
    ).toBeTruthy();
  });
});
