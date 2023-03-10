import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { MaterialIcons } from '@shared/material-icons.model';
import { Content } from '@shared/content.model';
import { Messages } from '@shared/messages.model';
import { SnackBar } from '@shared/snack-bar.model';
import { MatDialogService } from '@core/services/mat-dialog.service';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';
import { VideosFacade } from '@store/videos.facade';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  @Output() colsNumber = new EventEmitter<number>();
  @Output() showFavorite = new EventEmitter<boolean>()
  @Output() sortSwitch = new EventEmitter<boolean>()

  private videosSubscription: Subscription;
  private dateSortSwitch = true;
  private gridChangeSwitch = true;
  private favoriteSortSwitch = true;
  private oneColumnGrid = 1;
  private moreColumnGrid = 3;

  protected demoSwitch = true;
  protected videosLength = 0;
  protected gridSwitch = MaterialIcons.grid_on;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected delete_sweep = MaterialIcons.delete_sweep;
  protected sortDirection = MaterialIcons.arrow_downward;
  protected tooltipGridChange = Content.tooltipGridChange;
  protected tooltipLoved = Content.tooltipLoved;
  protected tooltipSort = Content.tooltipSort;
  protected tooltipDeleteAll = Content.tooltipDeleteAll;

  constructor(
    public dialog: MatDialogService,
    private snackBar: MatSnackBar,
    private store: VideosFacade
  ) {
    this.videosSubscription = this.store.videos$.subscribe(videos => this.demoSwitch = videos.length !== 0)
  }

  public loadDemo(): void {
    this.store.loadDemoVideos()
  }

  public onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? MaterialIcons.grid_on : MaterialIcons.reorder;
    this.colsNumber.emit(this.gridChangeSwitch ? this.oneColumnGrid : this.moreColumnGrid);
  }

  public onFavoriteSort(): void {
    this.favoriteSortSwitch = !this.favoriteSortSwitch;
    this.favoriteSwitch = this.favoriteSortSwitch ? MaterialIcons.favorite : MaterialIcons.favorite_outline;
    this.showFavorite.emit(this.favoriteSortSwitch)
  }

  public onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? MaterialIcons.arrow_downward : MaterialIcons.arrow_upward;
    this.sortSwitch.emit(this.dateSortSwitch)
  }

  public onDeleteList(): void {
    this.dialog.open(Content.questionDeleteAll, MAT_DIALOG.actionRequiredTrue);
    this.dialog.afterClosed().subscribe((result) => {
      if (!result) {
        this.dialog.closeAll();
        return;
      }
      this.store.deleteVideosList();
      this.snackBar.open(Messages.video_list_deleted, Messages.close, {
        duration: SnackBar.duration,
      });
    });
  }

  public ngOnDestroy(): void {    
    this.videosSubscription.unsubscribe()
  }
}
