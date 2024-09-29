import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActivateLaboratoryService {

  private decisionSource = new BehaviorSubject<boolean>(false); 

  constructor() {

    const savedDecision = localStorage.getItem('isArtist');
    const initialDecision = savedDecision === 'true'; 
  
    this.decisionSource.next(initialDecision);
  }
  decision$ = this.decisionSource.asObservable();
  

  setDecision(value: boolean) {
    this.decisionSource.next(value);
    localStorage.setItem('isArtist', String(value));
  }
}
