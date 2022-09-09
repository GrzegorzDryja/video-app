import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { DataService } from '@services/data.service';
import { MaterialIcons } from '@shared/material-icons.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  @Output() colsNumber = new EventEmitter<number>;

  dateSortSwitch = true;
  gridChangeSwitch = true;
  favoriteSortSwith = true;
  
  gridSwitch = MaterialIcons.grid_on;
  favoriteSwitch = MaterialIcons.favorite_outline;
  delete_sweep = MaterialIcons.delete_sweep;

  sortDirection = MaterialIcons.arrow_upward;
  viewStyle = 1;
  
  constructor(private data: DataService) { }

  loadDemo(): void {
    this.data.demoVideos();
  }
  
  onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? MaterialIcons.grid_on : MaterialIcons.reorder;
    this.colsNumber.emit(this.gridChangeSwitch ? 1 : 3);
  }
  
  onFavoriteSort(): void {
    this.favoriteSortSwith = !this.favoriteSortSwith;
    this.favoriteSwitch = this.favoriteSortSwith ? MaterialIcons.favorite_outline : MaterialIcons.favorite;

    this.data.showFavorite();
  }

  onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? MaterialIcons.arrow_upward : MaterialIcons.arrow_downward;

    this.data.sortByDate();
  }

  onDeleteList(): void {
    this.data.deleteVideos();
  }
}
