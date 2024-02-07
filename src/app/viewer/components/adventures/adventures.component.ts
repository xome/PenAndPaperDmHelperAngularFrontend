import {Component, OnInit} from "@angular/core";
import {NgFor} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {RouterLink} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {HttpClientModule} from "@angular/common/http";
import {catchError, EMPTY, ObservableInput, retry} from "rxjs";
import {Adventure} from "../../../model/adventure";
import {AdventuresApiService} from "../../api/adventures-api.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'adventures',
  standalone: true,
  templateUrl: './adventures.component.html',
  imports: [NgFor, MatButtonModule, RouterLink, MatIconModule, HttpClientModule],
  styleUrl: './adventures.component.css'
})
export class AdventuresComponent implements OnInit {
  protected adventures: Adventure[] = [];
  private loading: boolean = true;

  constructor(private adventureApi: AdventuresApiService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.getAdventures();
  }

  getAdventures() {
    this.adventureApi.readAllAdventureNames()
      .pipe(
        retry(5),
        catchError((err, caught): ObservableInput<string[]> => {
          this.snackbar.open('Error retrieving Adventures. Try again later.', 'okay');
          return EMPTY;
        }))
      .subscribe(adventureNames =>
        this.adventures = adventureNames
          .map(adventureName => new Adventure(adventureName, [])));
  }

}
