import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UIService} from '../../shared/ui.service';
import * as UI from '../../shared/ui.actions';
import * as TRAINING from '../training.actions';
import * as fromTraining from '../training.reducer';
import {Store} from '@ngrx/store';

@Injectable()
export class TrainingService {
  private firebaseSubscriptions: Subscription[] = [];

  constructor(private dbService: AngularFirestore,
              private uiService: UIService,
              private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
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
          this.store.dispatch(new UI.StopLoading());
          this.store.dispatch(new TRAINING.SetAvailableTrainings(exercises));
        },
        () => {
          this.store.dispatch(new UI.StopLoading());
          this.uiService.showSnackBar('Fethcing exercises failed!', null);
          this.availableExercisesChanged.next(null);
        }
      ));
  }

  startExercise(selectedId: string) {
    this.store.dispatch(new TRAINING.StartTraining(selectedId));
  }

  completeExercise() {
    this.addDataToDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.store.dispatch(new TRAINING.StopTraining());
  }

  cancelExercise(progress: number) {
    this.addDataToDb({
      ...this.runningExercise,
      date: new Date(),
      state: 'cancelled',
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100)
    });
    this.store.dispatch(new TRAINING.StopTraining());
  }

  getRunningExercise() {
    return {...this.runningExercise};
  }

  fetchPastExercises() {
    this.firebaseSubscriptions.push(this.dbService.collection('finishedExercises').valueChanges().subscribe((exercises: Exercise[]) => {
      this.store.dispatch(new TRAINING.SetFinishedTrainings(exercises));
    }, error => console.log('error while fetching past exercises: ', error)));
  }

  cancelSubscriptions() {
    this.firebaseSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private addDataToDb(exercises: Exercise) {
    this.dbService.collection('finishedExercises').add(exercises);
  }
}
