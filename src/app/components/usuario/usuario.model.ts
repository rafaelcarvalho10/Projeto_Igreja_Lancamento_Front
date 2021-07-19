import { IgrejaUsuario } from './igrejaUsuario.model';
export interface Usuario {
  id?: number; //significa que o ID é opcional, trocar isso depois, e colocar como obrigatorio o ID
  username: string;
  password: string;
  role?: string;
  igrejaUsuario: IgrejaUsuario[];
}
