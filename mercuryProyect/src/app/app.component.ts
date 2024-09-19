import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./layout/components/header/header.component";
import { HomeComponent } from "./features/pages/home/home.component";
import { FooterComponent } from "./layout/components/footer/footer.component";
import { AsideComponent } from "./layout/components/aside/aside.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, HomeComponent, FooterComponent, AsideComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'mercuryProyect';
}
