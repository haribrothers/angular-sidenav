import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  OnDestroy,
  TemplateRef,
  OnChanges,
  Host,
  Optional,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMode } from '../sidenav.types';
import { Subject } from 'rxjs';
import { SidenavContainerComponent } from '../sidenav-container/sidenav-container.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit, OnDestroy, OnChanges {

  _leftNavWidth = '64px';
  _rightNavWidth = '250px';
  @Input() isOpen = false;
  @Input() mode: SidenavMode = 'side';
  @Input() set leftNavWidth(value: number) {
    this._leftNavWidth = `${value}px`;
  }
  @Input() set rightNavWidth(value: number) {
    this._rightNavWidth = `${value}px`;
  }
  @Output() closed = new EventEmitter<void>();

  @ViewChild('overlayContent') overlayContent!: TemplateRef<any>;

  private readonly destroy$ = new Subject<void>();

  constructor(
    @Host() @Optional() private readonly parent: SidenavContainerComponent
  ) { }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.parent.updateSidenav(this.mode, this.isOpen)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.parent) {
      if (changes['mode'] || changes['isOpen']) {
        console.log(this.mode, this.isOpen)
        this.parent.updateSidenav(this.mode, this.isOpen)
      }
    }
  }

  openNav() {
    if(this.mode === 'over') {
      this.isOpen = true;
      this.parent.updateSidenav(this.mode, this.isOpen)
    }
    
  }

  closeNav() {
    if(this.mode === 'over') {
      this.isOpen = false;
      this.parent.closeNav();
      this.parent.updateSidenav(this.mode, this.isOpen)
    }
  }

}