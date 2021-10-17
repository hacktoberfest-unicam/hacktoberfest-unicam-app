import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hacktoberfest-app';

  links = ['user','problem','pr', 'dashboard'];
  activeLink = 'user';

  isSidenavOpened = false;

  public changeSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
