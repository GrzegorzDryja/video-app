import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-player',
    templateUrl: './player.component.html',
    styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
    link;

    constructor(@Inject(MAT_DIALOG_DATA) private data: {id: string}, private sanitizer: DomSanitizer) {
        this.link = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.data.id}`);
    }

    ngOnInit(): void {    
    }
}
