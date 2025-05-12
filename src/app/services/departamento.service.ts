import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private apiUrl = 'http://localhost:8080/departamento'; // Cambia esto por la URL de tu API


  constructor(private http: HttpClient) { }

  getDepartamentos(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}`);
  }


}
