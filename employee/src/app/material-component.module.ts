import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [],
  imports: [
    MatTableModule,
    CommonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule
  ],
  exports: [
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule
  ],
})
export class MaterialComponentsModule {}
