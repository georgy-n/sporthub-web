import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ActivityService } from '../infrastructure/activity.service';
import { ActivityInfo } from '../infrastructure/classes/ActivityRaw';
import { User } from '../infrastructure/classes/User';
import { UserService } from '../infrastructure/user.service';
import { ShortPersonalInfo } from '../infrastructure/classes/PersonalInfo';
import { CommentRaw, Comment } from '../infrastructure/classes/Comment';
import { CommentRequest } from '../infrastructure/classes/CommentRequest';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  commentForm: FormGroup;
  loaded = true;
  isOwner = false;
  activityInfo: ActivityInfo;
  participants: Array<ShortPersonalInfo> = [];
  comments: Array<Comment> = [];
  commentators: Array<ShortPersonalInfo> = [];
  owner: ShortPersonalInfo;
  logged = false;
  isSubsribed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private activityService: ActivityService,
    private userService: UserService,
    private formBuilder: FormBuilder
    ) {  }

  ngOnInit() {
    this.commentForm = this.formBuilder.group({
      message: ['', [ Validators.required, Validators.maxLength(500) ]]
    });

    this.participants = [];
    let id = this.route.snapshot.paramMap.get("activityId")
    this.activityService.getComments(parseInt(id)).subscribe((resp: Array<Comment>) => {
      this.comments = resp;
      resp.forEach(element => {
        this.userService.getShortPersonalInfo(element.commentOwner).subscribe(r => this.commentators.push(r))
      });
    });
    
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

  findOwner(ownerId: string) {
    return this.commentators.find(c => c.id === ownerId);
  }

  addComment() {
    let controls = this.commentForm.controls
    let date3 = new Date()
    let date = date3.getUTCFullYear() +
    '-' + this.pad(date3.getUTCMonth() + 1) +
    '-' + this.pad(date3.getUTCDate()) +
    'T' + this.pad(date3.getHours())  +
    ':' + this.pad(date3.getMinutes()) +
    ':' + this.pad(date3.getSeconds())

    let commentRequest = new CommentRequest(
      this.activityInfo.id,
      controls.message.value,
      date
    )
    console.log(JSON.stringify(commentRequest));
    this.activityService.addComment(commentRequest, this.userService.token).subscribe(
      act => {
        this.ngOnInit()
      },
      err => {
      }
    )
  }
  pad(number) {
    if (number < 10) {
      return '0' + number;
    }
    return number;
  }
}
