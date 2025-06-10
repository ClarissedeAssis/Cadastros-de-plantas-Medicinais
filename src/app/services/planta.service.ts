import { Injectable } from '@angular/core';
import { Planta } from '../model/planta';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlantaService {

  httpHeaders = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  }

  url: string = 'http://localhost:8080/api/v1/planta';
  

  constructor(private httpClient: HttpClient) { }

  async salvar(planta: Planta): Promise<Planta> {
    if (planta.id === 0) {
      return await firstValueFrom(this.httpClient.post<Planta>(this.url, JSON.stringify(planta), this.httpHeaders));
    } else {
      return await firstValueFrom(this.httpClient.put<Planta>(this.url, JSON.stringify(planta), this.httpHeaders));
    }
  }

  async consultar(): Promise<Planta[]>{   
    return await firstValueFrom(this.httpClient.get<Planta[]>(this.url));
  }
  
  async consultarPlanta(id: number): Promise<Planta> {
    let urlAuxiliar = this.url + "/" + id;    
    return await firstValueFrom(this.httpClient.get<Planta>(urlAuxiliar));
  }

  getFotoUrl(nomeArquivo: string): string {
    return `http://localhost:8080/uploads/fotos/${nomeArquivo}`;
  }
  
}
