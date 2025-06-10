import { Injectable } from '@angular/core';
import { Usuario } from '../model/usuario';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8080/api/v1/usuario';
  
  constructor(private httpClient: HttpClient) { }

  async salvar(usuario: Usuario): Promise<Usuario> {
    let usuarioSalvo: Usuario;
  
   
    if (usuario.id === 0) {
      usuarioSalvo = await firstValueFrom(
        this.httpClient.post<Usuario>(this.url, usuario, this.httpHeaders)
      );
    } else {
      let urlAuxiliar = `${this.url}/${usuario.id}`;
      usuarioSalvo = await firstValueFrom(
        this.httpClient.put<Usuario>(urlAuxiliar, usuario, this.httpHeaders)
      );
    }
  
    // Depois envia a foto, se existir
    if (usuario.arquivoFotoUsuario && usuario.arquivoFotoUsuario.startsWith('data:image')) {
      try {
        usuarioSalvo.arquivoFotoUsuario = await this.enviar(usuario.arquivoFotoUsuario, usuarioSalvo.id);
      } catch (error) {
        console.error("Erro ao enviar a foto:", error);
        throw error;
      }
    }
  
    return usuarioSalvo;
  }

async enviar(arquivoBase64: string, id: number): Promise<string> {
  const blob = this.base64ToBlob(arquivoBase64);
  const formData = new FormData();
  formData.append('arquivo', blob, 'foto.jpg');
  formData.append('id', id.toString()); 

  const resposta = await firstValueFrom(
    this.httpClient.post<Usuario>(`${this.url}/foto`, formData)
  );

  return resposta.arquivoFotoUsuario; 
}

private base64ToBlob(base64: string): Blob {
  const parts = base64.split(',');
  if (parts.length !== 2) {
    throw new Error('Base64 inválido. Esperado um prefixo data URI.');
  }

  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(':')[1].split(';')[0];

  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ab], { type: mimeString });
}

  async listar(): Promise<Usuario[]>{   
    return await firstValueFrom(this.httpClient.get<Usuario[]>(this.url));
  }
  
  async buscarPorId(id: number): Promise<Usuario> {
    let urlAuxiliar = this.url + "/" + id;    
    return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
  }

  

  async autenticar(email: string, senha: string): Promise<Usuario> {
    let urlAuxiliar = this.url + '/autenticar/' + email + '/' + senha;
    return await firstValueFrom(this.httpClient.get<Usuario>(urlAuxiliar));
  }

  // Função para verificar se o login é válido (por e-mail)
  async verificarLogin(email: string): Promise<boolean> {
    let urlAuxiliar = `${this.url}/verificarLogin?email=${email}`;
    return await firstValueFrom(this.httpClient.get<boolean>(urlAuxiliar));
  }

  registrarAutenticacao(usuario: Usuario){
    localStorage.setItem('usuarioAutenticado', JSON.stringify(usuario));
  }

  recuperarAutenticacao(): Usuario{
    const usuarioAutenticado = JSON.parse(localStorage.getItem("usuarioAutenticado") || '{}');
    return usuarioAutenticado;
  }

  encerrarAutenticacao(){
    localStorage.removeItem('usuarioAutenticado');
  }


  getFotoUrl(nomeArquivo: string): string {
    return `http://localhost:8080/uploads/fotos/${nomeArquivo}`;
  }

}
