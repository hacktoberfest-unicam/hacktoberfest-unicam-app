import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProblemComponent } from './problem/problem.component';
import { UserComponent } from './user/user.component';
import { PullRequestComponent } from './pull-request/pull-request.component';
import { EditPullRequestDialogComponent } from './dialogs/edit-pull-request-dialog.component';

import { AuthHttpInterceptor, AuthModule } from '@auth0/auth0-angular';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProblemComponent,
    UserComponent,
    PullRequestComponent,
    EditPullRequestDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,

    MatToolbarModule,
    MatTabsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    
    AuthModule.forRoot({
      domain: 'hacktoberfest-app.eu.auth0.com',
      clientId: 'BvnV0B2YScNVmw1imk30pMRcprUilCon',

      audience: 'hacktoberfest-api',

      // scope: 'read:current_user',

      httpInterceptor: {
        allowedList: [
          {
            uri: 'http://localhost:8080/*',
            tokenOptions: {
              audience: 'hacktoberfest-api',
              // scope: 'read:current_user'
            }
          }
        ]
      }
    }),

    BrowserAnimationsModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
