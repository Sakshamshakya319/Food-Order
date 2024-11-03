import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, updateProfile } from 'firebase/auth';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  name: string = ''; // Username
  email: string = ''; // Email for authentication
  password: string = '';
  confirmPassword: string = '';
  auth = getAuth();

  constructor(private router: Router) {}

  onSubmit() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Create user with email and password
    createUserWithEmailAndPassword(this.auth, this.email, this.password)
      .then(async (userCredential) => {
        // Signed in
        const user = userCredential.user;

        // Update the user's profile with the username (name)
        await updateProfile(user, { displayName: this.name });

        console.log('Signup successful:', user);
        this.router.navigate(['/']); // Redirect to home page after signup
      })
      .catch((error) => {
        // Handle specific error messages
        switch (error.code) {
          case 'auth/email-already-in-use':
            alert('This email is already in use. Please log in instead.');
            break;
          case 'auth/invalid-email':
            alert('Please enter a valid email address.');
            break;
          case 'auth/weak-password':
            alert('Password should be at least 6 characters.');
            break;
          default:
            alert('Signup error: ' + error.message);
        }
        console.error('Signup error:', error);
      });
  }

  signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('Google sign-in successful:', result.user);
        this.router.navigate(['/']);
      })
      .catch((error) => {
        console.error('Google sign-in error:', error);
        alert(error.message);
      });
  }

  
}
