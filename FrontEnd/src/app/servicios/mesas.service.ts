import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Mesas } from '../modelos/mesas.model';
import { Usuarios } from '../modelos/usuarios.model';

@Injectable({
  providedIn: 'root'
})
export class MesasService {

  constructor(private http: HttpClient) { }
  listar(): Observable<Mesas[]> {
    return this.http.get<Mesas[]>(`${environment.url_gateway}/mesas`);
  }
  eliminar(id: string) {
    return this.http.delete<Mesas>(`${environment.url_gateway}/mesas/${id}`,
    );
  }
  getMesa(id: string): Observable<Mesas> {
    return
    this.http.get<Mesas>(`${environment.url_gateway}/mesas/${id}`);
  }
  crear(laMesa: Mesas) {
    return this.http.post(`${environment.url_gateway}/mesas`,
      laMesa);
  }
  editar(id: string, laMesa: Mesas) {
    return this.http.put(`${environment.url_gateway}/mesas/${id}`,
      laMesa);
  }
}
 

