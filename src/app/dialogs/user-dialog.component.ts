import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../models/user';
import { Command } from './command.enum';

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./dialog.scss']
})
export class UserDialogComponent implements OnInit {
  public nicknameControl = new FormControl(this.data.user.nickname);
  public nameControl = new FormControl(this.data.user.name);
  public surnameControl = new FormControl(this.data.user.surname);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<UserDialogComponent>
  ) { }

  ngOnInit(): void {
  }

  updateUser() {
    let user: User = {
      nickname: this.nicknameControl.value,
      name: this.nameControl.value,
      surname: this.surnameControl.value
    };
    this.dialogRef.close({
      command: Command.UPDATE,
      user
    });
  }

  deleteUser() {
    this.dialogRef.close({
      command: Command.DELETE,
      user: this.data.user
    })
  }

  closeDialog() {
    this.dialogRef.close();
  }

  createUser() {
    let user: User = {
      nickname: this.nicknameControl.value,
      name: this.nameControl.value,
      surname: this.surnameControl.value
    };
    this.dialogRef.close({
      command: Command.CREATE,
      user
    });

  }

}
