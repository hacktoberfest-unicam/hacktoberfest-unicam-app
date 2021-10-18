import { Component, Inject } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PullRequest } from "../models/pull-request";
import { Command } from "./command.enum";

@Component({
    selector: 'edit-pull-request-dialog',
    templateUrl: 'edit-pull-request-dialog.component.html',
    styleUrls: ['dialog.scss']
})
export class EditPullRequestDialogComponent {
    public idControl = new FormControl(this.data.id);
    public nicknameControl = new FormControl(this.data.nickname);
    public problemIdControl = new FormControl(this.data.problemId);
    public mergeTimeControl = new FormControl(this.data.mergeTime);
    public bonusPointsControl = new FormControl(this.data.bonusPoints);
    public bonusCommentControl = new FormControl(this.data.bonusComment);

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: PullRequest,
        public dialogRef: MatDialogRef<EditPullRequestDialogComponent>
        ) {

    }

    closeDialog() {
        this.dialogRef.close()
    }

    deletePr() {
        this.dialogRef.close({
            command: Command.DELETE,
            pr: this.data
        });
    }

    updatePr() {
        let pr: PullRequest = {
            id: this.data.id,
            problemId: this.problemIdControl.value,
            nickname: this.nicknameControl.value,
            mergeTime: this.data.mergeTime,
            bonusPoints: this.bonusPointsControl.value,
            bonusComment: this.bonusCommentControl.value,
        };
        this.dialogRef.close({
            command: Command.UPDATE,
            pr
        });
    }

}