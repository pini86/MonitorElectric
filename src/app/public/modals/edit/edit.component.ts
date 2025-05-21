import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ZamerItem } from '../../../shared/models/zamer-item';
import { FormControl, Validators } from '@angular/forms';

@Component({
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditComponent implements OnInit {
  readonly #dialogRef = inject(MatDialogRef);
  readonly data = inject<{ item: ZamerItem }>(MAT_DIALOG_DATA).item;

  readonly dateControl = new FormControl<Date>(new Date(), [
    Validators.required,
  ]);
  readonly timeControl = new FormControl<string>('', [Validators.required]);
  readonly sourceControl = new FormControl<string>('', [Validators.required]);

  ngOnInit() {
    this._handleFormData();
  }

  saveForm(): void {
    const date = new Date(this.dateControl.value as Date);

    const [hours, minutes, seconds] = String(this.timeControl.value)
      .split(':')
      .map(Number);

    date.setHours(hours);
    date.setMinutes(minutes);
    date.setSeconds(seconds);

    const result = {
      ...this.data,
      date,
      source: this.sourceControl.value,
    };

    this.#dialogRef.close(result);
  }

  private _handleFormData(): void {
    this.dateControl.setValue(new Date(this.data.date));
    this.timeControl.setValue(new Date(this.data.date).toLocaleTimeString());
    this.sourceControl.setValue(this.data.source);
  }
}
