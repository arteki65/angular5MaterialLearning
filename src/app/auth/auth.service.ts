import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training/training.service';
import {MatSnackBar} from '@angular/material';
import {UIService} from '../shared/ui.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiSerivce: UIService) {
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
    this.uiSerivce.loadingStateChanged.next(true);
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.uiSerivce.loadingStateChanged.next(false))
      .catch(error => this.handleAuthError(error));
  }

  login(authData: AuthData) {
    this.uiSerivce.loadingStateChanged.next(true);
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(res => this.uiSerivce.loadingStateChanged.next(false))
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
    this.uiSerivce.loadingStateChanged.next(false);
    this.uiSerivce.showSnackBar(error.message, null);
  }
}
