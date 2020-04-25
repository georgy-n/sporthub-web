import { Component, OnInit } from '@angular/core';
import { HttpServiceService } from '../infrastructure/http-service.service';
import { ActivityRaw, Activity } from '../infrastructure/classes/ActivityRaw';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@Component({
  selector: 'app-search-activity',
  templateUrl: './search-activity.component.html',
  styleUrls: ['./search-activity.component.css']
})
export class SearchActivityComponent implements OnInit {
  activities: Iterable<Activity> = [];
  searchText=""
  constructor(private httpService: HttpServiceService, private router: Router) { }

  ngOnInit() {
    this.httpService.getAllActivity().subscribe((resp: Iterable<Activity>) => {
      this.activities = resp;
    } );
  }

  fullInfo(activity: Activity) {
    this.router.navigate(['/activity-info', {activityId: activity.id}]);
  }
}
