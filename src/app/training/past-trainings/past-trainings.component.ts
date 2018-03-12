import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Exercise} from '../training/exercise.model';
import {TrainingService} from '../training/training.service';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  @ViewChild(MatSort) sortConf: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  private finishedExercisesSubscription = new Subscription();

  constructor(private trainingService: TrainingService) {
  }

  ngOnInit() {
    this.finishedExercisesSubscription = this.trainingService.finishedExercisesChanged
      .subscribe(exercises => this.dataSource.data = exercises);
    this.trainingService.fetchPastExercises();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sortConf;
    this.dataSource.paginator = this.paginator;
  }

  doFilter(value: string) {
    this.dataSource.filter = value.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.finishedExercisesSubscription.unsubscribe();
  }
}
