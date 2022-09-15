import { ErrorStateMatcher } from '@angular/material/core';

export class ExtrnalErrorStateMatcher implements ErrorStateMatcher {
  private valid = false;

  public isErrorState(): boolean {
    return this.valid;
  }

  public setErrorStateTrue() {
    this.valid = true;
  }

  public setErrorStateFalse() {
    this.valid = false;
  }
}
