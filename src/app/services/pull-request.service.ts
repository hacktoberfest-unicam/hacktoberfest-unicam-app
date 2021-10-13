import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { PullRequest } from '../models/pull-request';
import { PR_MOCK } from './pr.mock';

@Injectable({
  providedIn: 'root'
})
export class PullRequestService {
  private url = `${environment.baseUrl}/pr`;

  constructor(private http: HttpClient) { }

  public getPullRequests(): Observable<PullRequest[]> {
    return this.http.get<PullRequest[]>(this.url);
  }

  public getPullRequestsMOCK(): Observable<PullRequest[]> {
    return of(PR_MOCK);
  }
}
