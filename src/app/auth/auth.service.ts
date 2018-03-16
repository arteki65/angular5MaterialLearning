import {AuthData} from './auth-data.model';
import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {TrainingService} from '../training/training/training.service';
import {UIService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as AUTH from './auth.actions';

@Injectable()
export class AuthService {

  constructor(private router: Router, private angularFireAuth: AngularFireAuth,
              private trainingService: TrainingService,
              private uiSerivce: UIService,
              private store: Store<fromRoot.State>) {
  }

  initAuthListener() {
    this.angularFireAuth.authState.subscribe(user => {
      if (user) {
        this.authSuccessfully();
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new AUTH.SetUnauthenticated());
        // noinspection JSIgnoredPromiseFromCall
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.store.dispatch(new UI.StopLoading())
      )
      .catch(error => this.handleAuthError(error));
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.angularFireAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
      .then(() => this.store.dispatch(new UI.StopLoading()))
      .catch(error => this.handleAuthError(error));
  }

  logout() {
    // noinspection JSIgnoredPromiseFromCall
    this.angularFireAuth.auth.signOut();
  }

  private authSuccessfully() {
    this.store.dispatch(new AUTH.SetAuthenticated());
    // noinspection JSIgnoredPromiseFromCall
    this.router.navigate(['/training']);
  }

  private handleAuthError(error) {
    this.store.dispatch(new UI.StopLoading());
    this.uiSerivce.showSnackBar(error.message, null);
  }
}
