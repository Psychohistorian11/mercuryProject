import { NgClass, NgIf } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-aside-chat',
  standalone: true,
  imports: [NgClass, NgIf],
  templateUrl: './aside-chat.component.html',
  styleUrl: './aside-chat.component.css'
})
export class AsideChatComponent {
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
