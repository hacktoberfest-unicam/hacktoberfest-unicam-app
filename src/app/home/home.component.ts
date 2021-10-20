import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Subscription, timer } from 'rxjs';
import { RankRow } from '../models/rank-row';
import { RankService } from '../services/rank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  public rankRows: RankRow[] = [];
  public dataSource: MatTableDataSource<RankRow> = new MatTableDataSource();

  public displayedColumns = ['points','name', 'surname','nickname'];
  public displayedColumnsMobile = ['points','nickname'];

  public mobileView: boolean = false;

  private sub: Subscription;

  @ViewChild('rankTable') rankTable: MatTable<MatTableDataSource<RankRow>>;

  constructor(
    private rankService: RankService
  ) { }

  onResize(event: any) {
    let width = event.target.innerWidth;
    this.checkMobile(width);
  }

  checkMobile(width: number) {
    if (width < 792) {
      console.log("mobile");
      this.mobileView = true;
    } else {
      console.log("desktop");
      this.mobileView = false;
    }
  }

  ngOnInit(): void {
    this.checkMobile(window.innerWidth);
    this.sub = timer(0, 10000).subscribe(_ => {
      this.rankService.getRankRows().subscribe(rankRows => {
        this.rankRows = rankRows;
        this.rankRows = this.rankRows.filter(el => el.points != 0);
        this.rankRows.sort((a, b) => a.points > b.points ? -1 : 1);
        this.updateTable();
      });
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private updateTable(): void {
    this.dataSource.data = this.rankRows;
    this.rankTable.renderRows();
  }

}
