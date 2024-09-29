import { Component } from '@angular/core';
import { FooterComponent } from '../../../layout/components/footer/footer.component';
import { HeaderComponent } from "../../../layout/components/header/header.component";
import { AsideComponent } from "../../../layout/components/aside/aside.component";
import { Router, RouterOutlet } from '@angular/router';
import { MainComponent } from '../main/main.component';
import { NgIf } from '@angular/common';
import { GetUserService } from '../../../shared/generalServices/get-user.service';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FooterComponent, HeaderComponent, AsideComponent, MainComponent, RouterOutlet, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  
    constructor(private router: Router, private getUser: GetUserService) {}

    isMainRoute() {
        const user = this.getUser.getUser();
        return this.router.url === `/home/${user.id}` || this.router.url === `/home/artist/${user.id}`;
      
    }
  }

