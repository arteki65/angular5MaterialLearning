import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training/training.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Exercise} from '../training/exercise.model';
import {Observable} from 'rxjs/Observable';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings: Exercise[] = [];
  isLoading$: Observable<boolean>;
  private availableExercisesSubscription = new Subscription();


  constructor(private trainingService: TrainingService,
              private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    this.trainingService.availableExercisesChanged.subscribe(exercises => {
      this.availableTrainings = exercises;
    });
    this.fetchExercises();
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    if (this.availableExercisesSubscription) {
      this.availableExercisesSubscription.unsubscribe();
    }
  }
}
