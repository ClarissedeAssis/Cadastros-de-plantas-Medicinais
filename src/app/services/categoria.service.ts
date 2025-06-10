import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Categoria {
  id: number;
  descricao: string;
  idUsuario: number;
}

@Injectable({
  providedIn: 'root',
})
export class CategoriaService {
  private apiUrl = 'http://localhost:8080/api/v1/categoria'; // URL da API

  constructor(private http: HttpClient) {}

  createCategoria(categoria: { descricao: string; idUsuario: number }): Observable<any> {
    return this.http.post<any>(this.apiUrl, categoria);
  }

  getCategoriasByUsuario(idUsuario: number): Observable<Categoria[]> {
    return this.http.get<Categoria[]>(`${this.apiUrl}/usuario/${idUsuario}`);
  }
  getCategoriaById(idCategoria: number): Observable<Categoria> {
    return this.http.get<Categoria>(`http://localhost:8080/api/v1/categoria-planta/${idCategoria}`);
  }
  
}

  

