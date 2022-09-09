import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ValidateUrl } from './url.validator';

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

  constructor(
    private formBuilder: FormBuilder,
    private youtube: YoutubeService, 
    private userInput: UserInputService,
    private vimeo: VimeoService
  ){}

  ngOnInit(): void {
    this.inputForm = this.formBuilder.group({
      video: ['', ValidateUrl ]
    })
  }

  onAddVideo(){
    console.log("klikłeś")
    // if (this.userInput.validatePath(form.form.value.video)){
    //   let dataToFetch = {
    //     platform: this.userInput.extractPlatform(form.form.value.video),
    //     id: this.userInput.extractId(form.form.value.video)
    //   }

    //   if (dataToFetch.platform == "youtube"){
    //     this.youtube.fetchVideo(dataToFetch.id)
    //   }

    //   if (dataToFetch.platform == "vimeo"){
    //     this.vimeo.fetchVideo(dataToFetch.id)
    //   }

    // } else {
    //   console.error("eeeeyyy");
    // }
  }
}
