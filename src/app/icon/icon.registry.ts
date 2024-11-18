import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IconRegistry {
  private registry = new Map<string, string>();
  private loadingIcons = new Set<string>();
  private loadingStatus = new BehaviorSubject<Record<string, boolean>>({});

  registerIcon(name: string, data: string): void {
    this.registry.set(name, data);
    this.loadingIcons.delete(name);
    this.updateLoadingStatus();
  }

  getIcon(name: string): string | undefined {
    return this.registry.get(name);
  }

  hasIcon(name: string): boolean {
    return this.registry.has(name);
  }

  isLoading(name: string): boolean {
    return this.loadingIcons.has(name);
  }

  setLoading(name: string, loading: boolean): void {
    if (loading) {
      this.loadingIcons.add(name);
    } else {
      this.loadingIcons.delete(name);
    }
    this.updateLoadingStatus();
  }

  getLoadingStatus(): Observable<Record<string, boolean>> {
    return this.loadingStatus.asObservable();
  }

  private updateLoadingStatus(): void {
    const status: Record<string, boolean> = {};
    this.loadingIcons.forEach(name => {
      status[name] = true;
    });
    this.loadingStatus.next(status);
  }
}