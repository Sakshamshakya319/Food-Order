import { Component, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  cartQuantity = 0;
  loggedIn = false; // Track login status
  userName: string | null = null; // Store user name for profile display
  auth = getAuth();

  constructor(private cartService: CartService) {
    // Subscribe to cart quantity changes
    this.cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  ngOnInit(): void {
    // Check authentication state
    onAuthStateChanged(this.auth, (user) => {
      if (user) {
        this.loggedIn = true;
        this.userName = user.displayName || user.email; // Use displayName if available, otherwise fallback to email
      } else {
        this.loggedIn = false;
        this.userName = null; // Reset userName when not logged in
      }
    });
  }

  logout() {
    signOut(this.auth).then(() => {
      console.log('Logout successful');
      this.loggedIn = false; // Update login status
      this.userName = null; // Clear username on logout
    }).catch((error) => {
      console.error('Logout error:', error);
    });
  }
}
