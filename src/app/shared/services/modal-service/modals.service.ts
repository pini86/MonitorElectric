import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmComponent } from '../../../public/modals/confirm/confirm.component';
import { EditComponent } from '../../../public/modals/edit/edit.component';
import { ZamerItem } from '../../models/zamer-item';
import { CreateComponent } from '../../../public/modals/create/create.component';

@Injectable()
export class ModalsService {
  readonly #matDialog = inject(MatDialog);

  confirm(message: string): MatDialogRef<ConfirmComponent> {
    return this.#matDialog.open(ConfirmComponent, {
      data: { message },
    });
  }

  edit(item: ZamerItem): MatDialogRef<EditComponent> {
    return this.#matDialog.open(EditComponent, {
      data: { item },
    });
  }

  create(): MatDialogRef<CreateComponent> {
    return this.#matDialog.open(CreateComponent);
  }
}
