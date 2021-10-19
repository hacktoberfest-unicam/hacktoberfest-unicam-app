import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'hacktoberfest-app';

  // links = ['user','problem','pull-request', 'dashboard'];
  links = [
    {
      name: 'Home',
      route: 'home',
      icon: 'home'
    },
    {
      name: 'Dashboard',
      route: 'dashboard',
      icon: 'dashboard'
    },
    {
      name: 'Users',
      route: 'user',
      icon: 'account_circle'
    },
    {
      name: 'Problems',
      route: 'problem',
      icon: 'description'
    },
    {
      name: 'Pull Requests',
      route: 'pull-request',
      icon: 'assignment'
    },
  ]
  activeLink = 'home';

  isSidenavOpened = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  public changeSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
