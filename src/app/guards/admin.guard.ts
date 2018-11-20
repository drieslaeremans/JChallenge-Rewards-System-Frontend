import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.authService.userData$.subscribe(data => {
      if (!data ) {
        this.router.navigate(['/login']);
      } else {
        if (data.type !== 'worker') {
          this.authService.logout();
          this.router.navigate(['/login']);
        }
      }
    });
    return true;
  }
}
