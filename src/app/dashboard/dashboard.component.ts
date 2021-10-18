import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { EditPullRequestDialogComponent } from '../dialogs/edit-pull-request-dialog.component';
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

  public expandedElement: string = '';

  public displayedColumns = ['id', 'problemId', 'nickname', 'mergeTime', 'bonusPoints', 'bonusComment','actions'];

  @ViewChild('prTable') prTable: MatTable<PullRequest>;

  constructor(
    private pullRequestService: PullRequestService,
    private dialog: MatDialog
    ) { }

  ngOnInit(): void {
    let pr$ = environment.debug ? this.pullRequestService.getPullRequestsMOCK() : this.pullRequestService.getPullRequests();
    pr$.subscribe(prs => {
      this.pullRequests = prs;
    });
  }

  public editPullRequest(pullRequestId: number): void {
    let tmp = this.dialog.open(EditPullRequestDialogComponent, {
      data: this.pullRequests.find(pr => pullRequestId === pr.id)
    }).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      if (value.command) {
        if (value.command == 'delete') {
          let pr$ = environment.debug ? this.pullRequestService.deletePullRequestMOCK(value.pr) : this.pullRequestService.deletePullRequest(value.pr);
          pr$.subscribe(pr => {
            let index = this.pullRequests.findIndex(el => el.id === value.pr.id);
            this.pullRequests.splice(index,1);
          });
        } else if (value.command == 'update') {
          let pr$ = environment.debug ? this.pullRequestService.updatePullRequestMOCK(value.pr) : this.pullRequestService.updatePullRequest(value.pr);
          pr$.subscribe(pr => {
            let index = this.pullRequests.findIndex(el => el.id === pr.id);
            this.pullRequests.splice(index,1);
            this.pullRequests.push(pr);
          });
        }
        this.prTable.renderRows();
      }
    });
  }

}
