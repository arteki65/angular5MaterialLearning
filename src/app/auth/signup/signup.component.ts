import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {AuthService} from '../auth.service';
import {UIService} from '../../shared/ui.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate;
  isLoading = false;
  private loadingStateSubscription: Subscription;

  constructor(private authService: AuthService,
              private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingStateSubscription = this.uiService.loadingStateChanged.subscribe(state => this.isLoading = state);
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    });
  }

  ngOnDestroy(): void {
    if (this.loadingStateSubscription) {
      this.loadingStateSubscription.unsubscribe();
    }
  }
}
