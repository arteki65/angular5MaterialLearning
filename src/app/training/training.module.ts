import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NewTrainingComponent} from './new-training/new-training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training/training.component';
import {MaterialModule} from '../material.module';
import {CommonModule} from '@angular/common';
import {FlexLayoutModule} from '@angular/flex-layout';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {AngularFirestoreModule} from 'angularfire2/firestore';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule,
    AngularFirestoreModule
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
