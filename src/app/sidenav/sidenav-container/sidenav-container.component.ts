import { Component, ContentChild, HostBinding, ViewChild } from '@angular/core';
import { SidenavContentComponent } from '../sidenav-content/sidenav-content.component';
import { SidenavMode } from '../sidenav.types';
import { SidenavComponent } from '../sidenav/sidenav.component';

@Component({
  selector: 'app-sidenav-container',
  standalone: true,
  imports: [SidenavContentComponent],
  templateUrl: './sidenav-container.component.html',
  styleUrl: './sidenav-container.component.scss'
})
export class SidenavContainerComponent{
  @HostBinding('class') class = 'sidenav-container';

  @ContentChild(SidenavContentComponent) _content!: SidenavContentComponent;
  @ContentChild(SidenavComponent) _sidenav!: SidenavComponent;
  @ViewChild(SidenavContentComponent) _userContent!: SidenavContentComponent;

  _mode: SidenavMode = 'side';
  _isOpen = false;

  closeNav() {
    this._isOpen = false;
    if(this._sidenav){
      this._sidenav.isOpen = this._isOpen;
      this._sidenav.closed.emit();
    }
    this.updateSidenav(this._mode, this._isOpen);
  }

  updateSidenav(mode: SidenavMode, isSidenavOpen: boolean) {
    this._mode = mode;
    this._isOpen = isSidenavOpen;
    if(this._content){
      console.log(mode, isSidenavOpen);
      this._content.setSidenavChanges(mode, isSidenavOpen, this._sidenav._leftNavWidth, this._sidenav._rightNavWidth);
    }
  }
}
