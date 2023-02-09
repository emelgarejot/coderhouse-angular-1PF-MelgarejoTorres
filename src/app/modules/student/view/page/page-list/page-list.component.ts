import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MetaColumn } from '../../../../../shared/model/meta-column';
import { Student } from '../../../model/student.type';
import { FormComponent } from '../../component/form/form.component';

const ELEMENT_DATA: Student[] = [
  { id: 1, name: 'Miguel', lastName: 'Campos', country: 'Chile' },
  { id: 2, name: 'Carlos', lastName: 'Cardenas', country: 'Perú' },
  { id: 3, name: 'Jose', lastName: 'Montiel', country: 'Argentina' },
  { id: 4, name: 'Carmen', lastName: 'Navas', country: 'Costa Rica' },
  { id: 5, name: 'Radamel', lastName: 'Falcao', country: 'Colombia' },
  { id: 6, name: 'Luis', lastName: 'Suarez', country: 'Uruguay' },
];

const COLUMNS: MetaColumn[] = [
  {
    columnDef: 'id',
    header: 'Id',
  },
  {
    columnDef: 'name',
    header: 'Nombre',
  },
  {
    columnDef: 'lastName',
    header: 'Apellidos',
  },
  {
    columnDef: 'country',
    header: 'Pais',
  },
];

@Component({
  selector: 'app-page-list',
  templateUrl: './page-list.component.html',
  styleUrls: ['./page-list.component.scss'],
})
export class PageListComponent implements OnInit {
  dataTable: Student[] = [];
  dataTableCopy: Student[] = [];
  metaColumns = COLUMNS;
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.dataTable = [...ELEMENT_DATA];
    this.dataTableCopy = [...ELEMENT_DATA];
  }

  openModal(row: Student) {
    this.dialog.open(FormComponent, {
      data: row,
      width: '300px',
      disableClose: true,
    });
  }

  delete(row: Student) {
    let idDelete = row.id;
    let index = this.dataTableCopy.findIndex((value) => value.id == idDelete);
    this.dataTableCopy.splice(index, 1);
    this.dataTable = [...this.dataTableCopy];
  }
}
