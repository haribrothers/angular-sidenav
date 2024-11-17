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

  @HostBinding('style.left') left = '64px';
  @HostBinding('style.margin-left') marginLeft = '0';
  @HostBinding('style.transform') transform = '';

  constructor(private readonly cdr: ChangeDetectorRef) {

  }

  set currentMode(mode: SidenavMode) {
    this.class = mode;
  }

  setSidenavChanges(mode: SidenavMode, isSidenavOpen: boolean, left: string = '64px', right: string = '250px') {
    const openClass = isSidenavOpen ? 'shifted' : '';
    console.log(mode, isSidenavOpen, openClass);
    this.class = `${mode} ${openClass}`;
    this.left = left;
    this.marginLeft = (isSidenavOpen && mode === 'side')  ? right : '0px';
    this.transform = (isSidenavOpen && mode === 'push') ? `translateX(${right})` : '';
    this.cdr.detectChanges();
  }
}
