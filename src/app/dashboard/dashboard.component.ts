import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Problem } from '../models/problem';
import { PullRequest } from '../models/pull-request';
import { User } from '../models/user';
import { PullRequestService } from '../services/pull-request.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pullRequests: PullRequest[] = [];
  public problems: Problem[] = [];
  public users: User[] = [];

  public displayedColumns = ['id', 'problemId', 'nickname', 'mergeTime', 'bonusPoints', 'bonusComment','actions'];

  constructor(private pullRequestService: PullRequestService) { }

  ngOnInit(): void {
    let pr$ = environment.debug ? this.pullRequestService.getPullRequestsMOCK() : this.pullRequestService.getPullRequests();
    pr$.subscribe(prs => {
      this.pullRequests = prs;
    });
  }

  public editPullRequest(pullRequestId: number): void {

  }

}
