import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  gridStyleSwitch = true;
  gridStyle = "reorder";
  sortDateSwith = true;
  sortDirection = "arrow_upward"

  constructor() { }

  ngOnInit(): void {
  }

  onGridChange(){
    this.gridStyleSwitch = !this.gridStyleSwitch;
    this.gridStyle = this.gridStyleSwitch ? "reorder" : "grid_on";
  }

  onFavoriteSort(){
    console.log("Pokazuję ulubione");
  }

  onDateSort(){
    this.sortDateSwith = !this.sortDateSwith;
    this.sortDirection = this.sortDateSwith ? "arrow_upward" : "arrow_downward"
  }

  onDeleteList(){
    console.log("Usuwam listę z pamięci");
  }
}
