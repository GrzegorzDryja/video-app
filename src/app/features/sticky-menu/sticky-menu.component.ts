import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { VideosFacade } from '@store/videos.facade';

import { Content } from '@shared/content.model';

@Component({
  selector: 'app-sticky-menu',
  templateUrl: './sticky-menu.component.html',
  styleUrls: ['./sticky-menu.component.scss'],
})
export class StickyMenuComponent implements OnDestroy {
  private showLovedVideosSubscription: Subscription;

  protected showLovedVideosSwitch!: boolean;
  protected showAllVideos = Content.showAllVideos;
  protected showFavoriteVideos = Content.showFavoriteVideos;

  constructor(private store: VideosFacade) {
    this.showLovedVideosSubscription = this.store.showLovedVideosSwitch$.subscribe(
      (showLovedVideosSwtich) => (this.showLovedVideosSwitch = showLovedVideosSwtich)
    );
  }

  public onFavoriteSort(): void {
    this.showLovedVideosSwitch = !this.showLovedVideosSwitch;
    this.store.showLovedVideos({ showLovedVideos: this.showLovedVideosSwitch })
  }

  public ngOnDestroy(): void {
    this.showLovedVideosSubscription.unsubscribe();
  }
}
