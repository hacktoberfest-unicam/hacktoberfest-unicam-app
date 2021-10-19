import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RankRow } from '../models/rank-row';

@Injectable({
  providedIn: 'root'
})
export class RankService {
  private url = `${environment.baseUrl}/public/ranking`

  constructor(
    private http: HttpClient
  ) { }

  public getRankRows(): Observable<RankRow[]> {
    return this.http.get<RankRow[]>(this.url);
  }
}
