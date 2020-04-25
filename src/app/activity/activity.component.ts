import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from '../infrastructure/activity.service';
import { ActivityInfo } from '../infrastructure/classes/ActivityRaw';
import { User } from '../infrastructure/classes/User';
import { UserService } from '../infrastructure/user.service';
import { ShortPersonalInfo } from '../infrastructure/classes/PersonalInfo';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  loaded = true;
  activityInfo: ActivityInfo;
  participants: Array<ShortPersonalInfo> = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private userService: UserService,
    ) { }

  ngOnInit() {
    this.participants = [];
    let id = this.route.snapshot.paramMap.get("activityId")
    this.activityService.activityInfo(id).subscribe((resp: ActivityInfo) => {
      this.activityInfo = resp;
      console.log(resp);
      resp.participants.forEach(
          p => this.userService.getShortPersonalInfo(p).subscribe(r => this.participants.push(r))
      )
      this.loaded=false;
    } );
    
    console.log(this.route.snapshot.paramMap.get("activityId"))
  }

  booking() {
    return this.activityService.subscribeActivity(this.activityInfo.id, this.userService.token)
    .subscribe(r =>
      this.ngOnInit()
      )

  }
}
