import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training/training.service';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private snackBar: MatSnackBar) {
  }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.authSuccessfully();
      } else {
        this.trainingService.cancelSubscriptions();
        this.authChange.next(false);
        this.router.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authData: AuthData) {
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .catch(error => this.handleAuthError(error));
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(error => this.handleAuthError(error));
  }

  logout() {
    this.angularFireAuth.auth.signOut();
  }

  isAuth() {
    return this.isAuthenticated;
  }

  private authSuccessfully() {
    this.authChange.next(true);
    this.router.navigate(['/training']);
    this.isAuthenticated = true;
  }

  private handleAuthError(error) {
    this.snackBar.open(error.message, null, {
      duration: 3000
    });
  }
}
