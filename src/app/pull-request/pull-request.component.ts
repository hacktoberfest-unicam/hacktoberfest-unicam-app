import { DataSource } from '@angular/cdk/collections';
import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Command } from '../dialogs/command.enum';
import { PullRequestDialogComponent } from '../dialogs/pull-request-dialog.component';
import { Problem } from '../models/problem';
import { PullRequest } from '../models/pull-request';
import { User } from '../models/user';
import { PullRequestService } from '../services/pull-request.service';

@Component({
  selector: 'app-pull-request',
  templateUrl: './pull-request.component.html',
  styleUrls: ['./pull-request.component.scss']
})
export class PullRequestComponent implements OnInit, AfterViewInit {
  public dataSource: MatTableDataSource<PullRequest> = new MatTableDataSource();
  public pullRequests: PullRequest[] = [];
  public problems: Problem[] = [];
  public users: User[] = [];

  @Input() filterDone: boolean = false;

  public expandedElement: string = '';

  public repoUrl = environment.repoUrl;

  public displayedColumns = ['id', 'problemId', 'nickname', 'mergeTime', 'bonusPoints', 'bonusComment', 'reviewed','actions'];

  @ViewChild('prTable') prTable: MatTable<PullRequest>;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private pullRequestService: PullRequestService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let pr$ = environment.debug ? this.pullRequestService.getPullRequestsMOCK() : this.pullRequestService.getPullRequests();
    pr$.subscribe(prs => {
      this.pullRequests = prs;
      this.updateTable();
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  private updateTable(): void {
    this.dataSource.data = this.pullRequests;
      console.log(this.filterDone);
    if (this.filterDone) {
      this.dataSource.data = this.dataSource.data.filter(el => !el.reviewed);
    }
    this.prTable.renderRows();
  }

  public createPullRequest(): void {
    this.dialog.open(PullRequestDialogComponent, {
      data: {
        mode: 'create'
      }
    }).afterClosed().subscribe(dialog => {
      if(!dialog) {
        return;
      }
      switch(dialog.command) {
        case Command.CREATE:
          let obsCreate$ = environment.debug ? this.pullRequestService.createPullRequestMOCK(dialog.pr) : this.pullRequestService.createPullRequest(dialog.pr);
          obsCreate$.subscribe(_ => {
            this.pullRequests.push(dialog.pr);
            this.updateTable();
          });
          break;
        default:
      }
    });
  }

  public editPullRequest(pullRequestId: number): void {
    this.dialog.open(PullRequestDialogComponent, {
      data: {
        pr : this.pullRequests.find(pr => pullRequestId === pr.id),
        mode: 'edit'
      }
    }).afterClosed().subscribe(value => {
      if (!value) {
        return;
      }
      switch(value.command) {
        case Command.UPDATE:
          let obsUpdate$ = environment.debug ? this.pullRequestService.updatePullRequestMOCK(value.pr) : this.pullRequestService.updatePullRequest(value.pr);
          obsUpdate$.subscribe(pr => {
            let index = this.pullRequests.findIndex(el => el.id === pr.id);
            this.pullRequests.splice(index,1);
            this.pullRequests.push(pr);
            this.updateTable();
          });
          break;
        case Command.DELETE:
          let obsDelete$ = environment.debug ? this.pullRequestService.deletePullRequestMOCK(value.pr) : this.pullRequestService.deletePullRequest(value.pr);
          obsDelete$.subscribe(pr => {
            let index = this.pullRequests.findIndex(el => el.id === value.pr.id);
            this.pullRequests.splice(index,1);
            this.updateTable();
          });
          break;
        default:
      }
    });
  }
}
