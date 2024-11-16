import { ChangeDetectorRef, Component, HostBinding } from '@angular/core';
import { SidenavMode } from '../sidenav.types';

@Component({
  selector: 'app-sidenav-content',
  standalone: true,
  imports: [],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.scss'
})
export class SidenavContentComponent {
// [class]="currentMode" [class.shifted]="isSidenavOpen"
  @HostBinding('class.sidenav-content') hostClass = true;
  @HostBinding('class') class = 'side';

  constructor(private readonly cdr: ChangeDetectorRef) {

  }

  set currentMode(mode: SidenavMode) {
    this.class = mode;
  }

  setSidenavChanges(mode: SidenavMode, isSidenavOpen: boolean) {
    const openClass = isSidenavOpen ? 'shifted' : '';
    console.log(mode, isSidenavOpen, openClass);
    this.class = `${mode} ${openClass}`;
    this.cdr.detectChanges();
  }
}
