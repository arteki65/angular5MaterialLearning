import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';

@Injectable()
export class TrainingService {
  exerciseChange = new Subject<Exercise>();
  availableExercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise;
  private firebaseSubscriptions: Subscription[] = [];


  constructor(private dbService: AngularFirestore) {
  }

  fetchAvailableExercises() {
    this.firebaseSubscriptions.push(this.dbService.collection('availableExercises').snapshotChanges()
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
        }, error => console.log('error while fetching available exercises: ', error)
      ));
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId);
    this.exerciseChange.next({
      ...this.runningExercise
    });
  }

  completeExercise() {
    this.addDataToDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChange.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDb({
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

  fetchPastExercises() {
    this.firebaseSubscriptions.push(this.dbService.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.finishedExercisesChanged.next(exercises);
    }, error => console.log('error while fetching past exercises: ', error)));
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDb(exercises: Exercise) {
    this.dbService.collection('finishedExercises').add(exercises);
  }
}
