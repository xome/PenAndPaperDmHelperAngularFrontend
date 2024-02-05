import { Routes } from '@angular/router';
import {AdventuresComponent} from "./viewer/components/adventures/adventures.component";
import {EditAdventureComponent} from "./create-and-edit/components/edit-adventure/edit-adventure.component";

export const routes: Routes = [
  {path: '', component: AdventuresComponent},
  {path: 'newAdventure', component: EditAdventureComponent}
];
