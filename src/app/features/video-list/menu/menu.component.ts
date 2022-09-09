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

  private dateSortSwitch = true;
  private gridChangeSwitch = true;
  private favoriteSortSwith = true;
  
  protected gridSwitch = MaterialIcons.grid_on;
  protected favoriteSwitch = MaterialIcons.favorite_outline;
  protected delete_sweep = MaterialIcons.delete_sweep;
  protected sortDirection = MaterialIcons.arrow_upward;
  
  constructor(private data: DataService) {}

  public loadDemo(): void {
    this.data.demoVideos();
  }
  
  public onGridChange(): void {
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? MaterialIcons.grid_on : MaterialIcons.reorder;
    this.colsNumber.emit(this.gridChangeSwitch ? 1 : 3);
  }
  
  public onFavoriteSort(): void {
    this.favoriteSortSwith = !this.favoriteSortSwith;
    this.favoriteSwitch = this.favoriteSortSwith ? MaterialIcons.favorite_outline : MaterialIcons.favorite;

    this.data.showFavorite();
  }

  public onDateSort(): void {
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? MaterialIcons.arrow_upward : MaterialIcons.arrow_downward;

    this.data.sortByDate();
  }

  public onDeleteList(): void {
    this.data.deleteVideos();
  }
}
