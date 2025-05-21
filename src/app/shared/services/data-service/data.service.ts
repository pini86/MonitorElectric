import { inject, Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ZamerItem } from '../../models/zamer-item';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class DataService {
  readonly #http = inject(HttpClient);

  readonly dataIsLoaded$ = new BehaviorSubject<boolean>(false);

  private _data: ZamerItem[] = [];

  constructor() {
    this._loadData();
  }

  getData(): ZamerItem[] {
    return this._data;
  }

  removeItems(items: ZamerItem[]) {
    this._data = this._data.filter((item) => !items.includes(item));

    this.dataIsLoaded$.next(true);
  }

  saveEditedItem(newItem: ZamerItem) {
    this._data = this._data.map((item) =>
      item.id === newItem.id ? newItem : item
    );

    this.dataIsLoaded$.next(true);
  }

  saveNewItem(newItem: ZamerItem) {
    this._data.push(newItem);

    this.dataIsLoaded$.next(true);
  }

  private _loadData() {
    this.#http.get<ZamerItem[]>('assets/mock-data/mock-data.json').subscribe(
      (response) => {
        this._data = response;
      },
      (error) => {
        console.error('Ошибка при загрузке данных:', error);
      },
      () => {
        this.dataIsLoaded$.next(true);
      }
    );
  }
}
