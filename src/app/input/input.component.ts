import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ExtrnalErrorStateMatcher } from './external-error-state-matcher'

import { UserInputService } from '../services/user-input.service';
import { YoutubeService } from '../services/youtube.service';
import { VimeoService } from '../services/vimeo.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  public inputForm!: FormGroup;
  public externalErrorStateMatcher = new ExtrnalErrorStateMatcher()

  constructor(
    private formBuilder: FormBuilder,
    private youtube: YoutubeService, 
    private userInput: UserInputService,
    private vimeo: VimeoService
  ){}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      video: []
    })
  }

  onAddVideo(){ 
    this.externalErrorStateMatcher.setErrorStateFalse()
    
    if (this.userInput.validatePath(this.inputForm.value.video)){
      let dataToFetch = {
        platform: this.userInput.extractPlatform(this.inputForm.value.video),
        id: this.userInput.extractId(this.inputForm.value.video)
      }
      if (dataToFetch.platform == "youtube"){
        this.youtube.fetchVideo(dataToFetch.id)
      }

      if (dataToFetch.platform == "vimeo"){
        this.vimeo.fetchVideo(dataToFetch.id)
      }
    } else {
      this.externalErrorStateMatcher.setErrorStateTrue()
    }

    this.inputForm.reset()
  }
}
