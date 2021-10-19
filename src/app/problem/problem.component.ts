import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Command } from '../dialogs/command.enum';
import { ProblemDialogComponent } from '../dialogs/problem-dialog.component';
import { Problem } from '../models/problem';
import { ProblemService } from '../services/problem.service';

@Component({
  selector: 'app-problem',
  templateUrl: './problem.component.html',
  styleUrls: ['./problem.component.scss']
})
export class ProblemComponent implements OnInit {
  public problems: Problem[] = [];

  public displayedColumns = ['id', 'name', 'levelName','basePoints','multiplier','description','actions'];
  @ViewChild('problemTable') problemTable: MatTable<Problem>;

  constructor(
    private problemService: ProblemService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let problem$ = environment.debug ? this.problemService.getProblemsMOCK() : this.problemService.getProblems();
    problem$.subscribe(problems => {
      this.problems = problems;
    })
  }

  public createProblem(): void {
    this.dialog.open(ProblemDialogComponent, {
      data: {
        mode: 'create'
        // problem: this.problems.find(el => el.id === )
      }
    }).afterClosed().subscribe(dialog => {
      if(!dialog) {
        return;
      }
      switch(dialog.command) {
        case Command.CREATE:
          let obsCreate$ = environment.debug ? this.problemService.createProblemMOCK(dialog.problem) : this.problemService.createProblem(dialog.problem);
          obsCreate$.subscribe(_ => {
            this.problems.push(dialog.problem);
            this.problemTable.renderRows();
          });
          this.problemTable.renderRows();
      }
    })
  }

  public updateProblem(id: string): void {
    this.dialog.open(ProblemDialogComponent, {
      data: {
        mode: 'edit',
        problem: this.problems.find(el => el.id === id)
      }
    }).afterClosed().subscribe(dialog => {
      if(!dialog) {
        return;
      }
      switch(dialog.command) {
        case Command.UPDATE:
          let obsUpdate$ = environment.debug ? this.problemService.updateProblemMOCK(dialog.problem) : this.problemService.updateProblem(dialog.problem);
          obsUpdate$.subscribe(problem => {
            let index = this.problems.findIndex(el => el.id === problem.id);
            if (index >= 0) {
              this.problems.splice(index, 1);
              this.problems.push(problem);
            }
            this.problemTable.renderRows();
          });
          break;
        case Command.DELETE:
          let obsDelete$ = environment.debug ? this.problemService.deleteProblemMOCK(dialog.problem) : this.problemService.deleteProblem(dialog.problem);
          obsDelete$.subscribe(_ => {
            let index = this.problems.findIndex(el => el.id === dialog.problem.id);
            console.log('del',index);
            if (index >= 0) {
              this.problems.splice(index, 1);
            }
            this.problemTable.renderRows();
          });
          break;
      }
    });
  }

}
