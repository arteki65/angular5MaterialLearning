import {NgModule} from '@angular/core';
import {
  MatButtonModule, MatCheckboxModule, MatDatepickerModule, MatFormFieldModule, MatIconModule, MatInputModule, MatListModule,
  MatNativeDateModule, MatSidenavModule, MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule, MatDatepickerModule,
    MatNativeDateModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatListModule]
})
export class MaterialModule {

}
