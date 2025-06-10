import { Injectable } from '@angular/core';
import { PlantaUsuario } from '../model/plantaUsuario';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class PlantaUsuarioService {
  private url: string = 'http://localhost:8080/api/v1/plantaUsuario';

  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
    private usuarioService: UsuarioService
  ) {}

  async adicionarComentario(pu: PlantaUsuario): Promise<PlantaUsuario> {
    if (pu.idPlanta !== 0 && pu.idUsuario !== 0) {
      return firstValueFrom(
        this.httpClient.post<PlantaUsuario>(this.url, pu, this.httpHeaders)
      );
    }
    return pu;
  }

  async consultarComentariosPorPlanta(idPlanta: number): Promise<PlantaUsuario[]> {
    const url = `${this.url}/planta/${idPlanta}`;
    return firstValueFrom(this.httpClient.get<PlantaUsuario[]>(url));
  }

  async buscarPorId(id: number): Promise<PlantaUsuario> {
    const url = `${this.url}/${id}`;
    return firstValueFrom(this.httpClient.get<PlantaUsuario>(url));
  }

  async listar(): Promise<PlantaUsuario[]> {
    return firstValueFrom(this.httpClient.get<PlantaUsuario[]>(this.url));
  }

  async listarPorPlanta(plantaId: number): Promise<PlantaUsuario[]> {
    return firstValueFrom(this.httpClient.get<PlantaUsuario[]>(`${this.url}/planta/${plantaId}`));
  }

  async excluirComentario(idComentario: number): Promise<void> {
    const comentario = await this.buscarPorId(idComentario);
    const usuario: Usuario = this.usuarioService.recuperarAutenticacao();
    const idUsuarioLogado = usuario.id;

    if (comentario.idUsuario === idUsuarioLogado) {
        const urlExcluir = `${this.url}/${idComentario}`;
        await firstValueFrom(this.httpClient.delete<void>(urlExcluir, this.httpHeaders));
        console.log('Comentário excluído com sucesso.');
    } else {
        throw new Error('Você não tem permissão para excluir este comentário.');
    }
  }



  
}
