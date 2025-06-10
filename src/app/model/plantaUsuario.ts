import { Planta } from "./planta";
import { Usuario } from "./usuario";

export class PlantaUsuario {
    id: number;
    idPlanta: number;
    idUsuario: number;
    descricao: string;
    nomeUsuario: string;
    avaliacao: number;
    arquivoFotoUsuario: string;


    constructor() {
        this.id = 0;
        this.idPlanta = 0;
        this.idUsuario = 0;
        this.descricao = "";
        this.nomeUsuario = "";
        this.avaliacao = 0;
        this.arquivoFotoUsuario="";
    

    }
}
