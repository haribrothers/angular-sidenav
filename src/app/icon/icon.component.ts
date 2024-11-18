import { Component, Input, OnInit, inject, signal, computed, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { IconRegistry } from './icon.registry';
import { IconTransform } from './icon.type';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span 
      class="icon-container" 
      [class.loading]="isLoading"
      [class.error]="hasError"
      [innerHTML]="svgContent" 
      [ngStyle]="containerStyles"
      [style.color]="color">
    </span>
    <span 
      *ngIf="hasError" 
      class="error-message">
      Icon '{{name}}' not found
    </span>
  `,
  styles: [`
    :host {
      display: inline-block;
      position: relative;
    }
    .icon-container {
      line-height: 0;
      display: inline-flex;
      align-items: center;
      justify-content: center;
    }
    .icon-container.loading {
      animation: pulse 1.5s ease-in-out infinite;
      background-color: currentColor;
      opacity: 0.2;
      border-radius: 4px;
    }
    .icon-container.error {
      color: #dc2626;
    }
    .icon-container ::ng-deep svg {
      width: 100%;
      height: 100%;
      fill: currentColor;
    }
    .error-message {
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      font-size: 12px;
      color: #dc2626;
      white-space: nowrap;
    }
    @keyframes pulse {
      0% { opacity: 0.2; }
      50% { opacity: 0.4; }
      100% { opacity: 0.2; }
    }
  `]
})
export class IconComponent implements OnInit, OnDestroy {
  @Input() name!: string;
  @Input() size: number = 24;
  @Input() color?: string;
  @Input() set transform(value: IconTransform | undefined) {
    this._transform = value;
    this.updateContainerStyles();
  }
  get transform(): IconTransform | undefined {
    return this._transform;
  }

  private _transform?: IconTransform;
  // private iconRegistry = inject(IconRegistry);
  // private sanitizer = inject(DomSanitizer);
  // private cdr = inject(ChangeDetectorRef);
  private loadingSubscription?: Subscription;

  isLoading = false;
  hasError = false;
  svgContent: SafeHtml | null = null;
  containerStyles: Record<string, string> = {};

  constructor(private iconRegistry: IconRegistry, private sanitizer: DomSanitizer, private cdr : ChangeDetectorRef) {}

  ngOnInit() {
    this.loadIcon();
    this.updateContainerStyles();
    this.subscribeToLoadingStatus();
  }

  ngOnDestroy() {
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  private loadIcon() {
    const svgContent = this.iconRegistry.getIcon(this.name);
    
    if (!svgContent) {
      this.hasError = true;
      this.svgContent = null;
      return;
    }

    this.hasError = false;
    this.svgContent = this.sanitizer.bypassSecurityTrustHtml(svgContent);
    this.cdr.markForCheck();
  }

  private subscribeToLoadingStatus() {
    this.loadingSubscription = this.iconRegistry.getLoadingStatus()
      .subscribe(status => {
        this.isLoading = status[this.name] || false;
        this.cdr.markForCheck();
      });
  }

  private updateContainerStyles() {
    const transform = this.transform || {};
    const styles: Record<string, string> = {
      width: `${this.size}px`,
      height: `${this.size}px`,
      display: 'inline-block',
    };

    const transforms: string[] = [];
    
    if (transform.rotate) {
      transforms.push(`rotate(${transform.rotate}deg)`);
    }
    if (transform.flipHorizontal) {
      transforms.push('scaleX(-1)');
    }
    if (transform.flipVertical) {
      transforms.push('scaleY(-1)');
    }
    if (transform.scale && transform.scale !== 1) {
      transforms.push(`scale(${transform.scale})`);
    }

    if (transforms.length > 0) {
      styles['transform'] = transforms.join(' ');
    }

    this.containerStyles = styles;
  }
}