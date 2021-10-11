import { Component, OnInit } from '@angular/core';
import { PullRequest } from '../models/pull-request';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  public pullRequests: PullRequest[] = [
    {
      id:1,
      problemId:'test',
      nickname:'dmitry-mingazov'
    },
    {
      id:2,
      problemId:'test2',
      nickname:'dmitry-mingazov'
    },
    {
      id:3,
      problemId:'test3',
      nickname:'dmitry-mingazov'
    }
  ]

  constructor() { }

  ngOnInit(): void {

  }

}
