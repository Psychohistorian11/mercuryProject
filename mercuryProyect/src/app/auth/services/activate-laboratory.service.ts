import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateLaboratoryService {

  private decisionSource = new BehaviorSubject<boolean>(false);  // Inicializar directamente con un valor por defecto

  constructor() {
    // Obtener el valor del localStorage
    const savedDecision = localStorage.getItem('isArtist');
    const initialDecision = savedDecision === 'true'; // Convertir a boolean
    // Actualizar el BehaviorSubject con el valor almacenado
    this.decisionSource.next(initialDecision);
  }

  // Observable para suscribirse al valor
  decision$ = this.decisionSource.asObservable();

  setDecision(value: boolean) {
    // Guardar el valor en el BehaviorSubject
    this.decisionSource.next(value);
    // Guardar el valor en localStorage para que persista después de recargar
    localStorage.setItem('isArtist', String(value));
  }
}
