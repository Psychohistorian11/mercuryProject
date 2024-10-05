import { Component } from '@angular/core';
import { SearchComponent } from '../../../shared/generalComponents/search/search.component';
import { Router, RouterLink } from '@angular/router';
import { ActivateLaboratoryService } from '../../../auth/services/activate-laboratory.service';
import { NgIf } from '@angular/common';
import { PlaySongComponent } from '../../../shared/generalComponents/play-song/play-song.component';
import { GetUserService } from '../../../shared/generalServices/get-user.service';
import {User} from '../../../auth/interfaces/user.interface'
import { SearchService } from '../../../features/services/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [SearchComponent, RouterLink, NgIf, PlaySongComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  showLaboratory = false;
  actualUser: User

  constructor(private activate: ActivateLaboratoryService,
              private router: Router, 
              private user: GetUserService,
              private search: SearchService) {
    this.activate.decision$.subscribe((decision: boolean) => {
      this.showLaboratory = decision;
      console.log("eeeeoscddv: ", this.showLaboratory)
    })  
    this.actualUser = this.user.getUser()
  }

  onBackMenu(){
    if(this.actualUser.role === 'artist'){
      this.router.navigate([`/home/artist/${this.actualUser.id}`])
    }else{
      this.router.navigate([`/home/${this.actualUser.id}`])

    } 
    
  }

  onMysongsClick(){
    this.search.deactivateAlarm()
    this.router.navigate([`/home/artist/${this.actualUser.id}/my-songs`])
  }

  onProfileClick(){
    if(this.actualUser.role === 'artist'){
      this.router.navigate([`/home/artist/${this.actualUser.id}/profile`])
    }else{
      this.router.navigate([`/home/${this.actualUser.id}/profile`])

    } 
  }

  onExitClick(){
    localStorage.removeItem('user');
    localStorage.removeItem('currentAudio')
    localStorage.removeItem('currentImage')
    this.router.navigate(['/login'])
  }


  


  }

