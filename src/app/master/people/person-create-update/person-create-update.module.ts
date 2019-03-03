import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonCreateUpdateComponent } from './person-create-update.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatDialogModule, MatIconModule, MatInputModule, MatRadioModule, MatSelectModule } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatRadioModule,
    MatSelectModule
  ],
  declarations: [PersonCreateUpdateComponent],
  entryComponents: [PersonCreateUpdateComponent],
  exports: [PersonCreateUpdateComponent]
})
export class PersonCreateUpdateModule {
}
