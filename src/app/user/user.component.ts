import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { environment } from 'src/environments/environment';
import { Command } from '../dialogs/command.enum';
import { UserDialogComponent } from '../dialogs/user-dialog.component';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  public users: User[];
  public displayedColumns = ['nickname','name','surname','actions'];

  public dataSource: MatTableDataSource<User> = new MatTableDataSource();
  @ViewChild('userTable') userTable: MatTable<User>;

  constructor(
    private userService: UserService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    let user$ = environment.debug ? this.userService.getUsersMOCK() : this.userService.getUsers();
    user$.subscribe(users => {
      this.users = users;
      this.updateTable();
    });
  }

  private updateTable(): void {
    this.dataSource.data = this.users;
    this.userTable.renderRows();
  }

  createUser() {
    this.dialog.open(UserDialogComponent, {
      data: {
        mode: 'new',
        user: null
      }
    }).afterClosed().subscribe(dialog => {
      if(!dialog) {
        return;
      }
      if (dialog.command == Command.CREATE) {
        let obsCreate$ = environment.debug ? this.userService.createUserMOCK(dialog.user) : this.userService.createUser(dialog.user);
        obsCreate$.subscribe(val => {
          console.log(dialog.user);
          this.users.push(dialog.user);
          this.updateTable();
        });
      }
    });
  }

  editUser(nickname: string): void {
    // let tmp = this.dialog.open()
    this.dialog.open(UserDialogComponent, {
      data: {
        mode: 'edit',
        user: this.users.find(el => el.nickname === nickname)
      }},).afterClosed().subscribe(dialog => {
        if(!dialog) {
          return;
        }
        switch(dialog.command) {
          case Command.UPDATE:
            let obsUpdate$ = environment.debug ? this.userService.updateUserMOCK(dialog.user) : this.userService.updateUser(dialog.user);
            obsUpdate$.subscribe(user => {
              let index = this.users.findIndex(el => el.nickname === user.nickname);
              this.users.splice(index, 1);
              this.users.push(user);
              this.updateTable();
            });
            break;
          case Command.DELETE:
            let obsDelete$ = environment.debug ? this.userService.deleteUserMOCK(dialog.user) : this.userService.deleteUser(dialog.user);
            obsDelete$.subscribe(user => {
              let index = this.users.findIndex(el => el.nickname === dialog.user.nickname);
              this.users.splice(index,1);
              this.updateTable();
            });
            break;
        }
      });
  }

}
