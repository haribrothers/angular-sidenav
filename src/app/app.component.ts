import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav/sidenav.component';
import { SidenavMode } from './sidenav/sidenav.types';
import { SidenavContainerComponent } from "./sidenav/sidenav-container/sidenav-container.component";
import { SidenavContentComponent } from './sidenav/sidenav-content/sidenav-content.component';
import { IconRegistry } from './icon/icon.registry';
import { IconComponent } from './icon/icon.component';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, SidenavComponent, SidenavContainerComponent, SidenavContentComponent, IconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  isSidenavOpen = true;
  currentMode: SidenavMode = 'over';

  // menuItems = [
  //   'Dashboard',
  //   'Profile',
  //   'Settings',
  //   'Messages',
  //   'Help'
  // ];

  selectedIndex = 0;

  menuItems = [
    {
      name: 'Home',
      icon: 'home',
      items: [
        'Sample Item 1',
        'Sample Item 2',
        'Sample Item 3',
        'Sample Item 4',
        'Sample Item 5'
      ]
    },
    {
      name: 'Inbox',
      icon: 'inbox',
      items: [
        'Sample Item 6',
        'Sample Item 7',
        'Sample Item 8',
        'Sample Item 9',
        'Sample Item 10'
      ]
    },
    {
      name: 'Draft',
      icon: 'draft',
      items: [
        'Sample Item 11',
        'Sample Item 12',
        'Sample Item 13',
        'Sample Item 14',
        'Sample Item 15'
      ]
    },
    {
      name: 'Send Mail',
      icon: 'send_mail',
      items: [
        'Sample Item 16',
        'Sample Item 17',
        'Sample Item 18',
        'Sample Item 19',
        'Sample Item 20'
      ]
    }
  ]

  constructor() {
    const iconRegistry = inject(IconRegistry);

    iconRegistry.registerIcon('home', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M21 20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.48907C3 9.18048 3.14247 8.88917 3.38606 8.69972L11.3861 2.47749C11.7472 2.19663 12.2528 2.19663 12.6139 2.47749L20.6139 8.69972C20.8575 8.88917 21 9.18048 21 9.48907V20ZM19 19V9.97815L12 4.53371L5 9.97815V19H19ZM7 15H17V17H7V15Z"></path>
      </svg>
    `);
    iconRegistry.registerIcon('inbox', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4.02381 3.78307C4.12549 3.32553 4.5313 3 5 3H19C19.4687 3 19.8745 3.32553 19.9762 3.78307L21.9762 12.7831C21.992 12.8543 22 12.927 22 13V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V13C2 12.927 2.00799 12.8543 2.02381 12.7831L4.02381 3.78307ZM5.80217 5L4.24662 12H9C9 13.6569 10.3431 15 12 15C13.6569 15 15 13.6569 15 12H19.7534L18.1978 5H5.80217ZM16.584 14C15.8124 15.7659 14.0503 17 12 17C9.94968 17 8.1876 15.7659 7.41604 14H4V19H20V14H16.584Z"></path></svg>
    `);
    iconRegistry.registerIcon('draft', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M20 2C20.5523 2 21 2.44772 21 3V6.757L19 8.757V4H5V20H19V17.242L21 15.242V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V3C3 2.44772 3.44772 2 4 2H20ZM21.7782 8.80761L23.1924 10.2218L15.4142 18L13.9979 17.9979L14 16.5858L21.7782 8.80761ZM13 12V14H8V12H13ZM16 8V10H8V8H16Z"></path></svg>
    `);
    iconRegistry.registerIcon('send_mail', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3.5 1.34558C3.58425 1.34558 3.66714 1.36687 3.74096 1.40747L22.2034 11.5618C22.4454 11.6949 22.5337 11.9989 22.4006 12.2409C22.3549 12.324 22.2865 12.3924 22.2034 12.4381L3.74096 22.5924C3.499 22.7255 3.19497 22.6372 3.06189 22.3953C3.02129 22.3214 3 22.2386 3 22.1543V1.84558C3 1.56944 3.22386 1.34558 3.5 1.34558ZM5 4.38249V10.9999H10V12.9999H5V19.6174L18.8499 11.9999L5 4.38249Z"></path></svg>
    `);
    iconRegistry.registerIcon('junk_mail', `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M22 11.2547C21.396 10.8334 20.7224 10.5049 20 10.2899V7H11.5858L9.58579 5H4V19H11.2899C11.5049 19.7224 11.8334 20.396 12.2547 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H10.4142L12.4142 5H21C21.5523 5 22 5.44772 22 6V11.2547ZM18 22C15.2386 22 13 19.7614 13 17C13 14.2386 15.2386 12 18 12C20.7614 12 23 14.2386 23 17C23 19.7614 20.7614 22 18 22ZM16.7066 19.7076C17.0982 19.895 17.5369 20 18 20C19.6569 20 21 18.6569 21 17C21 16.5369 20.895 16.0982 20.7076 15.7066L16.7066 19.7076ZM15.2924 18.2934L19.2934 14.2924C18.9018 14.105 18.4631 14 18 14C16.3431 14 15 15.3431 15 17C15 17.4631 15.105 17.9018 15.2924 18.2934Z"></path></svg>
    `);

  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
  }

  closeSidenav() {
    this.isSidenavOpen = false;
  }

  setMode(mode: SidenavMode) {
    this.currentMode = mode;
  }

  toggleMenuItems(index: number) {
    this.selectedIndex = index;
  }
}
