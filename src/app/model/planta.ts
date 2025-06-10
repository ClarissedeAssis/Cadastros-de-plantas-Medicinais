export class Planta {
    id: number;
    nomePopular: string;
    nomeCientifico: string;
    origem:string;
    aplicacoesMedicinais: string;
    arquivoFoto:string;
    avaliacaoGeral: number;
 
    constructor(){
        this.id = 0;
        this.nomePopular = "";
        this.nomeCientifico = "";
        this.origem = ""; 
        this.aplicacoesMedicinais = "";
        this.arquivoFoto = ""; 
        this.avaliacaoGeral = 0;
    } 
}
