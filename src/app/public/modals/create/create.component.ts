import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ZamerItem } from '../../../shared/models/zamer-item';
import { FormControl, Validators } from '@angular/forms';
import { generateItemData } from '../../../shared/utils/utils';

@Component({
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateComponent implements OnInit {
  readonly #dialogRef = inject(MatDialogRef);

  data: ZamerItem | undefined;

  readonly sourceControl = new FormControl<string>('', [Validators.required]);

  ngOnInit() {
    this.data = generateItemData();
  }

  saveForm() {
    const result = {
      ...this.data,
      source: this.sourceControl.value,
    };

    this.#dialogRef.close(result);
  }

  getFormattedDate(dateString: string): string {
    const date = new Date(dateString);
    return `${String(date.getDate()).padStart(2, '0')}.${String(
      date.getMonth() + 1
    ).padStart(2, '0')}.${date.getFullYear()}`;
  }

  getFormattedTime(dateString: string): string {
    return new Date(dateString).toLocaleTimeString();
  }
}
