import {NgModule} from '@angular/core';
import {MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule],
  exports: [MatButtonModule, MatIconModule, MatInputModule, MatFormFieldModule]
})
export class MaterialModule {

}
