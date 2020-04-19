import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { ActivityRaw, Activity } from '../infrastructure/classes/ActivityRaw';

@Component({
  selector: 'app-search-activity',
  templateUrl: './search-activity.component.html',
  styleUrls: ['./search-activity.component.css']
})
export class SearchActivityComponent implements OnInit {
  activities: Iterable<Activity> = [];
  constructor(private httpService: HttpServiceService) { }

  ngOnInit() {
    this.httpService.getAllActivity().subscribe((resp: Iterable<Activity>) => {
      this.activities = resp;
    } );
  }

}
