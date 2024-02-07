import {Injectable} from '@angular/core';
import {GenericDataService} from "../../service/generic-data.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdventuresApiService {

  constructor(private dataService: GenericDataService) {
  }

  readAllAdventureNames(): Observable<string[]> {
    return this.dataService.get<string[]>('/adventures');
  }

}
