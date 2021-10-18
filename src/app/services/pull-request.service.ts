import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of} from 'rxjs';
import { PullRequest } from '../models/pull-request';
import { PR_MOCK } from './pr.mock';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class PullRequestService {
  private url = `${environment.baseUrl}/pr`;

  metadata = {};

  constructor(
    private http: HttpClient,
    private auth: AuthService
    ) { }

  public getPullRequests(): Observable<PullRequest[]> {
    return this.http.get<PullRequest[]>(this.url);
  }

  public getPullRequestsMOCK(): Observable<PullRequest[]> {
    return of(PR_MOCK);
  }

  public updatePullRequest(pr: PullRequest): Observable<PullRequest> {
    return this.http.put<PullRequest>(`${this.url}/${pr.id}`, pr);
  }

  public updatePullRequestMOCK(pr: PullRequest): Observable<PullRequest> {
    return of(pr);
  }

  public deletePullRequest(pr: PullRequest): Observable<PullRequest>{
    return this.http.delete<PullRequest>(`${this.url}/${pr.id}`);
  }

  public deletePullRequestMOCK(pr: PullRequest): Observable<PullRequest>{
    return of(pr);
  }
}
