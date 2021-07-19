export interface User {
  id: Int32Array;   //significa que o ID é opcional, trocar isso depois, e colocar como obrigatorio o ID
  username: string;
  password: string;
  role: string;
  token: string;
}


// export interface User {
//   id: Int32Array;
//   nome_usuario: string;
//   email_usuario: string;
//   id_registro: Int32Array;
//   token?: string;
// }
