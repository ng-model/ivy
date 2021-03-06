import { Injectable, NgZone } from '@angular/core';
import { User } from '../models/user';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import { ToastrService } from 'ngx-toastr';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    userData: any;
    constructor(
        public afs: AngularFirestore,
        public afAuth: AngularFireAuth,
        public router: Router,
        public ngZone: NgZone,
        public toastr: ToastrService
    ) {
        this.afAuth.authState.subscribe(user => {
            if (user) {
                this.userData = user;
                localStorage.setItem('user', JSON.stringify(this.userData));
                JSON.parse(localStorage.getItem('user'));
            } else {
                localStorage.setItem('user', null);
                JSON.parse(localStorage.getItem('user'));
            }
        })
    }

    SignIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                this.ngZone.run(() => {
                    JSON.parse(localStorage.getItem('user'));
                    this.router.navigate(['products/home']);
                });
                this.SetUserData(result.user);
            }).catch((error) => {
                console.log(error.message);
                this.toastr.success(error.message, 'Oops!', {
                    disableTimeOut: true
                });
            })
    }

    SignUp(email, password) {
        return this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                /* Call the SendVerificaitonMail() function when new user sign 
                up and returns promise */
                this.SendVerificationMail();
                this.SetUserData(result.user);
            }).catch((error) => {
                console.log(error.message);
                this.toastr.success(error.message, 'Oops!', {
                    disableTimeOut: true
                });
            })
    }

    // Send email verfificaiton when new user sign up
    SendVerificationMail() {
        return this.afAuth.currentUser.then(u => u.sendEmailVerification())
            .then(() => {
                this.router.navigate(['auth/verify-email']);
            })
    }

    // Reset Forggot password
    ForgotPassword(passwordResetEmail) {
        return this.afAuth.sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.toastr.success('Password reset email sent, check your inbox.', 'Succcess');
            }).catch((error) => {
                this.toastr.success(error, 'Oops!', {
                    disableTimeOut: true
                });
            })
    }

    // Returns true when user is looged in and email is verified
    get isLoggedIn(): boolean {
        const user = JSON.parse(localStorage.getItem('user'));
        return (user !== null && user.emailVerified !== false) ? true : false;
    }

    // Sign in with Google
    GoogleAuth() {
        return this.AuthLogin(new auth.GoogleAuthProvider());
    }

    // Sign in with Github
    GithubAuth() {
        return this.AuthLogin(new auth.GithubAuthProvider());
    }

    // guestLogin() {
    //     return this.AuthLogin(new auth.signInAnonymously());
    // }

    // Auth logic to run auth providers
    AuthLogin(provider) {
        return this.afAuth.signInWithPopup(provider)
            .then((result) => {
                this.ngZone.run(() => {
                    this.router.navigate(['products/home']);
                })
                this.SetUserData(result.user);
            }).catch((error) => {
                this.toastr.success(error, 'Oops!', {
                    disableTimeOut: true
                });
            })
    }

    /* Setting up user data when sign in with username/password, 
    sign up with username/password and sign in with social auth  
    provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
    SetUserData(user) {
        const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified
        }
        return userRef.set(userData, {
            merge: true
        })
    }

    // Sign out 
    SignOut() {
        return this.afAuth.signOut().then(() => {
            localStorage.removeItem('user');
            this.router.navigate(['auth/login']);
            this.toastr.success('Logged out successfully', 'Thanks', {
                timeOut: 2000
            });
            setTimeout(() => {
                window.location.reload();
            }, 3000);
        })
    }

}