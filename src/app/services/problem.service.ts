import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Problem, ProblemDTO } from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  private url = `${environment.baseUrl}/problem`;

  private mapFromDTO = (dto: ProblemDTO): Problem => {
    return {
      id: dto.id,
      name: dto.name,
      levelName: dto.level_name,
      basePoints: dto.base_points,
      multiplier: dto.multiplier,
      description: dto.description
    }
  }

  private mapToDTO = (pr: Problem): ProblemDTO => {
    return {
      id: pr.id,
      name: pr.name,
      level_name: pr.levelName,
      base_points: pr.basePoints,
      multiplier: pr.multiplier,
      description: pr.description
    }
  }

  constructor(
    private http: HttpClient
  ) { }

public getProblems(): Observable<Problem[]> {
    return this.http.get<ProblemDTO[]>(this.url).pipe(
      map(dto => dto.map(this.mapFromDTO))
    );
  }

  public getProblemsMOCK(): Observable<Problem[]> {
    return of();
  }

  public updateProblem(pr: Problem): Observable<Problem> {
    return this.http.put<ProblemDTO>(`${this.url}/${pr.id}`, this.mapToDTO(pr)).pipe(
      map(dto => this.mapFromDTO(dto))
    );
  }

  public updateProblemMOCK(pr: Problem): Observable<Problem> {
    return of(pr);
  }

  public deleteProblem(pr: Problem): Observable<Problem>{
    return this.http.delete<ProblemDTO>(`${this.url}/${pr.id}`).pipe(
      map(dto => this.mapFromDTO(dto))
    );
  }

  public deleteProblemMOCK(pr: Problem): Observable<Problem>{
    return of(pr);
  }

  public createProblem(pr: Problem): Observable<unknown> {
    return this.http.post<void>(this.url, this.mapToDTO(pr));
  }

  public createProblemMOCK(pr: Problem): Observable<unknown> {
    return of();
  }
}
