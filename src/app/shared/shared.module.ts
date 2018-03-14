import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {CommonModule} from '@angular/common';
import {MaterialModule} from '../material.module';
import {FormsModule} from '@angular/forms';

@NgModule({
  imports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule
  ],
  exports: [
    FormsModule,
    MaterialModule,
    CommonModule,
    FlexLayoutModule
  ]
})
export class SharedModule {

}
