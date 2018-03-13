import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training/training.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Exercise} from '../training/exercise.model';
import {UIService} from '../../shared/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings: Exercise[] = [];
  isLoading = true;
  private availableExercisesSubscription = new Subscription();
  private loadingSubs: Subscription;


  constructor(private trainingService: TrainingService,
              private uiService: UIService) {
  }

  ngOnInit() {
    this.loadingSubs = this.uiService.loadingStateChanged.subscribe(loading => this.isLoading = loading);
    this.trainingService.availableExercisesChanged.subscribe(exercises => {
      this.availableTrainings = exercises;
    });
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
    this.loadingSubs.unsubscribe();
  }
}
