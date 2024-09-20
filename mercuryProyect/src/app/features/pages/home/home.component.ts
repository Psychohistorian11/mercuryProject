import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { HeaderComponent } from "../../../layout/components/header/header.component";
import { AsideComponent } from "../../../layout/components/aside/aside.component";
import { Router, RouterOutlet } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, AsideComponent, MainComponent, RouterOutlet, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  /*Yo se que a home le llegará un id qu es el identificador del usuario porque
    tras el proceso de login me llegará el id a este componente  */
  
    constructor(private router: Router) {}

    isMainRoute(){
      return this.router.url === '/';
    }

    navigateToProfile(){
      this.router.navigate(['profile']);
    }

    navigateToAlbum(){
      this.router.navigate(['album']);
    }

    navigateToArtistSongs(){
      this.router.navigate(['my-songs']);
    }
  }

