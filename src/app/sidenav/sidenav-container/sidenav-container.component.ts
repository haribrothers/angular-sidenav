import { Component, ContentChild, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { SidenavContentComponent } from '../sidenav-content/sidenav-content.component';
import { SidenavMode } from '../sidenav.types';

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
  @ViewChild(SidenavContentComponent) _userContent!: SidenavContentComponent;

  updateSidenav(mode: SidenavMode, isSidenavOpen: boolean) {
    if(this._content){
      console.log(mode, isSidenavOpen);
      this._content.setSidenavChanges(mode, isSidenavOpen);
    }
  }
}
