import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  gridChangeSwitch = true;
  favoriteSortSwith = true;
  dateSortSwitch = true;

  gridStyle = "reorder";
  sortDirection = "arrow_upward"
  viewStyle = 1;

  constructor(private data: DataService) { }

  ngOnInit(): void {
  }

  onGridChange(){
    this.gridChangeSwitch = !this.gridChangeSwitch;
    this.gridStyle = this.gridChangeSwitch ? "reorder" : "grid_on";
  }

  onFavoriteSort(){
    //Wywołanie funkcji sortującej
  }

  onDateSort(){
    this.dateSortSwitch = !this.dateSortSwitch;
    this.sortDirection = this.dateSortSwitch ? "arrow_upward" : "arrow_downward";
    console.log("Sortuję po dacie dodania filmu do ulubionych")
  }

  onDeleteList(){
    this.data.deleteVideos();
  }
}
