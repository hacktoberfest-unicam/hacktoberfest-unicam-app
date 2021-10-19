import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Command } from '../dialogs/command.enum';
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
export class DashboardComponent {
    constructor() { }

}
