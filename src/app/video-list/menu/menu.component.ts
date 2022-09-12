import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import { DataService } from 'src/app/services/data.service';
import { Messages } from 'src/app/shared/messages.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  @Output() colsNumber = new EventEmitter<number>;

  dateSortSwitch = true;
  gridChangeSwitch = true;
  favoriteSortSwith = true;
  
  gridSwitch = "grid_on";
  favoriteSwitch = "favorite_outlined"

  sortDirection = "arrow_upward"
  viewStyle = 1;
  
  constructor(
    private data: DataService,
    private snackBar: MatSnackBar) { }
  
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
    this.snackBar.open(Messages.usunales_liste, Messages.zamknij, {
      duration: 5000
    })
  }
}
