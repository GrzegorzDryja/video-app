import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { YoutubeService } from '../services/youtube.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {

  constructor(private youtube: YoutubeService) { }

  ngOnInit(): void {
  }

  onAddVideo(form: NgForm){
    this.youtube.fetchVideo(form.form.value.video)
  }
}
