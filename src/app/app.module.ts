import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DataService } from './shared/services/data-service/data.service';
import { DashboardComponent } from './public/dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ConfirmComponent } from './public/modals/confirm/confirm.component';
import { EditComponent } from './public/modals/edit/edit.component';
import { ModalsService } from './shared/services/modal-service/modals.service';
import {
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
  MatFormFieldModule,
} from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { CreateComponent } from './public/modals/create/create.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ConfirmComponent,
    EditComponent,
    CreateComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatTableModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatDividerModule,
  ],
  providers: [
    DataService,
    ModalsService,
    provideNoopAnimations(),
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: {
        appearance: 'outline',
      },
    },
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
