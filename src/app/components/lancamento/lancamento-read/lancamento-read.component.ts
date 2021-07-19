import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Lancamento } from '../lancamento.model';

import { LancamentoService } from '../lancamento.service';
import { Igreja } from '../../igreja/igreja.model';
import { Globals } from 'src/app/shared/helpers/globals';

@Component({
  selector: 'app-lancamento-read',
  templateUrl: './lancamento-read.component.html',
  styleUrls: ['./lancamento-read.component.css'],
})
export class LancamentoReadComponent implements OnInit {
  lancamentosFiltrados!: Lancamento[];
  lancamentos!: Lancamento[];

  displayedColumns: string[] = [
    'id',
    'cod_lancamento',
    'data_Lancamento',
    'Qtd_pessoas',
    'Qtd_dizimistas',
    'Vl_total_dizimos',
    'Vl_oferta',
    'igrejaId',
    'action',
  ]; // adicionar as colunas aqui depois no HTML

  constructor(
    private lancamentoService: LancamentoService,
    private route: ActivatedRoute,
    private globals: Globals
  ) {}

  ngOnInit(): void {
    this.globals.igrejaSelecionada$.subscribe((h) => {
      this.carregarIgrejas();
    });
  }

  carregarIgrejas() {
    let idIgreja = this.globals.igrejaSelecionada$.getValue().id;
    if (!idIgreja) {
      idIgreja = 0;
      console.log('vazio');
    }

    this.lancamentoService.readByIdIgreja(idIgreja).subscribe((lancamentos) => {
      this.lancamentos = lancamentos;
      this.lancamentosFiltrados = lancamentos;
    });
  }

  somaOferta: any;
  sumOferta(): number {
    this.somaOferta = this.lancamentosFiltrados.reduce(
      (resultado, quantidade) => {
        return resultado + quantidade.vl_oferta;
      },
      0
    );
    // console.log(this.somaOferta);
    return this.somaOferta;
  }

  somaDizimo: any;
  sumDizimo(): number {
    this.somaDizimo = this.lancamentosFiltrados.reduce(
      (resultado, quantidade) => {
        return resultado + quantidade.vl_total_dizimos;
      },
      0
    );
    return this.somaDizimo;
  }

  somaPessoa: number = 0;
  sumPessoa(): number {
    this.somaPessoa = this.lancamentosFiltrados.reduce(
      (resultado, quantidade) => {
        return resultado + quantidade.qtd_pessoas;
      },
      0
    );

    return this.somaPessoa;
  }

  somaDizimista: any;
  sumDizimista(): number {
    this.somaDizimista = this.lancamentosFiltrados.reduce(
      (resultado, quantidade) => {
        return resultado + quantidade.qtd_dizimistas;
      },
      0
    );
    return this.somaDizimista;
  }

  // dataHoje: any;
  // dataFiltro(dataInicio: any) {
  //   dataInicio = Date.now();
  //   this.dataHoje = dataInicio;
  // }

  dataInicio: any;
  filtroDataInicio(data1: any) {
    this.dataInicio = data1;
    this.lancamentosFiltrados = this.lancamentos.filter(
      (n) => n.data_Lancamento >= this.dataInicio
    );
  }

  filtroDataFim(data2: any) {
    this.lancamentosFiltrados = this.lancamentos.filter(
      (n) => n.data_Lancamento <= data2 && n.data_Lancamento >= this.dataInicio
    );
  }
}
