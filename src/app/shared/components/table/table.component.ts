import {
  Component,
  ContentChildren,
  Input,
  OnInit,
  QueryList,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatSort } from '@angular/material/sort';
import {
  MatColumnDef,
  MatTable,
  MatTableDataSource,
} from '@angular/material/table';
import { MetaColumn } from '../../../_models/meta-column';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  displayedColumns: string[] = [];

  @Input() dataTable: any;
  @Input() metaColumns: MetaColumn[] = [];

  @ContentChildren(MatColumnDef, { descendants: true })
  columnsDef!: QueryList<MatColumnDef>;

  @ViewChild(MatTable, { static: true }) table!: MatTable<any>;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<any>();

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['metaColumns']) {
      this.displayedColumns = this.metaColumns.map((el) => el.columnDef);
    }

    if (changes['dataTable']) {
      this.dataSource = new MatTableDataSource<any>(this.dataTable);
      this.dataSource.sort = this.sort;
    }
  }

  ngAfterContentInit() {
    if (!this.columnsDef) {
      return;
    }

    this.columnsDef.forEach((columnDef) => {
      this.displayedColumns.push(columnDef.name);
      this.table?.addColumnDef(columnDef);
    });
  }
}
