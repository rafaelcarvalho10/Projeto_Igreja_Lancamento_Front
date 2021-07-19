import { IgrejaService } from './../igreja.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Igreja } from '../igreja.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-igreja-read',
  templateUrl: './igreja-read.component.html',
  styleUrls: ['./igreja-read.component.css'],
})
export class IgrejaReadComponent implements OnInit {
  igrejas1!: Igreja[];
  ELEMENT_DATA!: Igreja[];

  displayedColumns = ['id', 'cod_igreja', 'nome_igreja', 'action']; // adicionar as colunas aqui depois no HTML
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private igrejaService: IgrejaService) {}

  ngOnInit(): void {
    this.igrejaService.read().subscribe((igrejas) => {
      this.igrejas1 = igrejas;
      console.log(igrejas);
      // this.listData = new MatTableDataSource(this.igrejas);
      // this.listData.sort = this.sort;
    });
  }

  // dataSource = new MatTableDataSource(this.igrejas1);

  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
}
