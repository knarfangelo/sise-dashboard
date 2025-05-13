import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {
  private baseUrl = 'http://localhost:8080/api/departamentos';

  constructor(private http: HttpClient) {}

  listarDepartamentos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/listar`);
  }
}
