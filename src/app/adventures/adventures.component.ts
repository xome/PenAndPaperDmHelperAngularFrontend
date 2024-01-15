import {Component, OnInit} from "@angular/core";
import {NgFor} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'adventures',
  standalone: true,
  templateUrl: './adventures.component.html',
  imports: [NgFor, MatButtonModule, RouterLink, MatIconModule],
  styleUrl: './adventures.component.css'
})
export class AdventuresComponent implements OnInit{
    ngOnInit(): void {
        //todo: load adventures
    }

  newAdventure() {

  }
}
