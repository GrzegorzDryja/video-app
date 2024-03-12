import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

import { MaterialIcons } from '@shared/material/material-icons.model';
import { SnackBar } from '@shared/material/snack-bar.model';
import { MatDialogService } from '@core/services/mat-dialog.service';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';
import { VideosFacade } from '@store/videos/videos.facade';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnDestroy {
  @Output() colsNumber = new EventEmitter<number>();
  @Output() showFavorite = new EventEmitter<boolean>();
  @Output() sortSwitch = new EventEmitter<boolean>();

  private videosSubscription: Subscription;
  private dateSortSwitch = true;
  private gridChangeSwitch = true;
  private favoriteSortSwitch = false;
  private oneColumnGrid = 1;
  private moreColumnGrid = 3;

  protected demoSwitch = true;
  protected gridSwitch = MaterialIcons.reorder;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected deleteSweep = MaterialIcons.delete_sweep;
  protected sortDirection = MaterialIcons.arrow_downward;

  constructor(
    public dialog: MatDialogService,
    private snackBar: MatSnackBar,
    private store: VideosFacade,
    public translate: TranslateService
  ) {}

  public ngOnInit(): void {
    this.videosSubscription = this.store.videos$.subscribe(
      (videos) => (this.demoSwitch = videos.length !== 0)
    );
  }

  public loadDemo(): void {
    this.store.loadDemoVideos();
  }

  public onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch
      ? MaterialIcons.reorder
      : MaterialIcons.grid_on;
    this.colsNumber.emit(
      this.gridChangeSwitch ? this.oneColumnGrid : this.moreColumnGrid
    );
  }

  public onFavoriteSort(): void {
    this.favoriteSortSwitch = !this.favoriteSortSwitch;
    this.favoriteSwitch = this.favoriteSortSwitch
      ? MaterialIcons.favorite
      : MaterialIcons.favorite_outline;
    this.showFavorite.emit(this.favoriteSortSwitch);
  }

  public onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch
      ? MaterialIcons.arrow_downward
      : MaterialIcons.arrow_upward;
    this.sortSwitch.emit(this.dateSortSwitch);
  }

  public onDeleteList(): void {
    this.dialog.open(
      this.translate.instant('CONTENT.QUESTION_DELETE_ALL'),
      MAT_DIALOG.actionRequiredTrue
    );
    this.dialog.afterClosed().subscribe((result) => {
      if (!result) {
        this.dialog.closeAll();
        return;
      }
      this.store.deleteVideosList();
      this.snackBar.open(this.translate.instant('MESSAGES.LIST_DELETED'), this.translate.instant('CONTENT.CLOSE'), {
        duration: SnackBar.duration,
      });
    });
  }

  public ngOnDestroy(): void {
    this.videosSubscription.unsubscribe();
  }
}
