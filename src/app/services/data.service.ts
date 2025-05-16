import { Injectable } from '@angular/core';
import { Ciudadano } from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  getCiudadanos(): Ciudadano[] {
    return [
      {
        dni: '3333333',
        nombre: 'Juan',
        apellidoPaterno: 'Pérez',
        apellidoMaterno: 'Gómez',
        celular: '948524680',
        estado: 'En revisión',
        departamento: 'Lima',
        provincia: 'Lima',
        distrito: 'Miraflores'
      },
      {
        dni: '0987654321',
        nombre: 'María',
        apellidoPaterno: 'López',
        apellidoMaterno: 'Martínez',
        celular: '948524680',
        estado: 'Aprobado',
        departamento: 'Arequipa',
        provincia: 'Arequipa',
        distrito: 'Yanahuara'
      },
      {
        dni: '1122334455',
        nombre: 'Carlos',
        apellidoPaterno: 'García',
        apellidoMaterno: 'Hernández',
        celular: '948524680',
        estado: 'Rechazado',
        departamento: 'Cusco',
        provincia: 'Cusco',
        distrito: 'San Blas'
      },
      {
        dni: '5566778899',
        nombre: 'Ana',
        apellidoPaterno: 'Ramírez',
        apellidoMaterno: 'Torres',
        celular: '948524680',
        estado: 'En revisión',
        departamento: 'Piura',
        provincia: 'Piura',
        distrito: 'Castilla'
      }
    ];
  }

  getEstados(): { name: string; code: string }[] {
    return [
      { name: 'En revisión', code: 'ENR' },
      { name: 'Aprobado', code: 'APR' },
      { name: 'Rechazado', code: 'REJ' }
    ];
  }

  getDepartamentos(): string[] {
    return ['Lima', 'Arequipa', 'Cusco', 'Piura', 'La Libertad'];
  }

  getEstadisticas() {
    return {
      total: 100000,
      genero: {
        hombres: 50000,
        mujeres: 50000
      },
      estadoCivil: {
        soltero: 1000,
        casado: 500,
        divorciado: 1300,
        viudo: 1000,
        otro: 1500
      },
      registrosPorDia: [
        { date: '2025-04-01', count: 2 },
        { date: '2025-04-02', count: 5 },
        { date: '2025-04-03', count: 3 },
        { date: '2025-04-04', count: 7 },
        { date: '2025-04-05', count: 4 },
        { date: '2025-04-06', count: 16 }
      ],
      porDepartamento: [
        { departamento: 'Lima', count: 50000 },
        { departamento: 'Arequipa', count: 25000 },
        { departamento: 'Cusco', count: 12000 },
        { departamento: 'La Libertad', count: 8000 },
        { departamento: 'Piura', count: 6000 }
      ],
      estados: {
        aprobados: 150,
        enRevision: 100,
        rechazados: 70
      }
    };
  }
}
