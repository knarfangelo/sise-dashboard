import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface Task {
  id?: number;
  title: string;
  description: string;
  department?: string;
  province?: string;
  district: string;
  status: 'pendiente' | 'en_progreso' | 'completada';
  dueDate: Date;
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private idCounter = 1;

  constructor() {}

  getAllTasks(): Observable<Task[]> {
    return of(this.tasks).pipe(delay(500)); // Simula retardo de red
  }

  createTask(task: Task): Observable<Task> {
    const newTask = { ...task, id: this.idCounter++ };
    this.tasks.push(newTask);
    return of(newTask).pipe(delay(500));
  }

  updateTask(updatedTask: Task): Observable<Task> {
    const index = this.tasks.findIndex(t => t.id === updatedTask.id);
    if (index !== -1) {
      this.tasks[index] = { ...updatedTask };
    }
    return of(updatedTask).pipe(delay(500));
  }

  deleteTask(taskId: number): Observable<boolean> {
    this.tasks = this.tasks.filter(t => t.id !== taskId);
    return of(true).pipe(delay(500));
  }
}
