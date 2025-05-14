// models.ts
export interface Departamento {
    id: number;
    nombre: string;
    provincias: Provincia[];
  }

  export interface Provincia {
    id: number;
    nombre: string;
    distritos: Distrito[];
  }

  export interface Distrito {
    id: number;
    nombre: string;
  }

  export interface Persona {
    dni: string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    celular: string;
    email: string;
    departamento: string;
    provincia: string;
    distrito: string;
    miembros: number;
  }

  export interface SelectItem {
    label: string;
    value: number;
  }
  export interface Semaforo {
    nombre: string;
    maxRojo: number;
    maxAmarillo: number;
    maxVerde: number;
    departamento: string;
    provincia: string;
    distrito: string;
    distritoId: number;
  }

export interface SemaforoResponse {
  nombre: string;
  maxRojo: number;
  maxAmarillo: number;
  maxVerde: number;
}

export interface Ciudadano {
  dni: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  celular: string;
  estado: string;
  departamento?: string;
  provincia?: string;
  distrito?: string;
}