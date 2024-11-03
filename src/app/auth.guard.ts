import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { getAuth } from 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const auth = getAuth();
    const user = auth.currentUser; // Check if there is a current user

    if (user) {
      return true; // Allow access if user is logged in
    } else {
      // Redirect to login if not logged in
      this.router.navigate(['/login']);
      return false;
    }
  }
}
