import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Problem } from '../models/problem';
import { Command } from './command.enum';

@Component({
  selector: 'app-problem-dialog',
  templateUrl: './problem-dialog.component.html',
  styleUrls: ['dialog.scss']
})
export class ProblemDialogComponent implements OnInit {
  public idControl = new FormControl();
  public nameControl = new FormControl();
  public levelNameControl = new FormControl();
  public basePointsControl = new FormControl();
  public multiplierControl = new FormControl();
  public descriptionControl = new FormControl();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProblemDialogComponent>
  ) { }

  ngOnInit(): void {
    if(this.data.problem) {
      let problem: Problem = this.data.problem;
      this.idControl.setValue(problem.id);
      this.nameControl.setValue(problem.name);
      this.levelNameControl.setValue(problem.levelName);
      this.basePointsControl.setValue(problem.basePoints);
      this.multiplierControl.setValue(problem.multiplier);
      this.descriptionControl.setValue(problem.description);
    }
  }

  public createProblem(): void {
    let problem: Problem = {
      id: this.idControl.value,
      name: this.nameControl.value,
      levelName: this.levelNameControl.value,
      basePoints: this.basePointsControl.value,
      multiplier: this.multiplierControl.value,
      description: this.descriptionControl.value
    }
    this.dialogRef.close({
      command: Command.CREATE,
      problem
    });
  }
  public updateProblem(): void {
    let problem: Problem = {
      id: this.idControl.value,
      name: this.nameControl.value,
      levelName: this.levelNameControl.value,
      basePoints: this.basePointsControl.value,
      multiplier: this.multiplierControl.value,
      description: this.descriptionControl.value
    }
    this.dialogRef.close({
      command: Command.UPDATE,
      problem
    });
  }
  public deleteProblem(): void {
    this.dialogRef.close({
      command: Command.DELETE,
      problem: this.data.problem
    });
  }

  public closeDialog(): void {
    this.dialogRef.close();
  }

}
