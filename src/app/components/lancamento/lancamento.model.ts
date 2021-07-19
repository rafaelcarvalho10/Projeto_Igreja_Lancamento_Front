export class Lancamento {
  id?: number; //significa que o ID é opcional, trocar isso depois, e colocar como obrigatorio o ID
  cod_lancamento!: string;
  data_Lancamento!: Date;
  qtd_pessoas!: number;
  vl_oferta!: number;
  qtd_dizimistas!: number;
  vl_total_dizimos!: number;
  igrejaId!: number;
  // nome_igreja?: string
}
