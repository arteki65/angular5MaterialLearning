import {Component, OnDestroy, OnInit} from '@angular/core';
import {TrainingService} from '../training/training.service';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs/Subscription';
import {Exercise} from '../training/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  availableTrainings: Exercise[] = [];
  private availableExercisesSubscription = new Subscription();


  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.trainingService.availableExercisesChanged.subscribe(exercises => this.availableTrainings = exercises);
    this.trainingService.fetchtAvailableExercises();
  }

  ngOnDestroy(): void {
    this.availableExercisesSubscription.unsubscribe();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
