import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeopleComponent } from './people.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { PeopleRoutingModule } from './people-routing.module';
import { ListModule } from '../../core/list/list.module';
import { PersonCreateUpdateModule } from './person-create-update/person-create-update.module';
import { PageHeaderModule } from '../../core/page-header/page-header.module';
import { BreadcrumbsModule } from '../../core/breadcrumbs/breadcrumbs.module';
import {DemoService} from '../../../lib/src/base.service';

@NgModule({
  imports: [
    CommonModule,
    PeopleRoutingModule,
    FormsModule,
    FlexLayoutModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatCheckboxModule,
    MatInputModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    MatDialogModule,

    // Core
    ListModule,
    PersonCreateUpdateModule,
    PageHeaderModule,
    BreadcrumbsModule
  ],
  declarations: [PeopleComponent],
  providers: [DemoService],
  exports: [PeopleComponent]
})
export class PeopleModule { }
