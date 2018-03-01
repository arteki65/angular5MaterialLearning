import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TrainingService} from '../training/training.service';
import {Exercise} from '../training/exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  @Output() trainingStart = new EventEmitter<void>();
  availableTrainings: Exercise[];

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.availableTrainings = this.trainingService.availableExercises;
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
