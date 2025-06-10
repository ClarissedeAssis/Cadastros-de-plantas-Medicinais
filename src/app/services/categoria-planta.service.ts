import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Planta } from '../model/planta';
import { CategoriaPlanta } from '../model/categoria-planta';
import { firstValueFrom } from 'rxjs';
import {  HttpHeaders } from '@angular/common/http';
import { PlantaUsuario } from '../model/plantaUsuario';
import { Categoria } from '../model/categoria';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CategoriaPlantaService {
  private url = 'http://localhost:8080/api/v1/categoria-planta';

  private httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private httpClient: HttpClient,
  ) {}

  getAllPlantas(): Observable<Planta[]> {
    return this.httpClient.get<Planta[]>(`${this.url}/plantas`);
  }

  getPlantasByIds(ids: number[]): Observable<Planta[]> {
    const idsParam = ids.join(',');
    return this.httpClient.get<Planta[]>(`${this.url}/plantas-by-ids/${idsParam}`);
  }

  associarPlantas(categoriaPlanta: CategoriaPlanta): Observable<void> {
    return this.httpClient.post<void>(`${this.url}/associar`, categoriaPlanta);
  }

  getPlantasPorCategoria(idCategoria: number): Observable<number[]> {
    return this.httpClient.get<number[]>(`${this.url}/plantas-por-categoria/${idCategoria}`);
  }

  removerPlantaDaCategoria(idCategoria: number, idPlanta: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.url}/remover/${idCategoria}/${idPlanta}`);
  }

  async buscarPorId(id: number): Promise<PlantaUsuario> {
    const urlAuxiliar = `${this.url}/${id}`;
    return firstValueFrom(this.httpClient.get<PlantaUsuario>(urlAuxiliar));
  }


  salvarCategoriaPlanta(idCategoria: number, idPlanta: number): Promise<any> {
    const corpo: CategoriaPlanta = {
      idCategoria,
      idPlanta: [idPlanta] 
    };
  
    return this.httpClient.post(`${this.url}/associar`, corpo).toPromise();
  }

  getCategoriasPorPlanta(idPlanta: number): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.url}/categorias-por-planta/${idPlanta}`);
  }
  
  
}


