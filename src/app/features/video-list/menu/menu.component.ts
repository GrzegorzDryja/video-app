import { Component, EventEmitter, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from '@services/data.service';
import { MaterialIcons } from '@shared/material-icons.model';
import { Content } from '@shared/content.model';
import { Messages } from '@shared/messages.model';
import { SnackBar } from '@shared/snack-bar.model';
import { MatDialogService } from '@core/services/mat-dialog.service';
import { MAT_DIALOG } from '@shared/dialog/dialog.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() colsNumber = new EventEmitter<number>();

  private dateSortSwitch = true;
  private gridChangeSwitch = true;
  private favoriteSortSwith = true;
  private oneColumnGrid = 1;
  private moreColumnGrid = 3;

  protected gridSwitch = MaterialIcons.grid_on;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected delete_sweep = MaterialIcons.delete_sweep;
  protected sortDirection = MaterialIcons.arrow_upward;
  protected tooltipGridChange = Content.tooltipGridChange;
  protected tooltipLoved = Content.tooltipLoved;
  protected tooltipSort = Content.tooltipSort;
  protected tooltipDeleteAll = Content.tooltipDeleteAll;

  constructor(private data: DataService, public dialog: MatDialogService, private snackBar: MatSnackBar) {}

  public loadDemo(): void {
    this.data.demoVideos();
  }

  public onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? MaterialIcons.grid_on : MaterialIcons.reorder;
    this.colsNumber.emit(this.gridChangeSwitch ? this.oneColumnGrid : this.moreColumnGrid);
  }

  public onFavoriteSort(): void {
    this.favoriteSortSwith = !this.favoriteSortSwith;
    this.favoriteSwitch = this.favoriteSortSwith ? MaterialIcons.favorite_outline : MaterialIcons.favorite;

    this.data.showFavorite();
  }

  public onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? MaterialIcons.arrow_upward : MaterialIcons.arrow_downward;

    this.data.sortByDate(this.dateSortSwitch);
  }

  public onDeleteList(): void {    
    this.dialog.open(Content.questionDeletAll, MAT_DIALOG.actionRequiredTrue);
    this.dialog.afterClosed().subscribe((result) => {
      if (!result) {
        this.dialog.closeAll();
      return;      
      }
      this.data.deleteVideos();
      this.snackBar.open(Messages.video_list_deleted, Messages.close, {
        duration: SnackBar.duration,
      });
    })
  }
}
