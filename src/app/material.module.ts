import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule]
})
export class MaterialModule {

}
