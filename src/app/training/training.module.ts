import {NgModule} from '@angular/core';
import {NewTrainingComponent} from './new-training/new-training.component';
import {CurrentTrainingComponent} from './current-training/current-training.component';
import {PastTrainingsComponent} from './past-trainings/past-trainings.component';
import {TrainingComponent} from './training/training.component';
import {StopTrainingComponent} from './current-training/stop-training.component';
import {SharedModule} from '../shared/shared.module';
import {TrainingRoutingModule} from './training-routing.module';
import {StoreModule} from '@ngrx/store';
import {trainingReducer} from './training.reducer';

@NgModule({
  declarations: [
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingsComponent,
    StopTrainingComponent
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', trainingReducer)
  ],
  exports: [],
  entryComponents: [StopTrainingComponent]
})
export class TrainingModule {

}
