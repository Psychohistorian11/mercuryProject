import { Component } from '@angular/core';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-aside',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent {
  openMenu: number | null = null;

  toggleMenu(buttonNumber: number): void {
    if (this.openMenu === buttonNumber) {
      this.openMenu = null;
    } else {
      this.openMenu = buttonNumber;
    }
  }

  closeMenu(): void {
    this.openMenu = null;
  }
}
