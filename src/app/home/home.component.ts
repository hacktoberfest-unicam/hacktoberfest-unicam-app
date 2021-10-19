import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { RankRow } from '../models/rank-row';
import { RankService } from '../services/rank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public rankRows: RankRow[] = [];
  public dataSource: MatTableDataSource<RankRow> = new MatTableDataSource();

  public displayedColumns = ['points','name', 'surname','nickname'];

  @ViewChild('rankTable') rankTable: MatTable<MatTableDataSource<RankRow>>;

  constructor(
    private rankService: RankService
  ) { }

  ngOnInit(): void {
    this.rankService.getRankRows().subscribe(rankRows => {
      this.rankRows = rankRows;
      this.rankRows.sort((a, b) => a.points > b.points ? -1 : 1);
      this.updateTable();
    });
  }

  private updateTable(): void {
    this.dataSource.data = this.rankRows;
    this.rankTable.renderRows();
  }

}
