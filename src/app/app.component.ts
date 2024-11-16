import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { SidenavMode } from './sidenav/sidenav.types';
import { SidenavContainerComponent } from "./sidenav/sidenav-container/sidenav-container.component";
import { SidenavContentComponent } from './sidenav/sidenav-content/sidenav-content.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidenavComponent, SidenavContainerComponent, SidenavContentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidenavOpen = true;
  currentMode: SidenavMode = 'side';

  menuItems = [
    'Dashboard',
    'Profile',
    'Settings',
    'Messages',
    'Help'
  ];

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  setMode(mode: SidenavMode) {
    this.currentMode = mode;
  }
}
