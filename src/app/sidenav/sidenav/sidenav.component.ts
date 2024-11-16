import { 
  Component, 
  Input, 
  Output, 
  EventEmitter, 
  ViewChild, 
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
  OnChanges,
  Host,
  Optional,
  SimpleChange,
  SimpleChanges,
  AfterViewInit
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidenavMode } from '../sidenav.types';
import { Overlay, OverlayRef, OverlayModule } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { Subject, takeUntil } from 'rxjs';
import { SidenavContainerComponent } from '../sidenav-container/sidenav-container.component';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, OverlayModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements AfterViewInit, OnDestroy, OnChanges {
  @Input() isOpen = false;
  @Input() mode: SidenavMode = 'side';
  @Output() closed = new EventEmitter<void>();
  
  @ViewChild('overlayContent') overlayContent!: TemplateRef<any>;
  
  private overlayRef?: OverlayRef;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly overlay: Overlay,
    private readonly viewContainerRef: ViewContainerRef,
    @Host() @Optional() private parent: SidenavContainerComponent
  ) {}

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.disposeOverlay();
  }

  private createOverlay() {
    if (!this.overlayRef) {
      this.overlayRef = this.overlay.create({
        hasBackdrop: true,
        backdropClass: 'cdk-overlay-dark-backdrop',
        positionStrategy: this.overlay
          .position()
          .global()
      });

      this.overlayRef
        .backdropClick()
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.closed.emit();
        });
    }
  }

  private disposeOverlay() {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = undefined;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
    this.parent.updateSidenav(this.mode, this.isOpen)
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if(this.parent ) {
      if(changes['mode'] || changes['isOpen']) {
        console.log(this.mode, this.isOpen)
        this.parent.updateSidenav(this.mode, this.isOpen)
      }
    }
    if (this.mode === 'over') {
      if (this.isOpen) {
        this.createOverlay();
        const portal = new TemplatePortal(
          this.overlayContent,
          this.viewContainerRef
        );
        this.overlayRef?.attach(portal);
      } else {
        this.disposeOverlay();
      }
    } else {
      this.disposeOverlay();
    }
  }

  closeNav(): void {
    if (this.mode === 'over') {
      this.closed.emit();
    }
  }
}