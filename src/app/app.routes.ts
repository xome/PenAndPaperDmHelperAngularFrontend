import { Routes } from '@angular/router';
import {AdventuresComponent} from "./adventures/adventures.component";
import {EditAdventureComponent} from "./edit-adventure/edit-adventure.component";

export const routes: Routes = [
  {path: '', component: AdventuresComponent},
  {path: 'newAdventure', component: EditAdventureComponent}
];
