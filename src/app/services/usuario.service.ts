import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gestor } from '../interfaces/Gestor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = 'https://localhost:8080/usuario'; // Cambia esto por la URL de tu API

  constructor(private http: HttpClient) {

  }

   // Obtener todos los gestores
   getGestores(): Observable<Gestor[]> {
    return this.http.get<Gestor[]>(this.apiUrl);
  }

  // Obtener un gestor por DNI
  getGestor(dni: string): Observable<Gestor> {
    return this.http.get<Gestor>(`${this.apiUrl}/${dni}`);
  }

  // Crear un nuevo gestor
  createGestor(gestor: Gestor): Observable<Gestor> {
    return this.http.post<Gestor>(this.apiUrl, gestor);
  }

  // Actualizar un gestor
  updateGestor(dni: string, gestor: Gestor): Observable<Gestor> {
    return this.http.put<Gestor>(`${this.apiUrl}/${dni}`, gestor);
  }

  // Eliminar un gestor
  deleteGestor(dni: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${dni}`);
  }

}
