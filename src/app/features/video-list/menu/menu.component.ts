import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MaterialIcons } from '@shared/material-icons.model';
import { Content } from '@shared/content.model';
import { Messages } from '@shared/messages.model';
import { SnackBar } from '@shared/snack-bar.model';
import { MatDialogService } from '@core/services/mat-dialog.service';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';
import { VideosFacade } from '@store/videos.facade';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnDestroy {
  @Output() sortSwitch = new EventEmitter<boolean>();
  @Output() gridSwitch = new EventEmitter<boolean>();

  private videosSubscription: Subscription;
  private dateSortSwitch = true;
  private gridChangeSwitch = true;
  private favoriteSortSwith = true;

  protected demoSwitch!: boolean;
  protected videosLenght = 0;
  protected toolboxActionTitle = Content.toolboxActionTitle;
  protected toolboxActionClearAll = Content.toolboxActionClearAll;
  protected toolboxActionLoadDemo = Content.toolboxActionLoadDemo;
  protected toolboxSortTitle = Content.toolboxSortTitle;
  protected toolboxSortFromNew = Content.toolboxSortFromNew;
  protected toolboxSortFromOld = Content.toolboxSortFromOld;
  protected toolboxLayoutTitle = Content.toolboxLayoutTitle;
  protected toolboxLayoutList = Content.toolboxLayoutList;
  protected toolboxLayoutGrid = Content.toolboxLayoutGrid;

  constructor(public dialog: MatDialogService, private snackBar: MatSnackBar, private store: VideosFacade) {
    this.videosSubscription = this.store.videos$.subscribe((videos) => (this.demoSwitch = videos.length === 0));
  }

  public loadDemo(): void {
    if (this.demoSwitch) {
      this.store.loadDemoVideos();
    }
  }

  public onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch.emit(this.gridChangeSwitch);
  }

  public onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortSwitch.emit(this.dateSortSwitch);
  }

  public onDeleteList(): void {
    this.dialog.open(Content.questionDeletAll, MAT_DIALOG.actionRequiredTrue);
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
    this.videosSubscription.unsubscribe();
  }
}
