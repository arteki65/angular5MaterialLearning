import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training/training.service';
import {Exercise} from '../training/exercise.model';
import {NgForm} from '@angular/forms';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  availableTrainings: Observable<any>;

  constructor(private trainingService: TrainingService,
              private dbService: AngularFirestore) {
  }

  ngOnInit() {
    this.availableTrainings = this.dbService.collection('availableExercises').valueChanges();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
