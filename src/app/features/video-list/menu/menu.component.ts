import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from '@services/data.service';

import { Content } from '@shared/content.model'

import { Content } from '../../shared/content.model'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() colsNumber = new EventEmitter<number>;

  protected tooltipGridChange = Content.tooltipGridChange;
  protected tooltipLoved = Content.tooltipLoved;
  protected tooltipSort = Content.tooltipSort;
  protected tooltipDeleteAll = Content.tooltipDeleteAll;

  dateSortSwitch = true;
  gridChangeSwitch = true;
  favoriteSortSwith = true;
  
  gridSwitch = "grid_on";
  favoriteSwitch = "favorite_outlined"

  sortDirection = "arrow_upward"
  viewStyle = 1;
  
  constructor(private data: DataService) { }
  
  ngOnInit(): void {
  }

  loadDemo(){
    this.data.demoVideos();
  }
  
  onGridChange(){
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridSwitch = this.gridChangeSwitch ? "grid_on" : "reorder";
    this.colsNumber.emit(this.gridChangeSwitch ? 1 : 3) //Magic numbers, and should by responsive
  }
  
  onFavoriteSort(){
    this.favoriteSortSwith = !this.favoriteSortSwith;
    this.favoriteSwitch = this.favoriteSortSwith ? "favorite_outlined" : "favorite";

    this.data.showFavorite();
  }

  onDateSort(){
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? "arrow_upward" : "arrow_downward";

    this.data.sortByDate();
  }

  onDeleteList(){
    this.data.deleteVideos();
  }
}
