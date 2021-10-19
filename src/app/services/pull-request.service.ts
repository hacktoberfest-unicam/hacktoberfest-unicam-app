import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PullRequest, PullRequestDTO } from '../models/pull-request';
import { PR_MOCK } from './pr.mock';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class PullRequestService {
  private url = `${environment.baseUrl}/api/pr`;

  private mapFromDTO = (dto: PullRequestDTO): PullRequest => {
    return {
      id: dto.id,
      problemId: dto.problem_id,
      nickname: dto.nickname,
      mergeTime: dto.merge_time,
      bonusPoints: dto.bonus_points,
      bonusComment: dto.bonus_comment,
      reviewed: dto.reviewed,
      reviewedAt: dto.reviewed_at
    }
  }
  private mapToDTO = (pr: PullRequest): PullRequestDTO => {
    return {
      id: pr.id,
      problem_id: pr.problemId,
      nickname: pr.nickname,
      merge_time: pr.mergeTime,
      bonus_points: pr.bonusPoints,
      bonus_comment: pr.bonusComment,
      reviewed: pr.reviewed,
      reviewed_at: pr.reviewedAt
    }
  }

  metadata = {};

  constructor(
    private http: HttpClient
    ) { }

  public getPullRequests(): Observable<PullRequest[]> {
    return this.http.get<PullRequestDTO[]>(this.url).pipe(
      map(dto => dto.map(this.mapFromDTO))
    );
  }

  public getPullRequestsMOCK(): Observable<PullRequest[]> {
    return of(PR_MOCK);
  }

  public updatePullRequest(pr: PullRequest): Observable<PullRequest> {
    return this.http.put<PullRequestDTO>(`${this.url}/${pr.id}`, this.mapToDTO(pr)).pipe(
      map(dto => this.mapFromDTO(dto))
    );
  }

  public updatePullRequestMOCK(pr: PullRequest): Observable<PullRequest> {
    return of(pr);
  }

  public deletePullRequest(pr: PullRequest): Observable<PullRequest>{
    return this.http.delete<PullRequestDTO>(`${this.url}/${pr.id}`).pipe(
      map(dto => this.mapFromDTO(dto))
    );
  }

  public deletePullRequestMOCK(pr: PullRequest): Observable<PullRequest>{
    return of(pr);
  }

  public createPullRequest(pr: PullRequest): Observable<unknown> {
    return this.http.post<unknown>(this.url, this.mapToDTO(pr));
  }

  public createPullRequestMOCK(pr: PullRequest): Observable<unknown> {
    return of();
  }
}
