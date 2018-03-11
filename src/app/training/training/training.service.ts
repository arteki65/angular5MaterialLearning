import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';

@Injectable()
export class TrainingService {
  exerciseChange = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private exercises: Exercise[] = [];


  constructor(private dbService: AngularFirestore) {
  }

  fetchtAvailableExercises() {
    this.dbService.collection('availableExercises').snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            ...doc.payload.doc.data()
          };
        });
      })
      .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.availableExercisesChanged.next([...this.availableExercises]);
        }
      )
    ;
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({
      ...this.runningExercise
    });
  }

  completeExercise() {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.exercises.push({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  getPastExercises() {
    return this.exercises.slice();
  }
}
