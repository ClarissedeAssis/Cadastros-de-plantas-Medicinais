export class Usuario {
    id: number;
    nome: string;
    email: string;
    senha:string;
    idCategoria: number;
    arquivoFotoUsuario:string;

    constructor(){
        this.id = 0;
        this.nome = "";
        this.email = "";
        this.senha =""; 
        this.idCategoria = 0;
        this.arquivoFotoUsuario =""; 
    } 
}
