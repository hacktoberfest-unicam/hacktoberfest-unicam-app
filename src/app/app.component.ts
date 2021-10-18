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

  links = ['user','problem','pull-request', 'dashboard'];
  activeLink = 'user';

  isSidenavOpened = false;

  constructor(
    @Inject(DOCUMENT) public document: Document,
    public auth: AuthService
  ) {}

  public changeSidenav(): void {
    this.isSidenavOpened = !this.isSidenavOpened;
  }
}
