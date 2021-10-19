import { Component, Inject, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PullRequest } from "../models/pull-request";
import { Command } from "./command.enum";

@Component({
    selector: 'app-pull-request-dialog',
    templateUrl: 'pull-request-dialog.component.html',
    styleUrls: ['dialog.scss']
})
export class PullRequestDialogComponent implements OnInit{
    public idControl = new FormControl(this.data.id);
    public nicknameControl = new FormControl(this.data.nickname);
    public problemIdControl = new FormControl(this.data.problemId);
    public mergeTimeControl = new FormControl(this.data.mergeTime);
    public bonusPointsControl = new FormControl(this.data.bonusPoints);
    public bonusCommentControl = new FormControl(this.data.bonusComment);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<PullRequestDialogComponent>
        ) {

    }

    ngOnInit(): void {
        if (this.data.pr) {
            let pr: PullRequest = this.data.pr;
            this.idControl.setValue(pr.id);
            this.nicknameControl.setValue(pr.nickname);
            this.problemIdControl.setValue(pr.problemId);
            this.mergeTimeControl.setValue(pr.mergeTime);
            this.bonusPointsControl.setValue(pr.bonusPoints);
            this.bonusCommentControl.setValue(pr.bonusComment);
            if (this.data.mode === 'edit') {
                this.idControl.disable();
                this.mergeTimeControl.disable();
            }
        }
    }

    createPr() {
        let pr: PullRequest = {
            id: this.idControl.value,
            problemId: this.problemIdControl.value,
            nickname: this.nicknameControl.value,
            mergeTime: new Date(),
            bonusPoints: this.bonusPointsControl.value,
            bonusComment: this.bonusCommentControl.value,
            reviewed: true,
            reviewedAt: new Date()
        };
        this.dialogRef.close({
            command: Command.CREATE,
            pr
        });
    }

    closeDialog() {
        this.dialogRef.close()
    }

    deletePr() {
        this.dialogRef.close({
            command: Command.DELETE,
            pr: this.data.pr
        });
    }

    updatePr() {
        let pr: PullRequest = {
            id: this.idControl.value,
            problemId: this.problemIdControl.value,
            nickname: this.nicknameControl.value,
            mergeTime: this.mergeTimeControl.value,
            bonusPoints: this.bonusPointsControl.value,
            bonusComment: this.bonusCommentControl.value,
            reviewed: true,
            reviewedAt: new Date()
        };
        this.dialogRef.close({
            command: Command.UPDATE,
            pr
        });
    }

}