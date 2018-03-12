import {User} from './user.model';
import {AuthData} from './auth-data.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training/training.service';

@Injectable()
export class AuthService {
  authChange = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService) {
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
      .catch(error => console.log(error));
  }

  login(authData: AuthData) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .catch(error => console.log(error));
    this.authSuccessfully();
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
}
