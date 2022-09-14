import { AbstractControl, FormGroupDirective, NgForm } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

import { DataService } from '@core/services/data.service';
import { UserInputService } from '@core/services/user-input.service';

export class ExtrnalErrorStateMatcher implements ErrorStateMatcher {
  constructor(private data: DataService, private userInput: UserInputService) {}

  isErrorState(control: AbstractControl<any, any> | null, form: FormGroupDirective | NgForm | null): boolean {
    if(control?.touched){
      control?.setErrors({
        empty: true,
      });
      return true;
    }    
    if (control!.value) {
      let dataToFetch = {
        platform: this.userInput.extractPlatform(control!.value),
        videoId: this.userInput.extractId(control!.value),
      };
      if (dataToFetch.videoId === 'No ID found') {
        control?.setErrors({
          errorId: true,
        });
        return true;
      }
      if (!this.data.checkVideoIn(dataToFetch.videoId)) {
        control?.setErrors({
          videoIsOnTheList: true,
        });
        return true;
      }
    }
    return false;
  }
}
