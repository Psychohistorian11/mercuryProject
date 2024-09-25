import { Component, EventEmitter, Output } from '@angular/core';
import { SearchComponent } from '../../../shared/generalComponents/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { ActivateLaboratoryService } from '../../../auth/services/activate-laboratory.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink, NgIf],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  showLaboratory = false;
  constructor(private activate: ActivateLaboratoryService, private router: Router) {
    this.activate.decision$.subscribe((decision: boolean) => {
      this.showLaboratory = decision;
    })
  }
  

  onExitClick(){
    localStorage.removeItem('user');
 
    this.router.navigate(['/login'])
  }


    @Output() profileClick = new EventEmitter<void>();
    onProfileClick(){
      this.profileClick.emit();
    }

  }

