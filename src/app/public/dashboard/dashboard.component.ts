import { Component, DestroyRef, inject } from '@angular/core';
import { DataService } from '../../shared/services/data-service/data.service';
import { ZamerItem } from '../../shared/models/zamer-item';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs';
import { SelectionModel } from '@angular/cdk/collections';
import { ModalsService } from '../../shared/services/modal-service/modals.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  readonly #dataService = inject(DataService);
  readonly #destroyRef = inject(DestroyRef);
  readonly #modalsService = inject(ModalsService);

  data: ZamerItem[] = [];
  selection = new SelectionModel<ZamerItem>(true, []);

  readonly displayedColumns: string[] = [
    'id',
    'date',
    'time',
    'source',
    'phase',
    'paramU',
    'paramI',
    'paramP',
    'paramQ',
    'paramCos',
  ];

  constructor() {
    this.#dataService.dataIsLoaded$
      .pipe(
        filter((isLoaded) => isLoaded),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((isLoaded) => {
        if (isLoaded) {
          this.selection.clear();
          this.data = [...this.#dataService.getData()];
        }
      });
  }

  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.data.length;
    return numSelected === numRows;
  }

  toggleAllRows(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.data);
  }

  checkboxLabel(row?: ZamerItem): string {
    if (!row) {
      return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
      row.id + 1
    }`;
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

  removeItems(): void {
    if (this.selection.isEmpty()) {
      return;
    }

    this.#modalsService
      .confirm('удалить замер(ы) ?')
      .afterClosed()
      .pipe(
        filter((result) => result),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe(() => {
        this.#dataService.removeItems(this.selection.selected);
      });
  }

  editItem(): void {
    if (this.selection.isEmpty() || this.selection.selected.length !== 1) {
      return;
    }

    this.#modalsService
      .edit(this.selection.selected[0])
      .afterClosed()
      .pipe(
        filter((result) => result),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((result) => {
        this.#dataService.saveEditedItem(result);
      });
  }

  createNewItem(): void {
    this.#modalsService
      .create()
      .afterClosed()
      .pipe(
        filter((result) => result),
        takeUntilDestroyed(this.#destroyRef)
      )
      .subscribe((result) => {
        this.#dataService.saveNewItem(result);
      });
  }
}
