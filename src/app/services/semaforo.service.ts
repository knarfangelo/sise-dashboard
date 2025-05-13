// semaforo.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Semaforo, SemaforoResponse } from '../models/models';

@Injectable({
  providedIn: 'root',
})
export class SemaforoService {
  private apiUrl = 'http://localhost:8080/api/semaforos'; // Cambia esto a tu endpoint de Spring Boot

  constructor(private http: HttpClient) {}

  // Método para obtener los semáforos
  getSemaforos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/listar');
  }

  registrarSemaforo(semaforo: Semaforo): Observable<any> {
    const dto = {
      nombre: semaforo.nombre,
      maxRojo: semaforo.maxRojo,
      maxAmarillo: semaforo.maxAmarillo,
      maxVerde: semaforo.maxVerde,
      idDistrito: semaforo.distritoId,
    };
    return this.http.post(`${this.apiUrl}/registrar`, dto);
  }

}
