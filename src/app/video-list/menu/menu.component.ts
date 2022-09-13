import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DataService } from 'src/app/services/data.service';
import { Content } from 'src/app/shared/content.model';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent {
  @Output() colsNumber = new EventEmitter<number>();

  dateSortSwitch = true;
  gridChangeSwitch = true;
  favoriteSortSwith = true;

  gridSwitch = 'grid_on';
  favoriteSwitch = 'favorite_outlined';

  sortDirection = 'arrow_upward';
  viewStyle = 1;

  constructor(private data: DataService, public dialog: MatDialog) {}

  loadDemo() {
    this.data.demoVideos();
  }

  onGridChange() {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? 'grid_on' : 'reorder';
    this.colsNumber.emit(this.gridChangeSwitch ? 1 : 3);
  }

  onFavoriteSort() {
    this.favoriteSortSwith = !this.favoriteSortSwith;
    this.favoriteSwitch = this.favoriteSortSwith ? 'favorite_outlined' : 'favorite';

    this.data.showFavorite();
  }

  onDateSort() {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? 'arrow_upward' : 'arrow_downward';

    this.data.sortByDate();
  }

  onDeleteList() {
    const dialog = this.dialog.open(DialogComponent, {
      data: Content.questionDeletAll,
    });

    dialog.afterClosed().subscribe((result) => (result ? this.data.deleteVideos() : this.dialog.closeAll()));
  }
}
