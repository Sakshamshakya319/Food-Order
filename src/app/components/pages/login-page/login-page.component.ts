import { Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {
  email: string = '';
  password: string = '';
  loggedIn: boolean = false; // Track login status
  userName: string | null = null; // Store user name for profile display

  constructor(private router: Router) {} // Inject Router

  onSubmit() {
    if (this.email && this.password) {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
        .then(userCredential => {
          this.handleLoginSuccess(userCredential.user);
        })
        .catch(error => {
          console.error('Login error:', error);
          alert(error.message);
        });
    } else {
      alert('Please enter both email and password.');
    }
  }

  signInWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => {
        this.handleLoginSuccess(result.user);
      })
      .catch(error => {
        console.error('Google sign-in error:', error);
        alert(error.message);
      });
  }


  private handleLoginSuccess(user: User) {
    this.loggedIn = true; // Set login status to true
    this.userName = user.displayName || user.email; // Get user name or email
    console.log('Login successful:', this.userName);
    
    // Redirect to the homepage after successful login
    this.router.navigate(['/']); // Assuming '/' is your homepage route
  }
}
