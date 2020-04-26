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
  isOwner = false;
  activityInfo: ActivityInfo;
  participants: Array<ShortPersonalInfo> = [];
  owner: ShortPersonalInfo;
  logged = false;
  isSubsribed = false;

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
      
      this.userService.getShortPersonalInfo(resp.owner).subscribe(r => {
        this.owner = r;
        this.isOwner = this.userService.user !== undefined && r.id === this.userService.user.id;
        this.isSubsribed = this.userService.user !== undefined && 
                           this.participants.some(r => r.id === this.userService.user.id)
        this.loaded=false;
      })
      this.userService.isUserLoggedIn.subscribe(l => this.logged = l)    
    } );
    
  }

  subscribe() {
    return this.activityService.subscribeActivity(this.activityInfo.id, this.userService.token)
    .subscribe(r =>
      this.ngOnInit()
      )
  }

  unSubscribe() {
    return this.activityService.unSubscribeActivity(this.activityInfo.id, this.userService.token)
    .subscribe(r =>
      this.ngOnInit()
      )
  }

  login() {
    this.router.navigate(['/login']);
  }
}
