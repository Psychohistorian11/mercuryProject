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

  // Toggles the menu based on button clicked
  toggleMenu(buttonNumber: number): void {
    if (this.openMenu === buttonNumber) {
      this.openMenu = null; // Closes the menu if already opened
    } else {
      this.openMenu = buttonNumber; // Opens the respective menu
    }
  }

  closeMenu(): void {
    this.openMenu = null;
  }
}
